class ForgotPassword{
    async forgotPassword(req,res){
       res.render("forgotPassword")
    }
}
const forgotpassword=new ForgotPassword();
export default forgotpassword