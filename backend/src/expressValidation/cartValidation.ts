
import joi from 'joi'

class CartValidation {
  async addToCartValidation(reqBody) {
    const cartSchema=joi.object().keys({
        productId:joi.number().required(),
        quantity:joi.number().required(),
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
  async getCartListValidation(req) {
    const cartSchema=joi.object().keys({
        id:joi.number().required()
    })
     const {error,value} = cartSchema.validate(req,{
        abortEarly:false
    }); 

    if(error){
        return {status:false,error:error.details}
    }
    else{
        return{status:true,data:value}
    }
  }
  async updateCartValidation(reqBody) {
    const cartSchema = joi.object({
            quantity: joi.number().required()
    })
    const {error,value} = cartSchema.validate(reqBody)

    if(error){
        return {status:false,error:error.details}
    }
    else{
        return{status:true,data:value}
    }
  }
  async deleteCartValidation(req) {
    const cartSchema=joi.object().keys({
        id:joi.number().required()
    })
    const {error,value} = cartSchema.validate(req,{
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
const cartValidation=new CartValidation();
export default cartValidation;