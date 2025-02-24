import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../model/userModel.js";
import dotenv from "dotenv";

dotenv.config();

const createToken = (id) => {
    return jwt.sign({id} , process.env.JWT_SECRET );
}

const register = async(req ,res) => {

  try {
    
    const {name , email , password} = req.body;

    if (!name || !email || !password) {
        res.status(400).json({
            success:false,
            message:"All fields are required !!"
        })
    }

    const saltRounds = 10;

    const checkEmail = await userModel.findOne({email});
    if (checkEmail) {
        res.status(400).json({
            success:false,
            message:"Email already registered"
        })
    }

    if (password.length < 8) {
        res.status(400).json({
            success:false,
            message:"Password too weak"
        })
    }

    const hashedPassword = await bcrypt.hash(password , saltRounds );
    console.log(hashedPassword);

    const newUser = await userModel.create({
        name:name,
        email:email,
        password:hashedPassword
    })

    console.log("new user created")

    const token = createToken(newUser._id);

    console.log("new token created =>" , token);

    return res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: newUser,
        token:token
      });

  } catch (error) {
    res.status(400).json({
        success:false,
        message:`Error occured while creating use => ${error}`
    })
  }

}

const login = async(req , res) => {

  try {
    
    const {email , password} = req.body;

    if (!email || !password) {
        res.status(400).json({
            success:false,
            message:"All fields are required"
        })
    }

    let user = await userModel.findOne({email});

    if (!user) {
        res.status(400).json({
            success:false,
            message:"User not found"
        })
    }

    const payload = {
        email : email,
        user:user.id
    }

    const checkPass = await bcrypt.compare(password , user.password);

    if (checkPass) {
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "3d" });


        user = user.toObject();
      user.token = token;
      user.password = undefined;
      const options ={
          expires : new Date(Date.now() + 3 * 24 * 60 *60 *10000)
      }


      res.cookie("tokens", token, {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
        maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
      });

      console.log("the token =>" , token);
  
      return res.status(200).json({
        success: true,
        token,
        user,
        message: "User logged in successfully",
      });

    } else{
            res.status(400).json({
                success:false,
                message:"Password is incorrect"
            })
    }

  } catch (error) {
    
    res.status(400).json({
        success:false,
        message:`Error occured while login => ${error}`
    })

  }

}

export {register , login};