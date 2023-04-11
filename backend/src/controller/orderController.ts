import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Cart } from "../entity/cart";
import cartService from "../service/cartService";
import orderService from "../service/orderService";
import paymentService from "../service/paymentService";

import productService from "../service/productService";

import orderValidation from "../expressValidation/orderValidation";
import HttpConstant from "../constant/httpConstant";
import { orderDetails } from "../entity/orderDetails";
class OrderController {
  async addOrder(req, res) {
    let reqBody = req.body;
    let orderRepository = getRepository(Cart);
    let cartData: any = await orderRepository.find({
      where: { userId: req.user.id },
      relations: ["product"],
    });
    if (!cartData) {
      res.json("No Product in your cart");
    }
    let product = [];
    cartData.map(async (cartData) => {
      product.push({
        productName: cartData?.product.name,
        userId: cartData?.userId,
        amount: cartData.totalAmount,
        quantity: cartData?.quantity,
        productId: cartData?.productId,
        status: "pending",
      });
    });
    let orderData = await orderService.addOrder(product);
    if (orderData) {
      const validate = await orderValidation.addOrderValidation(reqBody);
      if (validate.status === false) {
        return res
          .status(HttpConstant.HTTP_NOT_FOUND)
          .json({ status: false, data: validate.error });
      }
      let temp = 0;
      const totalAmount = orderData.map(({ amount }) => amount);
      temp = totalAmount.reduce((a, b) => a + b);

      let paymentData = await paymentService.createPayment(reqBody, temp);
      if (!paymentData) {
        await orderService.deleteOrder(orderData);
        return res.json("payment failed ");
      }

      let order = [];

      orderData.map(async (orderData) => {
        order.push(orderData?.id);
      });
      let updateOrder = await orderService.updateOrder(order, paymentData.id);
      if (updateOrder) {
        let deleteCart = await cartService.deleteUserCart(cartData);
        let orderQuantity = [];
        orderData.map(async (orderData) => {
          orderQuantity.push({
            productId: orderData?.productId,
            quantity: orderData?.quantity,
          });
        });
        if (orderQuantity && orderQuantity.length > 0) {
          await productService.decreaseProductQuantity(orderQuantity);
        }
        if (deleteCart) {
          return res
            .status(HttpConstant.HTTP_CREATED)
            .json({ status: true, message: "order succesful" });
        }
      }
    }
  }
  async deleteOrder(req, res) {
    const orderRepository = await getRepository(orderDetails);
    let orderData = await orderRepository.find({
      where: { userId: req.user.id },
    });
    
    if (orderData.length == 0) {
      return res
        .status(HttpConstant.HTTP_NOT_FOUND)
        .json({ status: false, data: "no order yet" });
    }
    const data = await orderService.deleteOrder(req.params.id);
    if (!data) {
      return res
        .status(HttpConstant.HTTP_NOT_FOUND)
        .json({ data,status: false, message: "something went wrong" });
    }
    let orderQuantity = [];
    orderData.map(async (orderData) => {
      orderQuantity.push({
        productId: orderData?.productId,
        quantity: orderData?.quantity,
      });
    });
    if (orderQuantity && orderQuantity.length > 0) {
      await productService.IncreaseProductQuantity(orderQuantity);
    }
    const paymentUpdate = await paymentService.updatePayment(
      orderData[0].paymentId
    );
    if (!paymentUpdate) {
      return res
        .status(HttpConstant.HTTP_NOT_FOUND)
        .json({
          status: false,
          data: "something went wrong in payment update",
        });
    } else {
      return res
        .status(HttpConstant.HTTP_SUCCESS_OK)
        .json({ status: true, message: "order deleted succesfully" });
    }
  }

  async getOrder(req,res){
    const orderRepository = await getRepository(orderDetails);
    let orderData = await orderRepository.find({
      where: { userId: req.user.id },
    });
    if (orderData.length == 0) {
      return res
        .status(HttpConstant.HTTP_NOT_FOUND)
        .json({ status: false, messsage: "No order yet" });
    }
    const data = await orderService.getOrder(req.user.id);
    if (!data) {
      return res
        .status(HttpConstant.HTTP_NOT_FOUND)
        .json({data, status: false, message: "something went wrong" });
    }
    else{
      return res
      .status(HttpConstant.HTTP_SUCCESS_OK)
      .json({ data,status: true, message: "order details" });
    }

  }
}
const orderController = new OrderController();
export default orderController;
