import { Request, Response } from "express";
import registerService from "../service/registerService";

import authValidation from "../expressValidation/authValidation";
import HttpConstant from "../constant/httpConstant";

class RegisterController {
  async registerView(req: Request, res: Response) {
    try {
      const reqBody = req.body;
      const roleParam = req.params.role;
      const validate: any = await authValidation.registrationValidation(
        reqBody
      );

      if (validate.status === false) {
        return res
          .status(HttpConstant.HTTP_SUCCESS_OK)
          .json({ status: false, message: validate.error });
      } else {
        const data = await registerService.registerUser(reqBody, roleParam);
        if (!data) {
          res.status(HttpConstant.HTTP_SUCCESS_OK).json("User Already exist");
        }
        res
          .status(HttpConstant.HTTP_CREATED)
          .json({ data, status: true, message: "register successfull..!" });
      }
    } catch (error) {
      console.log(error, "---------------register controller");
    }
  }
}
const registerController = new RegisterController();
export default registerController;
