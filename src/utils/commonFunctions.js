import { createHmac } from "crypto";
import { CONSTANT, REQUEST_OBJECT } from "./constant.js";
export const successResponse = (data, message, statusMessage, code) => ({
  success: true,
  message,
  status: statusMessage,
  code,
  data,
});

export const errorResponse = (error = {}, message, statusMessage, code) => ({
  success: false,
  message: message || "Something went wrong",
  status: statusMessage || "ERROR",
  code: code || 500,
  error,
});

export const hashData = (data, salt = CONSTANT.PASSWORD_HASH_SALT) => {
  return createHmac("sha256", salt).update(data).digest("hex");
};

export const validate = (schema, source = REQUEST_OBJECT.BODY) => {
  return async (req, res, next) => {
    try {
      const validated = await schema.validateAsync(req[source], {
        abortEarly: false,
      });
      req[source] = validated;
      next();
    } catch (err) {
      res.status(400).json({
        code: 400,
        message: "Validation failed",
        errors: err.details.map((e) => e.message),
      });
    }
  };
};
