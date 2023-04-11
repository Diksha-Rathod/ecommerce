class EmailVerification {
  async emailVerification(req, res) {
    res.render("emailVerify");
  }
}
const emailverification = new EmailVerification();
export default emailverification;
