import express from 'express';
import { userRegistration } from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.get('/register', userRegistration);

export default authRouter;
