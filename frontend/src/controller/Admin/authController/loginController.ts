class Login{
    // async adminLogin(req,res){
    //    res.render("adminLogin")
    // }
    async userLogin(req,res){
        res.render("login")
    }
}
const login=new Login();
export default login