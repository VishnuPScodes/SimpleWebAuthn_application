import express from 'express';
import cors from 'cors';
import { connectWithMongoDB } from './src/configs/db.js';

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 4001;

app.listen(port, async () => {
  try {
    await connectWithMongoDB(port);
  } catch (error) {
    console.log(error);
  }
});
