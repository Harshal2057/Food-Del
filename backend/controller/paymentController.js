import paymentModel from "../model/paymentModel.js";
import razorpayInstance from "../config/razorpay.js"
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

const paymentOrder = async(req ,res) => {


    try {

        const { amount } = req.body;
        if (!amount || !Number.isFinite(amount) || amount <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid payment amount",
            });
        }
        
        const option = {
            amount : Number(amount * 100),
            currency : "INR",
            receipt : Math.floor(Date.now() + Math.random() * 10).toString()
        }

        const order = await razorpayInstance.orders.create(option);

        res.status(200).json({
            success:true,
            data : order
        })

    } catch (error) {
        
        res.status(400).json({
            success:false,
            message:`Error occured while creating order => ${error}`
        })

    }

}

const verifyPayment = async(req , res) => {

    try {
        
         const{razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body;
         const userId = req.body.userId;

         console.log(`User id in payment => ${req.body.userId}`);

         if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            console.log("Missing required payment details");
            return res.status(400).json({ error: "Missing required payment details" });
        }

        if (!process.env.RAZOR_PAY_SECRET) {
            console.log(" Missing Razorpay Secret Key");
            return res.status(500).json({ error: "Missing Razorpay Secret Key" });
        }

        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        console.log("Sign String:", sign);

        const expectedSign = crypto.createHmac("sha256", process.env.RAZOR_PAY_SECRET)
            .update(sign.toString())
            .digest("hex");

        console.log("Expected Sign:", expectedSign);
        console.log("Razorpay Signature:", razorpay_signature);

        const isAuthentic = expectedSign === razorpay_signature;
        console.log("isAuthentic:", isAuthentic);

        if (isAuthentic) {
            console.log("Signature Matched. Saving payment...");

            const payment = new paymentModel({
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
                status:"Success"
            });

            await payment.save();
            console.log(" Payment saved successfully.");

            return res.json({ message: "Payment Successfully Verified" });
        } else {
            console.log(" Invalid Signature.");
            return res.status(400).json({ error: "Invalid Signature" });
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Error occurred while verifying payment => ${error.message}`
        });
    }

}

export {paymentOrder , verifyPayment};