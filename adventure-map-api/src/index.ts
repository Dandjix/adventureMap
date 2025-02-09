import express, { Request, Response } from 'express';
import mongoose from 'mongoose'

import dotenv from 'dotenv'
import routes from './routes';
import passport from 'passport';

dotenv.config()

const app = express()
app.use(express.json())

app.use(passport.initialize());


mongoose
.connect(process.env.MONGO_URI as string)
.then(()=>{
    console.log("mongodb connected");
})
.catch((e)=>{
    console.log(`mongodb could not be connected : ${e}`);
})

app.use("/",routes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});