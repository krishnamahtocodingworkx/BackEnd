import Joi from "joi";
import {
  emailPattern,
  namePattern,
  passwordPattern,
  ROLE,
} from "../utils/constant.js";

export const signupSchema = Joi.object({
  name: Joi.string().pattern(namePattern).trim().required(),
  email: Joi.string().trim().pattern(emailPattern).required(),
  profileImage: Joi.string().trim().optional(),
  password: Joi.string()
    .pattern(passwordPattern)
    .required()
    .messages({ "string.pattern.base": "Invalid password" }),
  confirmPassword: Joi.valid(Joi.ref("password")).required(),
  role: Joi.string()
    .trim()
    .valid(...Object.values(ROLE))
    .optional(),
});

export const verifyEmailSchema = Joi.object({
  email: Joi.string().trim().pattern(emailPattern).required(),
  otp: Joi.string().length(4).required(),
});
export const verifyEmailOnlySchema = Joi.object({
  email: Joi.string().trim().pattern(emailPattern).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().trim().pattern(emailPattern).required(),
  password: Joi.string().pattern(passwordPattern).required(),
});

export const resetPasswordSchema = Joi.object({
  email: Joi.string().trim().pattern(emailPattern).required(),
  newPassword: Joi.string()
    .pattern(passwordPattern)
    .required()
    .messages({ "string.pattern.base": "Invalid password" }),
});
