import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const dbConnect = async() => {

    try {
        
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("db connection successfull")

    } catch (error) {
        console.log(error)
        console.log("Issue in db connection !!")
    }

}

export default dbConnect;