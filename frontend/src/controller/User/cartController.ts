class CartController{
    async addProductToCart(req,res){ 
      res.render("addToCart");
    }

    async getCartProduct(req,res){ 
        res.render("getCart");
    }

    async deleteCart(req,res){ 
        res.render("deletecart");
    }

    async updateCart(req,res){ 
        res.render("editCart");
    }
}
const cartController=new CartController();
export default cartController;