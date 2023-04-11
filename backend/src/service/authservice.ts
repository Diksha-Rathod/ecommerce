import { getRepository } from "typeorm";
import { User } from "../entity/user";
import utill from "../util/helper";
import dotenv from "dotenv";
import nodeMailer from "../mailer/nodeMailer";
dotenv.config();
class AuthService {
  /**
   * change password
   * @param id
   * @param password
   * @returns
   */
  async changePassword(id, password) {
    const userRepository = getRepository(User);
    const result = await userRepository.update(
      {
        id,
      },
      {
        password: await utill.hashPassword(password),
      }
    );
    return result;
  }
  /**
   * Forgot password
   * @param id
   * @param forgotPasswordToken
   * @returns
   */
  async forgotPassword(userData, forgotPasswordToken) {
   
    await getRepository(User).update(
      {
        id: userData.id,
      },
      {
        forgotPasswordToken: forgotPasswordToken,
      }
    );
    const sentFor = "forgotPassword";
    const link = `http://localhost:2020/resetPassword/${forgotPasswordToken}`;

    nodeMailer.nodeMailer(userData, link, sentFor);
    return {
      link,
    };
  }

  async resetPassword(id, password) {
   
    const userPassword = await utill.hashPassword(password);
    const result = await getRepository(User).update(
      {
        id,
      },
      {
        password: userPassword,
        forgotPasswordToken: null,
      }
    );

    return result;
  }

  async emailVerify(id) {
    const result = await getRepository(User).update(
      {
        id,
      },
      {
        verificationToken: null,
        isVerified: true,
      }
    );
  
    return result;
  }
}
const authService = new AuthService();
export default authService;
