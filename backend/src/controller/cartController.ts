import { Request, Response } from "express";
import { DataTypeNotSupportedError, getRepository } from "typeorm";
import { Cart } from "../entity/cart";
import { Product } from "../entity/product";
import cartService from "../service/cartService";

import cartValidation from "../expressValidation/cartValidation";
import HttpConstant from "../constant/httpConstant";
class CartController {
  async addProductToCart(req, res) {
    try {
      let userId = req.user.id;
      let reqBody = req.body;
      let productQuantantity = parseInt(reqBody.quantity);
      let productId = parseInt(reqBody.productId);
      const validate = await cartValidation.addToCartValidation(reqBody);
      if (validate.status === false) {
        return res
          .status(HttpConstant.HTTP_NOT_FOUND)
          .json({ status: false, message: validate.error });
      }

      // if (productQuantantity <= 0) {
      //   return res.status(HttpConstant.HTTP_NOT_FOUND).json({
      //     status: false,
      //     data: "Minimum quantity for order is one...!",
      //   });
      // }
      // // Product
      let productRepository = getRepository(Product);
      let data = await productRepository.findOne({
        where: { id: productId },
      });

      if (!data) {
        return res.status(HttpConstant.HTTP_SUCCESS_OK).json({
          data,
          status: false,
          message: "No product found with this id .",
        });
      }
      if (data.totalQuantity == 0) {
        return res.status(HttpConstant.HTTP_SUCCESS_OK).json({
          data,
          status: false,
          message: "currently product not available",
        });
      }
      if (data.totalQuantity < productQuantantity) {
        return res
          .status(HttpConstant.HTTP_SUCCESS_OK)
          .json({ data, status: false, message: "Quantity not available " });
      }
     // Cart
      let cartRepo = getRepository(Cart);
      let userCart = await cartRepo.findOne({
        where: {
          userId: req.body.userId,
          productId: productId,
        },
        relations: ["product"],
      });
      let quantity=data.totalQuantity;
   
       
      if (userCart) {
     
        req.params.id = userCart.id.toString();
        productQuantantity=productQuantantity+userCart.quantity;
        if (quantity < productQuantantity) {
          return res
            .status(HttpConstant.HTTP_SUCCESS_OK)
            .json({  status: false, message: "Quantity not available " });
        }
        else{
          let data = await cartService.updateUserCart(
            req.params.id,
            productQuantantity,
            userCart
          );
          if (data) {
            return res.status(HttpConstant.HTTP_CREATED).json({
              data,
              status: true,
              message: " product updated in cart..",
            });
          }
        }
        
        
      } else {
        let result = await cartService.addProductToCart(reqBody, data, userId);
        res
          .status(HttpConstant.HTTP_CREATED)
          .json({ result, status: true, message: " product added to cart.." });
      }
    } catch (err) {
      console.log(err, "-------------add product to cart controller");
    }
  }
  async getUserCartList(req, res: Response) {
    try {
      const data = await cartService.getUserCartList(req.user.id);
      if (data.length > 0) {
        return res
          .status(HttpConstant.HTTP_CREATED)
          .json({ data, status: true, message: " cart details .." });
      }
      if (data.length == 0) {
        return res
          .status(HttpConstant.HTTP_SUCCESS_OK)
          .json({ data, status: false, message: " your cart is empty.." });
      }
    } catch (err) {
      console.log(err, "-------------get cartlist controller");
    }
  }

  async getCartListById(req, res: Response) {
    try {
      let paramId = parseInt(req.params.id);
      const validate = await cartValidation.getCartListValidation(req?.params);
      if (validate.status === false) {
        return res
          .status(HttpConstant.HTTP_NOT_FOUND)
          .json({ status: false, message: validate.error });
      }

      const data = await cartService.getCartListById(paramId);
      if (data == null) {
        res
          .status(HttpConstant.HTTP_NOT_FOUND)
          .json("No  cart found with this id");
      }
      res
        .status(HttpConstant.HTTP_CREATED)
        .json({ data, status: true, message: " cart details .." });
    } catch (err) {
      console.log(err, "-------------get cartlist controller");
    }
  }

  async updateUserCart(req: Request, res: Response) {
    try {
      let reqBody = req.body;
      let quantity = parseInt(req.body.quantity);
      let paramId = parseInt(req.params.id);

      const validate = await cartValidation.updateCartValidation(reqBody);
      if (validate.status === false) {
        return res
          .status(HttpConstant.HTTP_NOT_FOUND)
          .json({ status: false, message: validate.error });
      }
      let cartRepository = getRepository(Cart);
      let data: any = await cartRepository.findOne({
        where: { id: paramId },
        relations: ["product"],
      });

      if (!data) {
        return res
          .status(HttpConstant.HTTP_NOT_FOUND)
          .json({ data, status: false, message: "No cart found with this id" });
      }

      if (quantity <= 0) {
        return res.status(HttpConstant.HTTP_CREATED).json({
          status: false,
          message: "Minimum quantity for order is one...!",
        });
      }

      if (data.product.totalQuantity < quantity) {
        return res
          .status(HttpConstant.HTTP_SUCCESS_OK)
          .json({ data, status: false, message: "Quantity not available " });
      }

      data = await cartService.updateUserCart(paramId, quantity, data);
      res
        .status(HttpConstant.HTTP_CREATED)
        .json({ data, status: true, message: "cart  updated succesfuly.. .." });
    } catch (err) {
      console.log(err, "-------------update cart controller");
    }
  }
  async deleteUserCart(req: Request, res: Response) {
    try {
      let paramId = parseInt(req.params.id);

      // const validate = await cartValidation.deleteCartValidation(req);
      // if (validate.status === false) {
      //   return res
      //     .status(HttpConstant.HTTP_NOT_FOUND)
      //     .json({ status: false, data: validate.error });
      // }
      let cartRepository = getRepository(Cart);
      let userCart = await cartRepository.findOne({
        where: { id: paramId },
      });
    
      if (!userCart) {
        return res
          .status(HttpConstant.HTTP_NOT_FOUND)
          .json({ status: false, message: " No cart found with this id ." });
      }
      const data = await cartService.deleteUserCart(paramId);
      res
        .status(HttpConstant.HTTP_CREATED)
        .json({ data, status: true, message: "deleted succesfuly.. .." });
    } catch (err) {
      console.log(err, "-------------delete cart controller");
    }
  }
}

const cartController = new CartController();
export default cartController;
