import express from "express";
import authRoute from "./auth.route.js";

const mainRoutes = express.Router();

mainRoutes.use("/auth", authRoute);

export default mainRoutes;
