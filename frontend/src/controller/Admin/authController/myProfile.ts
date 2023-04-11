class MyProfile {
    async myProfile(req, res) {
      res.render("adminProfile");
    }
  }
  const myprofile = new MyProfile();
  export default myprofile;