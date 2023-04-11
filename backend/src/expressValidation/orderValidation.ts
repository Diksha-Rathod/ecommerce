import * as Joi from "joi";


class OrderValidation {
  async addOrderValidation(reqBody) {
    
    const cartSchema=Joi.object().keys({
       mode:Joi.string().required(),
     
    })
    const {error,value} = cartSchema.validate(reqBody,{
        abortEarly:false
    }); 
    if(error){
        return {status:false,error:error.details}
    }
    else{
        return{status:true,data:value}
    }
  }
}
const orderValidation=new OrderValidation();
export default orderValidation;