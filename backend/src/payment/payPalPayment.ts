import { getRepository } from "typeorm";
import { Cart } from "../entity/cart";
import HttpConstant from "../constant/httpConstant";
import paypal  from "paypal-rest-sdk"
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AVrTLJQge1DMJB49EoOUI4250YNYR4bg4hV1lR0KGezT1vXst5TQKgJJuswkBbiA1yU4MTtTzjyKZAGF',
    'client_secret': 'EJW10CDcGYirn72zGnl69Jca-t4nNJy6vZ2dFBsMiVC-OyTqberQIHM_ay7hjLwBoAPE20QoaFDKoZgV'
  });
class PayPalIntegration{
    async createPayment(req,res){
        let cartRepository =  getRepository(Cart);
        let cartData=await cartRepository.find({
            where:{userId:req.user.id}
        })
        if(!cartData){
            return res
            .status(HttpConstant.HTTP_NOT_FOUND)
            .json({ status: false, message: "No data in your card" });
        }
       console.log(cartData);
        const create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://localhost:2020/success",
                "cancel_url": "http://localhost:2020/cancel"
            },
            "transactions": [{
                "item_list": {
                    "items": [{
                        "name": "",
                        "sku": "001",
                        "price": "25.00",
                        "currency": "USD",
                        "quantity": 1
                    }]
                },
                "amount": {
                    "currency": "USD",
                    "total": "25.00"
                },
                "description": "Washing Bar soap"
            }]
          
        };
        
        paypal.payment.create(create_payment_json, function (error, payment) {
          if (error) {
              throw error;
          } else {
            console.log("paypal")
              for(let i = 0;i < payment.links.length;i++){
                if(payment.links[i].rel === 'approval_url'){
                return res.json({payment});
                }
              }
          }
        });
    }
    async succesPayment(req,res){
        console.log("In successs")
            const payerId = req.query.PayerID;
            const paymentId = req.query.paymentId;
          
            const execute_payment_json = {
              "payer_id": payerId,
              "transactions": [{
                  "amount": {
                      "currency": "USD",
                      "total": "25.00"
                  }
              }]
            };
          
          // Obtains the transaction details from paypal
            paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
                //When error occurs when due to non-existent transaction, throw an error else log the transaction details in the console then send a Success string reposponse to the user.
              if (error) {
                  console.log(error.response);
                  throw error;
              } else {
                  console.log(JSON.stringify(payment));
                  res.send('Success');
              }
          });
          
        
    }
    
}
let paypalIntegration=new PayPalIntegration();
export default paypalIntegration; 