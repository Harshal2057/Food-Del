import express from "express";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import foodRoute from "../backend/routes/foodRoute.js"
import cloudinaryConnect from "../backend/config/cloudinary.js"
import dbConnect from "../backend/config/database.js"
import cors from "cors"
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoutes.js";
import paymentRoute from "./routes/paymentRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/"
}))




const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true  // Allow cookies & authentication headers
}));

dbConnect();
cloudinaryConnect();

//*************ROUTES ***************/
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/food" , foodRoute);
app.use("/api/user" , userRouter);
app.use("/api/cart" , cartRouter);
app.use("/api/payment" , paymentRoute);

app.get("/" , (req , res) => {
    res.send("Server Started !!")
})

app.listen(PORT , () => {
    console.log(`The server is running on http://localhost:${PORT}`)
})


