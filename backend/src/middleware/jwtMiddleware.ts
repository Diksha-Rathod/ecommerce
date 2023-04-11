import jwt from "jsonwebtoken";
import { Role, User } from "../entity/user";
import dotenv from "dotenv";
dotenv.config();

import { getRepository } from "typeorm";
import HttpConstant from "../constant/httpConstant";

class JwtMiddleware {
  async jwtAuth(req, res, next) {
    try {
      const token = req.headers["authorization"];

      if (!token) {
        res
          .status(HttpConstant.HTTP_INTERNAL_SERVER_ERROR)
          .json({status:false, message: "No token found" });
      }
      let decoded: any = await jwt.verify(token, process.env.SECRET_KEY);
      if (decoded.userToken) {
        const userRepository = getRepository(User);
        const result = await userRepository.findOne({
          where: { userToken: decoded.userToken },
        });

        if (!result) {
          return res
            .status(HttpConstant.HTTP_NOT_FOUND)
            .json({ status: false, data: "You are not authorize" });
        } else {
          let currentDate = new Date();
          if (decoded.exp < Math.round(currentDate.getTime() / 1000)) {
            return res
              .status(HttpConstant.HTTP_NOT_FOUND)
              .json({ status: false, data: "Token expires" });
          }
          req.user = decoded;
          req.token = token;

          next();
        }
      } else {
        // error
      }
    } catch (err) {
      return res
        .status(HttpConstant.HTTP_BAD_REQUEST)
        .json({ status: false, message: "Invalid Token" });
    }
  }

  async hasAdminRole(req, res, next) {
    const token = req.headers["authorization"];

    if (!token)
      res
        .status(HttpConstant.HTTP_CREATED)
        .json({ status:false,message: "No token found" });
    else {
      try {
        let decoded: any = await jwt.verify(token, process.env.SECRET_KEY);
        if (!(decoded.role === Role.ADMIN)) {
          return res.status(HttpConstant.HTTP_CREATED).json({
            status: false,
            message: "You are not authorized to access this API!",
          });
        }
        next();
      } catch (error) {
        console.log(error, "-------------in admin roloe");
        return res
          .status(HttpConstant.HTTP_CREATED)
          .json({ status: false, message: "Invalid Token" });
      }
    }
  }

  async hasUserRole(req, res, next) {
    const token = req.headers["authorization"];

    if (!token)
      res
        .status(HttpConstant.HTTP_CREATED)
        .json({status:false, message: "No token found" });
    else {
      try {
        let decoded: any = await jwt.verify(token, process.env.SECRET_KEY);

        if (!(decoded.role === Role.USER)) {
          return res.status(HttpConstant.HTTP_CREATED).json({
            status: false,
            message: "Access denied(you are not user)..!",
          });
        }

        next();
      } catch (error) {
        return res
          .status(HttpConstant.HTTP_CREATED)
          .json({ status: false, message: "Invalid Token" });
      }
    }
  }
}

const jwtMiddleware = new JwtMiddleware();
export default jwtMiddleware;
