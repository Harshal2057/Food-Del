import express from "express";
import { addToCart , removeFromCart , getCart } from "../controller/cartController.js";
import authMiddleware from "../middleware/auth.js";

const cartRouter = express.Router();

cartRouter.post("/add/cart" ,authMiddleware , addToCart);
cartRouter.post("/remove/cart" ,authMiddleware , removeFromCart);
cartRouter.post("/get/cart" ,authMiddleware , getCart);

export default cartRouter;

