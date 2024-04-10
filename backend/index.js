import express from 'express';
import cors from 'cors';
import { connectWithMongoDB } from './src/configs/db.js';
import authRouter from './src/routes/auth.routes.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/authn', authRouter);
const port = process.env.PORT || 4001;
const URL = process.env.URL;
app.listen(port, async () => {
  try {
    await connectWithMongoDB(URL);
    console.log('listening to the port ', port);
  } catch (error) {
    console.log(error);
  }
});
