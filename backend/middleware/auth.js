import jwt from "jsonwebtoken";
import userModel from "../model/userModel.js";

const authMiddleware = async(req , res, next) => {

        const token = req.headers.token;

        if(!token){
          return  res.status(400).json({
                success:false,
                message:"Enter valid login details"
            })
        }


        try {
            const token_decode = await jwt.decode(token , process.env.JWT_SECRET);


            req.body.userId = token_decode.user;

           
            next();
        } catch (error) {
            res.status(400).json({
                success:false,
                message:`Error is in auth => ${error}`
            })
        }

}

export default authMiddleware;