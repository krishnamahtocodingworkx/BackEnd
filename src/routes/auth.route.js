import express from "express";
import { validate } from "../utils/commonFunctions.js";
import { signup } from "../controllers/user.controller.js";
import { signupSchema } from "../validations/auth.js";

const authRoute = express.Router();

authRoute.post("/signup", validate(signupSchema), signup);

export default authRoute;
