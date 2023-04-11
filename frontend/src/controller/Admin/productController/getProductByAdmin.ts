class getProductByAdmin {
  async getProduct(req, res) {
    res.render("getProduct", { title: "List of product"});
  }
}
const getproduct = new getProductByAdmin();
export default getproduct;
