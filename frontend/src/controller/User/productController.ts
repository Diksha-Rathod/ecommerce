class ProductController{
    async getProduct(req,res){ 
res.render("getProductUser");
    }
}
const productController=new ProductController();
export default productController;