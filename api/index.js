import { createServer } from "http";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongo.js";
import userRoutes from "./routes/user-routes.js";
import authRoutes from "./routes/user-routes.js";
import passport from "./config/passport.js";
import session from "express-session";
import { https } from "firebase-functions";

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
  if (req.user) {
    // Assuming the user is attached to the request
    req.user.lastActive = Date.now();
    await req.user.save();
  }
  next();
};

// Use the middleware in your app
app.use(updateLastActive);

// middlewares
app.use(express.json());

// Initialize session and passport
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Use user routes
app.use("/user", userRoutes);
app.use("/auth", authRoutes);

async function connect() {
  try {
    await connectDB(process.env.MONGODB_PASSWORD);
    httpServer.listen(4000, () => {
      console.log("server is running on port 4000");
      console.log("Test log - if you see this, console logging is working");
    });
  } catch (err) {
    console.log(err);
  }
}
connect();

export const api = https.onRequest(app);
