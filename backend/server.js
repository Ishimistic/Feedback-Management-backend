import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import feedbackRoutes from "./routes/feedback.js";
import User from "./models/User.js";
import Feedback from "./models/Feedback.js";

dotenv.config();
const app = express();

console.log("Environ: ", process.PORT);

connectDB();

app.use(cors({ origin: 'http://localhost:3000', credentials:true}));

app.use(bodyParser.json());
// app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/feedback", feedbackRoutes);

//To add the basic 
app.post("/api/add/users", async (req, res) => {
    try {
      const { password, ...rest } = req.body;

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create a new user with the hashed password
      const user = new User({ ...rest, password: hashedPassword });
      await user.save();
      res.status(201).json({ message: "User created successfully", user });
    } catch (err) {
      res.status(500).json({ error: "Failed to create user", details: err.message });
    }
  });

  app.get("/api/allusers", async (req, res) => {
    try {
      const users = await User.find(); // Fetch all users from the database
      res.status(200).json({ users });
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch users", details: err.message });
    }
  });
  
  // Create Feedback
  app.post("/api/add/feedbacks", async (req, res) => {
    try {
      const feedback = new Feedback(req.body);
      await feedback.save();
      res.status(201).json({ message: "Feedback created successfully", feedback });
    } catch (err) {
      res.status(500).json({ error: "Failed to create feedback", details: err.message });
    }
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});