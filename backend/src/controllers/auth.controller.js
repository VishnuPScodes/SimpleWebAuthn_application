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

import mongoose from 'mongoose';
import { Users } from './userModel'; // Import the user model/schema

export const finaliseRegistration = async (req, res) => {
  try {
    const { credential } = req.body;
    const { user } = credential; // Assuming credential has a user property
    const result = await verifyRegistrationResponse({
      response: credential,
      expectedChallenge: users[user.id].challenge, // Access challenge from stored user data
      expectedOrigin: 'http://localhost:3000',
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
