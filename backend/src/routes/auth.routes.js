import express from 'express';
import {
  authenticateUser,
  finaliseRegistration,
  userRegistration,
} from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.get('/register', userRegistration);
authRouter.get('/register/:userId', finaliseRegistration);
authRouter.get('/authenticate/:userId', authenticateUser);
export default authRouter;
