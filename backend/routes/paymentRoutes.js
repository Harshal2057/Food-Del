import express from "express";
import { paymentOrder , verifyPayment } from "../controller/paymentController.js";
import authMiddleware from "../middleware/auth.js";



const paymentRoute = express.Router();

paymentRoute.post("/order" , paymentOrder);
paymentRoute.post("/verify" , verifyPayment);

export default paymentRoute;