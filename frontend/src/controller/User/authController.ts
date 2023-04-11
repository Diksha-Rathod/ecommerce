class AuthController{
   
    async home(req,res){
        res.render("userHomePage")
    }

    async logout(req,res){
        res.render("logout")
    }

    async changePassword(req,res){
        res.render("UserChangePassword")
    }

    async payment(req,res){
        res.render("payment")
    }

    // async payment(req,res){
    //     res.render("payment")
    // }

    
}
const authController=new AuthController();
export default authController;