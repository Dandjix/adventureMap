import express, { Request, Response } from 'express';
import mongoose from 'mongoose'

import dotenv from 'dotenv'

import { authRoutes } from './routes/authRoutes';

dotenv.config()

const app = express()
app.use(express.json())



mongoose
.connect(process.env.MONGO_URI as string)
.then(()=>{
    console.log("mongodb connected");
})
.catch((e)=>{
    console.log(`mongodb could not be connected : ${e}`);
})

app.use('/auth',authRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});