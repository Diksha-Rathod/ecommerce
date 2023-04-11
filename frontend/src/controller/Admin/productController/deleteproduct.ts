class DeleteProduct{
    async deletProduct(req, res) {
      res.render("deleteProduct");
    }
  }
  const deleteproduct = new DeleteProduct();
  export default deleteproduct;