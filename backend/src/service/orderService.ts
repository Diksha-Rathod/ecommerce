import { getRepository, In } from "typeorm";
import { orderDetails } from "../entity/orderDetails";

class OrderService {
  async addOrder(productArray: any[]) {
    try {
      let orderRepository = getRepository(orderDetails);
      const orderData = await orderRepository.save(productArray);
      return orderData;
    } catch (error) {
      console.log(error, "-------add order service ");
    }
  }

  async updateOrder(id, paymentData) {
    try {
      let orderRepository = getRepository(orderDetails);
      const result = await orderRepository.update(
        {
          id: In(id),
        },
        {
          paymentId: paymentData,
          status: "ordered",
        }
      );
      return result;
    } catch (error) {
      console.log(error, "-------update order service ");
    }
  }

  async deleteOrder(id) {
    try {
      const orderRepository = await getRepository(orderDetails);
      const result = await orderRepository.update({
        id:id
      },{
        status:"Refunded"
      })
     
      return result;
    } catch (error) {
      console.log(error, "---------deleteorder service");
    }
  }
  async getOrder(id) {
    try {
      const orderRepository = await getRepository(orderDetails);
      let result = await orderRepository.find({
        where: { userId: id }
      })
  
      return result;
    } catch (error) {
      console.log(error, "---------get order service");
    }
  }
}
const orderService = new OrderService();
export default orderService;
