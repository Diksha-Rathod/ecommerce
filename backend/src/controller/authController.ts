import localStorage from "localStorage";
import { Request, Response } from "express";
import { User } from "../entity/user";
import { getRepository } from "typeorm";
import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import utill from "../util/helper";

import authService from "../service/authservice";
import nodeMailer from "../mailer/nodeMailer";
import authValidation from "../expressValidation/authValidation";
import HttpConstant from "../constant/httpConstant";


class AuthController {
  async loginView(req: Request, res: Response) {
    const reqData = req.body;
    const Paramrole = req.params.role;
    let loginRepository = getRepository(User);

    const validate: any = await authValidation.loginValidation(reqData);

    if (validate.status === false) {
      return res
        .status(HttpConstant.HTTP_NOT_FOUND)
        .json({ status: false, message: validate.error });
    }
    let userData = await loginRepository.findOne({
      where: { email: req.body.email },
    });
    if (userData == null) {
      return res
        .status(HttpConstant.HTTP_SUCCESS_OK)
        .json({ status: false, message: "User Not found" });
    }
    if (Paramrole != userData.role) {
      return res
        .status(400)
        .json({ status: false, message: "Role is incorrect" });
    }

    const email = userData?.email;
    const password = userData?.password;
    const id = userData?.id;
    const role = userData?.role;
    const userToken = userData?.userToken;
    const verificationToken = userData?.verificationToken;
    let hashPassword = await utill.compareHashPassword(
      reqData.password,
      password
    ); // true

    if (userData.isVerified === false) {
      const link = `http://localhost:2020/emailVerification/${verificationToken}`;
      const sentFor = "emailVerification";

      nodeMailer.nodeMailer(userData, link, sentFor);

      return res.json({
        message: "verfication link is sent to you email ",
        link,
      });
    }
    if (email === reqData.email && hashPassword && role === Paramrole) {
      jwt.sign(
        { role: role, id: id, userToken: userToken },
        process.env.SECRET_KEY,
        { expiresIn: "4hr" },
        (err, token) => {
          if (err) {
            return res
              .status(HttpConstant.HTTP_INTERNAL_SERVER_ERROR)
              .json({ status: false, message: "Token not created" });
          } else {
            return res
              .status(HttpConstant.HTTP_SUCCESS_OK)
              .json({ status: true, token, message: "Login successfull..!" });
          }
        }
      );
    } else {
      return res
        .status(HttpConstant.HTTP_SUCCESS_OK)
        .json({ status: false, message: "Invalid crediantail" });
    }
  }
  async changePassword(req, res) {
    let reqBody = req.body;
    const password = reqBody.password;
    let userData = await getRepository(User).findOne({
      where: { id: req.user.id },
    });
    const validate = await authValidation.changePasswordValidation(reqBody);
    if (validate.status === false) {
      return res
        .status(HttpConstant.HTTP_SUCCESS_OK)
        .json({ status: false, message: validate.error });
    }
    let currentPassword = await utill.compareHashPassword(
      reqBody.currentPassword,
      userData.password
    ); // true
    if (!currentPassword) {
      return res
        .status(HttpConstant.HTTP_SUCCESS_OK)
        .json({ status: false, message: "Invalid current password" });
    }
    if (reqBody.currentPassword === password) {
      return res
        .status(HttpConstant.HTTP_SUCCESS_OK)
        .json({ status: false, message: "This password is currently in use" });
    }

    const data = await authService.changePassword(
      userData.id,
      reqBody.password
    );
    return res
      .status(HttpConstant.HTTP_CREATED)
      .json({ data, status: true, message: "password changed succesfully" });
  }
  async forgotPassword(req: Request, res: Response) {
    const reqBody = req.body.email;
    // const validate=await authValidation.forgotPasswordValidation(req.body.email)
    // if (validate.status===false) {
    //   return res
    //     .status(HttpConstant.HTTP_NOT_FOUND)
    //     .json({ status: false, data: validate.error });
    // }

    const userData = await getRepository(User).findOne({
      where: {
        email: reqBody,
      },
    });
    if (!userData.email) {
      return res
        .status(HttpConstant.HTTP_NOT_FOUND)
        .json({ data: "Email not found" });
    }
    const forgotPasswordToken = await utill.generateUserToken();
    const data = await authService.forgotPassword(
      userData,
      forgotPasswordToken
    );
    return res
      .status(HttpConstant.HTTP_SUCCESS_OK)
      .json({
        data,
        status: true,
        message: "password reset link send to the user email ",
      });
  }

  async resetPassword(req, res) {
    const reqBody = req.body;
    const forgotPasswordToken = req.params.forgotPasswordToken;
    const validate = await authValidation.resetPasswordValidation(reqBody);
    if (validate.status === false) {
      return res
        .status(HttpConstant.HTTP_NOT_FOUND)
        .json({ status: false, message: validate.error });
    }
    const userData = await getRepository(User).findOne({
      where: { forgotPasswordToken: forgotPasswordToken },
    });
    if (!userData) {
      return res
        .status(HttpConstant.HTTP_NOT_FOUND)
        .json({ message: "User does not exist" });
    }

    const data = await authService.resetPassword(userData.id, reqBody.password);
    const sentFor = "ResetPassword";
    let msg = "your password reset succesfully";

    nodeMailer.nodeMailer(userData, msg, sentFor);
    return res
      .status(HttpConstant.HTTP_SUCCESS_OK)
      .json({ data, status: true, message: "password reset succesfully " });
  }

  async emailVerify(req: Request, res: Response) {
    const userData = await getRepository(User).findOne({
      where: { verificationToken: req.params.verificationToken },
    });
    if (!userData) {
      return res
        .status(HttpConstant.HTTP_SUCCESS_OK)
        .json({ status: false, message: "Email already verify" });
    }
    const data = await authService.emailVerify(userData.id);
    return res
      .status(HttpConstant.HTTP_SUCCESS_OK)
      .json({ data, status: true, message: "email verify succesfully " });
  }

  
}

const authController = new AuthController();
export default authController;
