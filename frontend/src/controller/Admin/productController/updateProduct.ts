class UpdateProduct {
  async updateProduct(req, res) {
    res.render("updateProduct", { data: {}, title: "Edit product" });
  }
}
const updateproduct = new UpdateProduct();
export default updateproduct;
