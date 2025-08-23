import User from "../models/User.js";
import { otpTemplate } from "../templates/emailVerification.js";
import {
  errorResponse,
  generateOtp,
  hashData,
  successResponse,
} from "../utils/commonFunctions.js";
import {
  ExceptionMessage,
  HttpStatusCode,
  HttpStatusMessage,
  SuccessMessage,
} from "../utils/responseData.js";
import { mailSender } from "../utils/mailSender.js";
import Otp from "../models/Otp.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const emailInLowercase = email.toLowerCase();
    const userAlreadyExist = await User.findOne({ email: emailInLowercase });
    if (userAlreadyExist) {
      return res
        .status(HttpStatusCode.BAD_REQUEST)
        .json(
          errorResponse(
            {},
            ExceptionMessage.EMAIL_ALREADY_EXIST,
            HttpStatusMessage.BAD_REQUEST,
            HttpStatusCode.BAD_REQUEST
          )
        );
    }
    const hashedPassword = hashData(password);
    const { otp, expiresAt } = generateOtp();
    const newUser = new User({
      email: emailInLowercase,
      name,
      password: hashedPassword,
      role,
    });
    const addedUser = await newUser.save();
    const otpData = new Otp({
      userId: addedUser._id,
      otp,
      expiresAt,
    });
    await otpData.save();

    // Send OTP to user's email
    await mailSender(
      emailInLowercase,
      "Email Verification for Plant Book",
      otpTemplate(otp)
    );
    return res
      .status(HttpStatusCode.CREATED)
      .json(
        successResponse(
          addedUser,
          SuccessMessage.SIGNED_UP,
          HttpStatusMessage.CREATED,
          HttpStatusCode.CREATED
        )
      );
  } catch (error) {
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json(
        errorResponse(
          error,
          ExceptionMessage.INTERNAL_SERVER_ERROR,
          HttpStatusMessage.INTERNAL_SERVER_ERROR,
          HttpStatusCode.INTERNAL_SERVER_ERROR
        )
      );
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;
    console.log(email, otp);
    const isUserExists = await User.findOne({ email: email.toLowerCase() });
    if (!isUserExists) {
      return res
        .status(HttpStatusCode.NOT_FOUND)
        .json(
          errorResponse(
            {},
            ExceptionMessage.USER_NOT_FOUND,
            HttpStatusMessage.NOT_FOUND,
            HttpStatusCode.NOT_FOUND
          )
        );
    }
    const otpMatch = await Otp.findOne({
      userId: isUserExists._id,
    }).sort({ createdAt: -1 });
    if (!otpMatch) {
      return res
        .status(HttpStatusCode.NOT_FOUND)
        .json(
          errorResponse(
            {},
            ExceptionMessage.OTP_NOT_FOUND,
            HttpStatusMessage.NOT_FOUND,
            HttpStatusCode.NOT_FOUND
          )
        );
    }
    if (otpMatch.otp !== otp) {
      return res
        .status(HttpStatusCode.BAD_REQUEST)
        .json(
          errorResponse(
            {},
            ExceptionMessage.INVALID_OTP,
            HttpStatusMessage.BAD_REQUEST,
            HttpStatusCode.BAD_REQUEST
          )
        );
    }
    if (otpMatch.expiresAt < new Date()) {
      return res
        .status(HttpStatusCode.BAD_REQUEST)
        .json(
          errorResponse(
            {},
            ExceptionMessage.OTP_EXPIRED,
            HttpStatusMessage.BAD_REQUEST,
            HttpStatusCode.BAD_REQUEST
          )
        );
    }
    isUserExists.isEmailVerified = true;
    await isUserExists.save();
    await Otp.deleteMany({ userId: isUserExists._id });
    return res
      .status(HttpStatusCode.OK)
      .json(
        successResponse(
          isUserExists,
          SuccessMessage.EMAIL_VERIFIED,
          HttpStatusMessage.OK,
          HttpStatusCode.OK
        )
      );
  } catch (error) {
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json(
        errorResponse(
          error,
          ExceptionMessage.INTERNAL_SERVER_ERROR,
          HttpStatusMessage.INTERNAL_SERVER_ERROR,
          HttpStatusCode.INTERNAL_SERVER_ERROR
        )
      );
  }
};
