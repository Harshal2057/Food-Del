import foodModel from "../model/foodModel.js";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const addFood = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    console.log("Received Data:", req.body);

    if (!req.files || !req.files.image) {
      return res.status(400).json({ success: false, message: "No image uploaded!" });
    }

    const imageFile = req.files.image;
    console.log("Received File:", imageFile.name);

    // Ensure "uploads" directory exists
    const uploadDir = path.join(__dirname, "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const imageFileName = Date.now() + `.${imageFile.name.split(".").pop()}`;
    const imagePath = `/uploads/${imageFileName}`;

    imageFile.mv(path.join(uploadDir, imageFileName), async (err) => {
      if (err) {
        console.log("Error uploading file:", err);
        return res.status(500).json({ success: false, message: "File upload failed." });
      }
      console.log("File uploaded successfully!");

      const foodData = await foodModel.create({
        name,
        description,
        price,
        category,
        image: imagePath, // Save image path in DB
      });

      console.log("Food saved to database:", foodData);

      return res.status(200).json({
        success: true,
        message: "Food added successfully!",
        data: foodData,
      });
    });

  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while adding food.",
    });
  }
};

const removeFood = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ success: false, message: "ID is required!" });
    }

    const deletedFood = await foodModel.findByIdAndDelete(id);

    if (!deletedFood) {
      return res.status(404).json({ success: false, message: "Food not found!" });
    }

    return res.status(200).json({
      success: true,
      message: "Food removed successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error occurred in removing food",
    });
  }
};

const showList = async (req, res) => {
  try {
    const list = await foodModel.find({});

    if (!list || list.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No food data found !!",
      });
    }

    // console.log(list); // This will only run if list is not empty

    return res.status(200).json({
      success: true,
      message: "Food list displayed successfully",
      data: list,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while displaying food list !!",
    });
  }
};

export { addFood, removeFood, showList };
