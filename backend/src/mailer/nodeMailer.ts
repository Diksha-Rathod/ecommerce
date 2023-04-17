import dotenv from "dotenv";
dotenv.config();
import ejs from "ejs";
import nodemailer from "nodemailer";
import path from "path";
//mailtrap use
class NodeMailer {
  async nodeMailer(userData, msg, sentFor) {
    let name = userData.fullName;
    try {
      let mailTransporter = await nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: process.env.USEREMAIL,
          pass: process.env.PASSWORD,
        },
      });
      if (sentFor === "forgotPassword") {
        const templatePath = path.join(
          __dirname,
          "../views/forgotPassword.ejs"
        );
        let mailDetails = {
          from: "drathod@systango.com",
          to: userData.email,
          subject: "Forgot Password",
          text: `Hello ${userData.email}`,
          html: await ejs.renderFile(templatePath, { name, msg }),
        };
        let result = await mailTransporter.sendMail(mailDetails);
      } else if (sentFor === "ResetPassword") {
        const templatePath = path.join(__dirname, "../views/resetPassword.ejs");
        let mailDetails = {
          from: "drathod@systango.com",
          to: userData.email,
          subject: "Reset Password",
          text: `Hello ${userData.email}`,
          html: await ejs.renderFile(templatePath, { name, msg }),
        };
        let result = await mailTransporter.sendMail(mailDetails);
      } else if (sentFor === "emailVerification") {
        const templatePath = path.join(
          __dirname,
          "../views/emailVerification.ejs"
        );
        let mailDetails = {
          from: "drathod@systango.com",
          to: userData.email,
          subject: "Email Verification",
          text: `Hello ${userData.email}`,
          html: await ejs.renderFile(templatePath, { name, msg }),
        };
        let result = await mailTransporter.sendMail(mailDetails);
      }
    } catch (error) {
      console.log(error, "---------------nodemailer error");
    }
  }
}
const nodeMailer = new NodeMailer();
export default nodeMailer;
