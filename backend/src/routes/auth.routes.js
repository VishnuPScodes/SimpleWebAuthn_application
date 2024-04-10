import express from 'express';
import {
  authenticateUser,
  finaliseRegistration,
  generateRegistrationOption,
} from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.get('/register', generateRegistrationOption);
authRouter.get('/register/:userId', finaliseRegistration);
authRouter.get('/authenticate/:userId', authenticateUser);
export default authRouter;
