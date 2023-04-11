class AdminController {
    async adminDashboard(req, res) {
      res.render("sidePanel");
    }
  }
  const adminController = new AdminController();
  export default adminController;
  