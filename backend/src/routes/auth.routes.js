import express from 'express';
import {
  authenticateUser,
  finaliseRegistration,
  generateRegistrationOption,
  registerUserToThePlatform,
} from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.post('/registerUser', registerUserToThePlatform);
authRouter.get('/register', generateRegistrationOption);
authRouter.post('/register', finaliseRegistration);
authRouter.get('/authenticate/:userId', authenticateUser);
export default authRouter;
