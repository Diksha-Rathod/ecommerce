import { Request, Response } from "express";
import { getRepository } from "typeorm";
import HttpConstant from "../constant/httpConstant";
import { Role, User } from "../entity/user";
import userService from "../service/userService";

class UserController {
  async getAllUserByAdmin(req: Request, res: Response) {
    try {
      let userRepository = getRepository(User);
      let user = await userRepository.find({
        where: { role: Role.USER },
      });

      if (user.length == 0) {
        return res
          .status(HttpConstant.HTTP_NOT_FOUND)
          .json({ status: false, message: "No user found" });
      }
      const data = await userService.getUser();
      res
        .status(HttpConstant.HTTP_CREATED)
        .json({ data, status: true, message: "All user list!" });
    } catch (error) {
      console.log(
        error,
        "---------------get All user By Admin ----- controller"
      );
    }
  }
  async getUser(req, res) {
    try {
      let userRepository = getRepository(User);
      let data = await userRepository.findOne({
        where: { id: req.user.id },
      });
      if (!data) {
        return res
          .status(HttpConstant.HTTP_NOT_FOUND)
          .json({ status: false, message: "No user found" });
      } else {
        res
          .status(HttpConstant.HTTP_CREATED)
          .json({ data, status: true, message: "user details" });
      }
    } catch (error) {
      console.log(error, "---------------get user ----- controller");
    }
  }
  async getUserById(req: Request, res: Response) {
    try {
      let paramId = parseInt(req.params.id);

      let userRepository = getRepository(User);
      let user = await userRepository.find({
        where: { id: paramId },
      });
      if (!user) {
        return res
          .status(HttpConstant.HTTP_NOT_FOUND)
          .json({ status: false, message: "No user found with this id" });
      }
      const data = await userService.getUserById(paramId);
      res
        .status(HttpConstant.HTTP_SUCCESS_OK)
        .json({ data, status: true, message: " user By id!" });
    } catch (error) {
      console.log(error, "---------------get user ----- controller");
    }
  }
  async updateUser(req, res) {
    try {
      let paramId = parseInt(req.params.id);
      let reqBody = req.body;
      let userRepository = getRepository(User);
      let user = await userRepository.findOne({
        where: { id: paramId },
      });

      if (!user) {
        return res
          .status(HttpConstant.HTTP_NOT_FOUND)
          .json({ status: false, message: "No user found with this id" });
      }
      if (user.id != req.user.id) {
        return res
          .status(HttpConstant.HTTP_NOT_FOUND)
          .json({ status: false, message: "you are not authorized " });
      }
      const data = await userService.updateUser(paramId, reqBody);
      res
        .status(HttpConstant.HTTP_CREATED)
        .json({ data, status: true, message: "user Updated succesfully...!" });
    } catch (error) {
      console.log(error, "---------------update user----- controller");
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      let paramId = parseInt(req.params.id);
      let userRepository = getRepository(User);
      let user = await userRepository.find({
        where: { id: paramId },
      });
      if (user.length == 0) {
        return res
          .status(HttpConstant.HTTP_NOT_FOUND)
          .json({ status: false, message: "No user found with this id" });
      }
      const data = await userService.deleteUser(paramId);
      if (!data) {
        res
          .status(HttpConstant.HTTP_BAD_REQUEST)
          .json({ status: false, message: "user not deleted" });
      }
      res
        .status(HttpConstant.HTTP_CREATED)
        .json({ data, status: true, message: "user deleted succesfully...!" });
    } catch (err) {
      console.log(err, "------------delete user controller--------");
    }
  }
}
const userController = new UserController();
export default userController;
