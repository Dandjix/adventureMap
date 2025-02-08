import express, { Request, Response } from 'express';
import mongoose from 'mongoose'

import dotenv from 'dotenv'

dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;

mongoose
.connect(process.env.MONGO_URI as string)
.then(()=>{
    console.log("mongodb connected");
})
.catch((e)=>{
    console.log(`mongodb could not be connected : ${e}`);
})

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});