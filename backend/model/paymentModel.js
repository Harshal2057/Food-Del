import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({

    razorpay_order_id:{
        type:String,
        required:true
    },

    razorpay_payment_id:{
        type:String,
        required:true
    },

    razorpay_signature :{
        type:String,
        required:true
    },

    Date:{
        type:Date,
        default:Date.now
    },

    status :{
        type:String,
        enum:["Pending" , "Success" , "Failed"],
        default:"Pending",
        required:true
    },


})

export default mongoose.model("payment" , paymentSchema);