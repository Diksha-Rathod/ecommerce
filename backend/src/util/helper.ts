import bycrypt from "bcryptjs";
import crypto from "crypto";

class Utill {
  async hashPassword(reqPassword) {
    const hashpass = await bycrypt.hash(reqPassword, 10);
    return hashpass;
  }
  async generateUserToken() {
    const randomString = await crypto.randomBytes(20).toString("hex");
    return randomString;
  }

  async compareHashPassword(reqPassword, dbPassword) {
    let hashPassword = bycrypt.compareSync(reqPassword, dbPassword);
    return hashPassword;
  }
}
const utill = new Utill();
export default utill;
