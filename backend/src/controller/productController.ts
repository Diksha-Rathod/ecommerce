import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Product } from "../entity/product";
import productService from "../service/productService";

import productValidation from "../expressValidation/productValidation";
import HttpConstant from "../constant/httpConstant";
class ProductController {
  async addProduct(req, res) {
    try {
      const reqBody = req.body;
      const validate = await productValidation.addProductValidation(reqBody);
      
      if (validate.status === false) {
        return res
          .status(HttpConstant.HTTP_NOT_FOUND)
          .json({ status: false, message: validate.error });
      }

      const data = await productService.addProduct(reqBody);
      return res
        .status(HttpConstant.HTTP_CREATED)
        .json({ data, status: true, message: "Product Added Successfully" });
    } catch (error) {
      console.log(error, "---------------add product  controller");
    }
  }
  async updateProduct(req: Request, res: Response) {
    try {
      const reqBody = req.body;
      const paramId = parseInt(req.params.id);

      // const validate = await productValidation.updateProductValidation(reqBody);
      // console.log("------------------------before validation");
      // if (validate.status === false) {
      //   return res
      //     .status(HttpConstant.HTTP_NOT_FOUND)
      //     .json({ status: false, data: validate.error });
      // }

      let productRepo = getRepository(Product);
      let product = await productRepo.findOne({
        where: { id: paramId },
      });

      if (!product) {
        return res
          .status(HttpConstant.HTTP_NOT_FOUND)
          .json({ status: false, data: " No record found with this id ." });
      }
      const data = await productService.updateProduct(reqBody, paramId);
      res.json({
        data,
        status: true,
        message: "product updated succefully .",
      });
    } catch (error) {
      console.log(error, "---------------updateproduct controller");
    }
  }
  async deleteProduct(req: Request, res: Response) {
    try {
      const paramId = parseInt(req.params.id);

      const validate = await productValidation.deleteProductValidation(req);
      if (validate.status === false) {
        return res
          .status(HttpConstant.HTTP_NOT_FOUND)
          .json({ status: false, data: validate.error });
      }
      let productRepo = getRepository(Product);

      let product = await productRepo.findOne({
        where: { id: paramId },
      });
      if (!product) {
        return res
          .status(HttpConstant.HTTP_NOT_FOUND)
          .json({ status: false, data: " No record found with this id ." });
      }
      const data = await productService.deleteProduct(paramId);
      res
        .status(HttpConstant.HTTP_CREATED)
        .json({data, status: true, message: "deleted succesfully.!" });
    } catch (error) {
      console.log(error, "---------------deleteProduct controller");
    }
  }

  async getProductByUser(req: Request, res: Response) {
    try {
      let param = req.query;
      const validate = await productValidation.getProductValidation(req.query);
      if (validate.status === false) {
        return res
          .status(HttpConstant.HTTP_NOT_FOUND)
          .json({ status: false, data: validate.error });
      }
      const data = await productService.getProductByUser(param);
      res
        .status(HttpConstant.HTTP_SUCCESS_OK)
        .json({ data, status: true, message: "All product list!" });
    } catch (error) {
      console.log(error, "---------------get product by user ----- controller");
    }
  }

  async getProductByAdmin(req: Request, res: Response) {
    try {
      // const validate=await productValidation. getProductValidation(req.query)
      // if (validate.status===false) {
      //   return res
      //     .status(HttpConstant.HTTP_NOT_FOUND)
      //     .json({ status: false, data: validate.error });
      // }
      let productRepo = getRepository(Product);
      let product = await productRepo.find();
      if (product.length == 0) {
        return res
          .status(HttpConstant.HTTP_SUCCESS_OK)
          .json({ status: false, message: " no product found" });
      }
      const data = await productService.getProductByAdmin(req.query);
      res
        .status(HttpConstant.HTTP_SUCCESS_OK)
        .json({ data, status: true, message: "All product list!" });
    } catch (error) {
      console.log(
        error,
        "---------------get product BY Admin ----- controller"
      );
    }
  }

  async getProductById(req: Request, res: Response) {
    try {
      const paramId = parseInt(req.params.id);
      let productRepo = getRepository(Product);
      let product = await productRepo.findOne({
        where: { id: paramId },
      });

      if (!product) {
        return res
          .status(HttpConstant.HTTP_SUCCESS_OK)
          .json({ status: false, message: " No product found with this id ." });
      }
      const data = await productService.getProductById(paramId);
      res
        .status(HttpConstant.HTTP_CREATED)
        .json({ data, status: true, message: "product by id...!" });
    } catch (error) {
      console.log(error, "---------------get product by id   ----- controller");
    }
  }
}
const productController = new ProductController();
export default productController;
