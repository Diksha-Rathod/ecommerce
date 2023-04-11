import { getRepository } from "typeorm";
import { Cart } from "../entity/cart";

class CartService {
  async addProductToCart(reqBody, product,userId) {
    try {
      let cartRepository = getRepository(Cart);
     const id= parseInt(reqBody.productId) 
     const quantity=parseInt(reqBody.quantity)
      const data = await cartRepository.save({
        quantity: quantity,
        productId: id,
        productName: product.name,
        price: product.price,
        userId: userId ,
        totalAmount: quantity * product.price,
      });
      return data;
    } catch (error) {
      console.log(error, "-------addproduct to cart service");
    }
  }
  async getUserCartList(id) {
    try {
      let cartRepository = getRepository(Cart);
      let userCart = await cartRepository.find({
        where: {userId: id },
        relations: ["product"],
      });
      return userCart;
    } catch (err) {
      console.log(err, "-------get cart list service");
    }
  }

  async getCartListById(id) {
    try {
      let cartRepository = getRepository(Cart);
      let userCart = await cartRepository.find({
        where: {id: id },
        relations: ["product"],
      });
      return userCart;
    } catch (err) {
      console.log(err, "-------get cart list service");
    }
  }

  async updateUserCart(id, quantity, userCart) {
    try {
      let cartRepository = getRepository(Cart);
     
      let result = await cartRepository.update(
        {
          id, 
        },
        {
          quantity: quantity,
          totalAmount: quantity * userCart.product.price,
        },
      );
     return result;
    } catch (error) {
      console.log(error, "---------updateuser service");
    }
  }

  async deleteUserCart(id) {
    try {
      const deleteRepo = await getRepository(Cart);
      const result = await deleteRepo.delete(id);
      return result;
    } catch (error) {
      console.log(error, "---------deleteusercart service");
    }
  }
}

const cartService = new CartService();
export default cartService;
