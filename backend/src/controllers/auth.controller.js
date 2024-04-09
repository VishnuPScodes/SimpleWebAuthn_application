import { Users } from '../models/user.model.js';
import {
  generateRegistrationOptions,
  verifyRegistrationResponse,
  generateAuthenticationOptions,
  verifyAuthenticationResponse,
} from '@simplewebauthn/server';

export const generateRegistrationOptions = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await Users.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }
    const username = user.username;
    const options = await generateRegistrationOptions({
      rpName: 'Your RP Name',
      rpID: 'localhost',
      userID: username,
      userName: username,
      attestationType: 'none',
      excludeCredentials: [],
      authenticatorSelection: {
        residentKey: 'preferred',
        userVerification: 'preferred',
        authenticatorAttachment: 'platform',
      },
    });

    user.challenge = options.challenge;
    await user.save();
    res.json(options);
  } catch (error) {
    console.error('Error initiating registration:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const finaliseRegistration = async (req, res) => {
  try {
    const { credential } = req.body;
    const { user } = credential;
    const { userId } = req.params;
    const userRecord = await Users.findOne({ _id: userId });
    if (!userRecord) {
      res.status(401).send({ message: 'User not found!' });
    }
    await verifyRegistrationResponse({
      response: credential,
      expectedChallenge: userRecord.challenge,
      expectedOrigin: 'http://localhost:4001',
      expectedRPID: 'localhost',
    });

    const updatedUser = await Users.findByIdAndUpdate(
      user.id,
      { $push: { authenticators: credential } },
      { new: true }
    );

    res.json({ message: 'Registration successful', user: updatedUser });
  } catch (error) {
    console.error('Error finalizing registration:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const authenticateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const userRecord = await Users.findOne({ _id: userId });
    if (!userRecord) {
      res.status(401).send({ message: 'User not found!' });
    }
    const username = req.query.username;
    const options = await generateAuthenticationOptions({
      rpID: 'localhost',
      allowCredentials: userRecord.authenticators.map((authenticator) => ({
        id: authenticator.rawId,
        type: 'public-key',
      })),
      userVerification: 'preferred',
    });

    // Store the challenge for this user
    userRecord.challenge = options.challenge;

    res.json(options);
  } catch (error) {
    console.error('Error initiating authentication:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const finalAuthentication = async (req, res) => {
  app.post('/authenticate', async (req, res) => {
    try {
      const credential = req.body;
      const userId = req.params.userId;
      const userRecord = await Users.findOne({ _id: userId });
      if (!userRecord) {
        res.status(401).send({ message: 'User not found!' });
      }
      await verifyAuthenticationResponse({
        response: credential,
        expectedChallenge: userRecord.challenge,
        expectedOrigin: 'http://localhost:3000',
        expectedRPID: 'localhost',
      });

      res.json({ message: 'Authentication successful' });
    } catch (error) {
      console.error('Error finalizing authentication:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
};
