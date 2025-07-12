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
