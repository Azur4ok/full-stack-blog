import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';

import { router } from './routes/index.js';

const PORT = process.env.PORT || 8000;

const { json } = express;

const server = express();

server.use(json());
server.use('/api', router);
server.use('/uploads', express.static('uploads'));

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL).then(() => console.log('db ok'));
    server.listen(PORT, () => console.log(`server started on ${PORT}`));
  } catch (error) {
    console.log(error.message);
  }
};

start();
