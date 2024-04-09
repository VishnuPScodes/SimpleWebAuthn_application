import express from 'express';
import cors from 'cors';
import { connectWithMongoDB } from './src/configs/db.js';
import authRouter from './src/routes/auth.routes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/authn', authRouter);
const port = process.env.PORT || 4001;

app.listen(port, async () => {
  try {
    await connectWithMongoDB(port);
  } catch (error) {
    console.log(error);
  }
});
