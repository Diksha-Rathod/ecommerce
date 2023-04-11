import { getRepository, In, Not } from "typeorm";
import { Request, Response } from "express";
import { Product } from "../entity/product";
import dotenv from "dotenv";
import path from "path";
dotenv.config();
class ProductService {
  async addProduct(reqBody) {
    try {
      const productRepo = await getRepository(Product);
      const data = await productRepo.save({
        name: reqBody.name,
        details: reqBody.details,
        price: reqBody.price,
        totalQuantity: reqBody.totalQuantity,
        productImg: reqBody.imageUrl,
      });

      return data;
    } catch (error) {
      console.log(error, "---------addproduct service");
    }
  }

  async updateProduct(reqBody, id) {
    try {
      const productRepo = await getRepository(Product);
      const result = await productRepo.update(
        {
          id: id,
        },
        {
          name: reqBody.name,
          details: reqBody.details,
          price: reqBody.price,
          totalQuantity: reqBody.totalQuantity,
        }
      );

      return result;
    } catch (error) {
      console.log(error, "--------update Product service");
    }
  }

  async deleteProduct(id) {
    try {
      const productRepo = await getRepository(Product);
      const result = await productRepo.delete(id);
      return result;
    } catch (error) {
      console.log(error, "---------deleteProduct service");
    }
  }

  async getProductByUser(reqQuery) {
    try {
      const productRepo = await getRepository(Product);
      const [list, count] = await productRepo.findAndCount({
        select: {
          id: true,
          name: true,
          price: true,
          details: true,
          productImg: true,
        },
        where: {
          totalQuantity: Not(0),
        },
        skip: reqQuery.offset ? reqQuery.offset : parseInt(process.env.OFFSET),
        take: reqQuery.limit ? reqQuery.limit : parseInt(process.env.LIMIT),
      });
      return {
        list,
        count,
      };
    } catch (error) {
      console.log(error, "---------getProductby user service");
    }
  }

  async getProductByAdmin(reqQuery) {
    try {
      const productRepo = await getRepository(Product);
      const [list, count] = await productRepo.findAndCount({
        skip: reqQuery.offset ? reqQuery.offset : parseInt(process.env.OFFSET),
        take: reqQuery.limit ? reqQuery.limit : parseInt(process.env.LIMIT),
      });
      return {
        list,
        count,
      };
    } catch (error) {
      console.log(error, "---------getProductByadmin service");
    }
  }

  async getProductById(id) {
    try {
      const productRepo = await getRepository(Product);
      let product = await productRepo.findOne({
        where: { id: id },
      });
      return product;
    } catch (error) {
      console.log(error, "---------getProductById service");
    }
  }

  async decreaseProductQuantity(orderQuantity) {
    try {
      const productRepository = await getRepository(Product);
      orderQuantity.map(async (data) => {
        let product = await productRepository.findOne({
          where: { id: data.productId },
        });
        product.totalQuantity = product.totalQuantity - data.quantity;
        product.save();
      });
      return true;
    } catch (error) {
      console.log(error, "---------decreaseProductQuantity service");
    }
  }

  async IncreaseProductQuantity(orderQuantity) {
    try {
      const productRepository = await getRepository(Product);
      orderQuantity.map(async (data) => {
        let product = await productRepository.findOne({
          where: { id: data.productId },
        });
        product.totalQuantity = product.totalQuantity + data.quantity;
        product.save();
      });
      return true;
    } catch (error) {
      console.log(error, "---------IncreaseProductQuantity service");
    }
  }
}

const productService = new ProductService();
export default productService;
