import { MONGODB_URL, PORT } from "./utils/config.js";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import mainRoutes from "./routes/index.route.js";
import dbConnect from "./utils/dbConnect.js";

const app = express();
// Middleware
app.use(express.json());
app.use(cors({ origin: "*" }));

// Routes
app.use("/api/v1/", mainRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Plant Book API",
    code: 200,
    data: {},
  });
});

dbConnect();

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
