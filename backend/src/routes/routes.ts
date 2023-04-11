import express from "express";
const router = express.Router();

import productController from "../controller/productController";
import jwtMiddleware from "../middleware/jwtMiddleware";
import loginController from "../controller/authController";
import registerController from "../controller/registerController";
import userController from "../controller/userController";
import cartController from "../controller/cartController";
import orderController from "../controller/orderController";
import dotenv from "dotenv";
import authController from "../controller/authController";
import multer from "multer";
import path from "path";
import card from "../payment/Payment";
import paypalIntegration from "../payment/payPalPayment";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(`${__dirname}/../images/${req.body.type}`));
  },
  filename: function (req, file, cb) {
    const fileName = `${file.originalname.split(".")[0]}_${Date.now()}.${
      file.originalname.split(".")[1]
    }`;
    req.body["imageUrl"] = `images/${req.body.type}/${fileName}`;
    cb(null, fileName);
  },
});
const upload = multer({
  storage: storage,
});
dotenv.config();
router.post("/upload", upload.single("profileImg"));

//REGISTER
router.post("/register/:role", registerController.registerView);

// LOGIN
router.post("/login/:role", loginController.loginView);

// PRODUCT
router.post(
  "/admin/product",
  upload.single("productImg"),
  jwtMiddleware.jwtAuth,
  jwtMiddleware.hasAdminRole,
  productController.addProduct
);

router.patch(
  "/admin/product/:id",
  jwtMiddleware.jwtAuth,
  jwtMiddleware.hasAdminRole,
  productController.updateProduct
);

router.delete(
  "/admin/product/:id",
  jwtMiddleware.jwtAuth,
  jwtMiddleware.hasAdminRole,
  productController.deleteProduct
);

router.get(
  "/user/product",
  jwtMiddleware.jwtAuth,
  jwtMiddleware.hasUserRole,
  productController.getProductByUser
);

router.get(
  "/admin/product",
  jwtMiddleware.jwtAuth,
  jwtMiddleware.hasAdminRole,
  productController.getProductByAdmin
);

router.get(
  "/product/:id",
  jwtMiddleware.jwtAuth,
  productController.getProductById
);

// USER
router.get(
  "/admin/user",
  jwtMiddleware.jwtAuth,
  jwtMiddleware.hasAdminRole,
  userController.getAllUserByAdmin
);

router.delete(
  "/user/:id",
  jwtMiddleware.jwtAuth,
  jwtMiddleware.hasAdminRole,
  userController.deleteUser
);

router.put(
  "/user/:id",
  upload.single("profileImg"),
  jwtMiddleware.jwtAuth,
  
  userController.updateUser
);

router.get("/user/:id", jwtMiddleware.jwtAuth, userController.getUserById);

router.get("/user", jwtMiddleware.jwtAuth, userController.getUser);

//payment

// router.post("/card",jwtMiddleware.jwtAuth,card.createCard)

// router.get("/getcard",jwtMiddleware.jwtAuth,card.getcard)

// router.post("/payment",jwtMiddleware.jwtAuth,card.makePayment)

router.post("/payment",jwtMiddleware.jwtAuth,paypalIntegration.createPayment)
router.get("/success",jwtMiddleware.jwtAuth,paypalIntegration.succesPayment)
router.get('/cancel', (req, res) => res.send('Cancelled'));
//CART
router.post(
  "/cart",
  jwtMiddleware.jwtAuth,
  jwtMiddleware.hasUserRole,
  cartController.addProductToCart
);

router.get(
  "/cart",
  jwtMiddleware.jwtAuth,
  jwtMiddleware.hasUserRole,
  cartController.getUserCartList
);

router.get(
  "/cart/:id",
  jwtMiddleware.jwtAuth,
  jwtMiddleware.hasUserRole,
  cartController.getCartListById
);

router.put(
  "/cart/:id",
  jwtMiddleware.jwtAuth,
  jwtMiddleware.hasUserRole,
  cartController.updateUserCart
);

router.delete(
  "/cart/:id",
  jwtMiddleware.jwtAuth,
  jwtMiddleware.hasUserRole,
  cartController.deleteUserCart
);

//Order
router.post(
  "/user/order",
  jwtMiddleware.jwtAuth,
  jwtMiddleware.hasUserRole,
  orderController.addOrder
);

router.delete(
  "/order/:id",
  jwtMiddleware.jwtAuth,
  jwtMiddleware.hasUserRole,
  orderController.deleteOrder
);

router.get(
  "/order",
  jwtMiddleware.jwtAuth,
  jwtMiddleware.hasUserRole,
  orderController.getOrder
);

//PASSWORD
router.patch(
  "/auth/change-password",
  jwtMiddleware.jwtAuth,
  authController.changePassword
);

router.patch("/auth/forgot-password", authController.forgotPassword);

router.patch(
  "/auth/reset-password/:forgotPasswordToken",
  authController.resetPassword
);

//EMAIL VERIFY
router.patch(
  "/auth/email-verify/:verificationToken",
  authController.emailVerify
);

export { router };
