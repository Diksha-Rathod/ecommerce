import express from "express";
import addproduct from "../controller/Admin/productController/addProduct";
import deleteproduct from "../controller/Admin/productController/deleteproduct";
import getproduct from "../controller/Admin/productController/getProductByAdmin";
import login from "../controller/Admin/authController/loginController";
import registration from "../controller/Admin/authController/registerController";
import updateproduct from "../controller/Admin/productController/updateProduct";
import userController from "../controller/Admin/userController";
import adminController from "../controller/Admin/adminController";
import homeController from "../controller/Admin/homeController";
import changepassword from "../controller/Admin/authController/changePassword";
import forgotpassword from "../controller/Admin/authController/forgotPassword";
import resetpassword from "../controller/Admin/authController/resetPassword";
import emailverification from "../controller/Admin/authController/emailVerification";
import productController from "../controller/User/productController";
import cartController from "../controller/User/cartController";
import orderController from "../controller/User/orderController";
import authController from "../controller/User/authController";
import myprofile from "../controller/Admin/authController/myProfile";

const frontendRouter = express.Router();

frontendRouter.get("/login", login.userLogin);

frontendRouter.get("/logout", authController.logout);

frontendRouter.get("/register", registration.userRegistration);

frontendRouter.get("/admin/home", homeController.home);

frontendRouter.get("/admin/profile",myprofile.myProfile);

frontendRouter.get("/addProduct", addproduct.addProduct);

frontendRouter.get("/dashboard", adminController.adminDashboard);

frontendRouter.get("/product/List", getproduct.getProduct);

frontendRouter.get("/editProduct/:id", updateproduct.updateProduct);

frontendRouter.get("/admin/edit/:id", userController.updateAdminProfile);

frontendRouter.get("/delete/:id", deleteproduct.deletProduct);

frontendRouter.get("/getUser", userController.getAllUserByAdmin);

frontendRouter.get("/getUser/:id", userController.getUserById);

frontendRouter.get("/user/profilepage", userController.userProfile);

frontendRouter.get("/deleteUser/:id", userController.deleteUser);

frontendRouter.get("/user/edit/:id", userController.updateUser);

frontendRouter.get("/changePassword", changepassword.changePassword);

frontendRouter.get("/user/changePassword", authController.changePassword);

frontendRouter.get("/forgotPassword", forgotpassword.forgotPassword);

frontendRouter.get("/userDasboard", authController.home);

frontendRouter.get("/user/getProduct",productController.getProduct)

frontendRouter.get("/addToCart/:id",cartController.addProductToCart)

frontendRouter.get("/cart",cartController.getCartProduct)

frontendRouter.get("/deleteCart/:id",cartController.deleteCart)

frontendRouter.get("/editCart/:id",cartController.updateCart)

frontendRouter.get("/getOrder",orderController.getOrder)

frontendRouter.get("/confirmOrder",orderController.confirmOrder)

frontendRouter.get("/cancelOrder/:id",orderController.cancelOrder)

frontendRouter.get("/user/home",authController.home)

frontendRouter.get("/payment",authController.payment)

frontendRouter.post("/createPayment",authController.payment)


frontendRouter.get(
  "/resetPassword/:forgotPasswordToken",
  resetpassword.resetPassword
);

frontendRouter.get(
  "/emailVerification/:verificationToken",
  emailverification.emailVerification
);
export { frontendRouter };
