class ChangePassword{
    async changePassword(req,res){
       res.render("changePassword")
    }
}
const changepassword=new ChangePassword();
export default changepassword