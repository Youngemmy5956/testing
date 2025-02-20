import { createServer } from 'http';
import express from "express";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import connectDB from "./config/mongo.js";


dotenv.config();

const app = express();
const httpServer = createServer(app);

// Use cookie-parser middleware
app.use(cookieParser());

// Middleware to log cookies
app.use((req, res, next) => {
  next();
});

// // Use express-session middleware
// app.use(session({
//   secret: process.env.JWT_SECRET_KEY,
//   resave: false,
//   saveUninitialized: true,
//   store: MongoStore.create({ mongoUrl: process.env.MONGODB_PASSWORD })
// }));

// app.use(useragent.express());

app.use(express.json());
// app.use(
//   cors({
//     origin: ["http://localhost:3000", "http://localhost:5500", "http://127.0.0.1:5501", "http://localhost:3001", "http://localhost:3002", "http://localhost:3003", "http://localhost:3004", "http://localhost:3005", "https://ventmoir-xzqw.onrender.com", "https://www.ventmoir.com", "https://ola-irawo.github.io"],
//     credentials: true
//   })
// );

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
// app.use("/user", userRouter);


// // Initialize WebSocket server
// const io = initializeWebSocket(httpServer);




async function connect() {
  try {
    await connectDB(process.env.MONGODB_PASSWORD);
    // await createUsers(); // Create users after connecting to the database
    httpServer.listen(4000, () => {
      console.log("server is running on port 7000");
      console.log('Test log - if you see this, console logging is working');
    });
  } catch (err) {
    console.log(err);
  }
}
connect();