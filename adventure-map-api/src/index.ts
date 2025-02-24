import express, { Request, Response } from 'express';
import mongoose from 'mongoose'

import dotenv from 'dotenv'
import routes from './routes';
import passport from 'passport';
import cors from 'cors'

dotenv.config()

const app = express()
app.use(express.json())

app.use(passport.initialize());

app.use(cors({
  origin: '*', // Allow requests from this frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // You can adjust this based on the methods your app uses
  allowedHeaders: ['Content-Type', 'Authorization'], // If you're using authorization headers
}));

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