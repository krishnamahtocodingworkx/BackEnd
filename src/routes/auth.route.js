import express from "express";
import { validate } from "../utils/commonFunctions.js";
import { signup, verifyEmail } from "../controllers/user.controller.js";
import { signupSchema, verifyEmailSchema } from "../validations/auth.js";

const authRoute = express.Router();

authRoute.post("/signup", validate(signupSchema), signup);
authRoute.post("/verify-email", validate(verifyEmailSchema), verifyEmail);

export default authRoute;
