class UserController {
    async getAllUserByAdmin(req, res) {
      res.render("getAllUserByAdmin",{title:"All User List"});
    }

    async userProfile(req,res){
      res.render("userProfilePage");
    }

    async deleteUser(req,res){
      res.render("deleteUser");
    }

    async getUserById(req,res){
      res.render("profilepage");
    }
    async userDashboard(req,res){
      res.render("userDashboard");
    }

    async updateUser(req,res){
      res.render("updateUser");
    }

    async updateAdminProfile(req,res){
      res.render("updateAdminProfile");
    }
  }
  const userController = new UserController();
  export default userController;
  