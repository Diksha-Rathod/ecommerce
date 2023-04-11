class Registration {
  async userRegistration(req, res) {
    res.render("registration");
  }
}
const registration = new Registration();
export default registration;
