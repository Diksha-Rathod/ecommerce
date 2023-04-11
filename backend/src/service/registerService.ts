import { copyFileSync } from "fs";
import { getRepository } from "typeorm";
import { User } from "../entity/user";
import utill from "../util/helper";
class RegisterService {
  async registerUser(reqBody, roleParam) {
    try {
      let userData = {};
      const registerRepo = await getRepository(User);
      if (roleParam === "Admin") {
        userData = {
          fullName: reqBody.fullName,
          role: roleParam,
          email: reqBody.email,
          password: await utill.hashPassword(reqBody.password),
          userToken: await utill.generateUserToken(),
          isVerified: true,
          profileImg: reqBody.profileImg,
        };
      } else {
        userData = {
          fullName: reqBody.fullName,
          role: roleParam,
          email: reqBody.email,
          password: await utill.hashPassword(reqBody.password),
          userToken: await utill.generateUserToken(),
          verificationToken: await utill.generateUserToken(),
          profileImg: reqBody.profileImg,
        };
      }
      return await registerRepo.save(userData);
    } catch (error) {
      console.log(error, "---------register service");
    }
  }
}
const registerService = new RegisterService();
export default registerService;
