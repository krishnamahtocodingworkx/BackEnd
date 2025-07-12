import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import mainRoutes from "./routes/index.route.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors({ origin: "*" }));
const port = process.env.PORT || 9000;

app.use("/api/v1/", mainRoutes);

app.get("/check", (req, res) => {
  res.json({
    message: "Server is running",
    code: 200,
    data: {},
  });
});

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
