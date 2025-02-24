import paymentRouteazorpay from "razorpay";
import dotenv from "dotenv";
import Razorpay from "razorpay";

dotenv.config();

const razorpayInstance = new Razorpay({
    key_id : process.env.RAZOR_PAY_KEY_ID,
    key_secret : process.env.RAZOR_PAY_SECRET
});

export default razorpayInstance;
