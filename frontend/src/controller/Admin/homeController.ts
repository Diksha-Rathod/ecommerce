class HomeController {
    async home(req, res) {
      res.render("adminHome");
    }
  }
  const homeController = new HomeController();
  export default homeController;