import joi from "joi";

class ProductValidation {
  async addProductValidation(reqBody) {
    const productSchema = joi.object().keys({
      name: joi.string().required(),
      price: joi.number().required(),
      details: joi.string().required(),
      totalQuantity: joi.number().required(),
      imageUrl: joi.string().optional(),
      type: joi.optional(),
    });
    const { error, value } = productSchema.validate(reqBody, {
      abortEarly: false,
    });
    if (error) {
      return { status: false, error: error.details };
    } else {
      return { status: true, data: value };
    }
  }
  async updateProductValidation(reqBody) {
    
    const productSchema = joi.object({
      quantity: joi.number().optional(),
      name: joi.string().required(),
      details: joi.string().optional(),
      price: joi.number().optional(),
    });
    const { error, value } = productSchema.validate(reqBody, {
      abortEarly: false,
    });

    if (error) {
      return { status: false, error: error.details };
    } else {
      return { status: true, data: value };
    }
  }
  async deleteProductValidation(req) {
    const productSchema = joi.object({
      id: joi.number().required(),
    });
    const { error, value } = productSchema.validate(req.params, {
      abortEarly: false,
    });

    if (error) {
      return { status: false, error: error.details };
    } else {
      return { status: true, data: value };
    }
  }

  async getProductValidation(req) {
    const productSchema = joi.object({
      limit: joi.number().optional(),
      offset: joi.number().optional(),
    });
    const { error, value } = productSchema.validate(req, {
      abortEarly: false,
    });

    if (error) {
      return { status: false, error: error.details };
    } else {
      return { status: true, data: value };
    }
  }
}
const productValidation = new ProductValidation();
export default productValidation;
