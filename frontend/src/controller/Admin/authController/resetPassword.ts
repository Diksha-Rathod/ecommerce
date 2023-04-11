class ResetPassword{
    async resetPassword(req,res){
       res.render("resetPassword")
    }
}
const resetpassword=new ResetPassword();
export default resetpassword