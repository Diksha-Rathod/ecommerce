import { EntityRepository, getRepository } from "typeorm";
import { paymentDetails } from "../entity/paymentDetails";


class PaymentService {
  async createPayment(reqBody,amount) {
    try {
              const paymentRepository = await getRepository(paymentDetails);
              const paymentData = await paymentRepository.save({
                mode: reqBody.mode,
                status: "success",
                amount: amount,
                 });
                
              return paymentData;
            } 
      catch (error) {
      console.log(error, "---------create payment service ");
    }
  }

  async updatePayment(paymentId) {
    try {
      const paymentRepository =await getRepository(paymentDetails);
    
       const result = await paymentRepository.update(
        {
          id: paymentId,
        },
        {
         status:"refunded"
        }
      );
      return true
    } catch (error) {
      console.log(error, "---------update payment service");
    }
}
}
const paymentService=new PaymentService();
export default paymentService;