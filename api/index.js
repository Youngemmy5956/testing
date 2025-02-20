import { createServer } from 'http';
import express from "express";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import connectDB from "./config/mongo.js";
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);

// Use cookie-parser middleware
app.use(cookieParser());

// Middleware to log cookies
app.use((req, res, next) => {
  next();
});

// Middleware to update lastActive
const updateLastActive = async (req, res, next) => {
  if (req.user) { // Assuming the user is attached to the request
    req.user.lastActive = Date.now();
    await req.user.save();
  }
  next();
};

// Use the middleware in your app
app.use(updateLastActive);

// middlewares
app.use(express.json());

// Use user routes
app.use('/user', userRoutes);

async function connect() {
  try {
    await connectDB(process.env.MONGODB_PASSWORD);
    httpServer.listen(4000, () => {
      console.log("server is running on port 7000");
      console.log('Test log - if you see this, console logging is working');
    });
  } catch (err) {
    console.log(err);
  }
}
connect();