import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv";

dotenv.config();

const cloudinaryConnect = async() => {

try {
    
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API , 
        api_secret: process.env.CLOUDINARY_SECRET
    })

    console.log("Cloudinary set up successfully !!");

} catch (error) {
    console.log(error);
}

}

export default cloudinaryConnect;