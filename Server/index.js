import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./Api/routes/auth.js";
import userRoute from "./Api/routes/users.js";
import hotelRoute from './Api/routes/hotels.js'
import roomRoute from './Api/routes/rooms.js'
import cookieParser from "cookie-parser";
import cors from "cors";

// Load environment variables from .env filep
dotenv.config();

const app = express();

// Middleware
app.use(cookieParser());
app.use(cors());
app.use(express.json());

//Routees
app.use("/api/auth", authRoute);
app.use("/api/hotel", hotelRoute);
app.use("/api/room", roomRoute);
app.use("/api/users", userRoute);

app.get("/", (req, res) => {
  res.json("Hello");
});
//MiddleWare
app.use((err, req, res, next) => {
  return res.status(500).json("Hello from Error Handler");
});

//PORT AND DB
mongoose.connect(process.env.MONGO).then(() => {
  console.log("DB Connected");
  const PORT =8080
  app.listen(PORT || 5000, () => {
    console.log(`Port Connected ${PORT}`);
  });
});
