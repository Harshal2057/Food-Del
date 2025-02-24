import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets.js";
import axios from "axios"
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Add = () => {

  const url = "http://localhost:4000"

  const[image , setImage] = useState(false);
  const[sendFile , setSendFile] = useState(false);
  const[data , setData] = useState({
      name :"",
      description : "",
      category : "Salad",
      price : ""
  })

  const handleImage = (event) => {

    const file = event.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl)
    }

  }

  const handleSendFile = (event) => {

    const file = event.target.files[0];

    if (file) {
      setSendFile(file)
    }


  }

  const handleChange = (event) => {

    const name = event.target.name;
    const value = event.target.value;

    setData((prev) => ({
      ...prev,
      [name] : value,
    }));
    
  }

  const handleSubmit = async(event) => {
    event.preventDefault(); // Prevents page reload
    console.log("Form Data Submitted:", data);

    const formData = new FormData();
    formData.append("name" , data.name);
    formData.append("description" , data.description);
    formData.append("category" , data.category);
    formData.append("price" , Number(data.price));
    formData.append("image" , sendFile);

    try {
      const response = await axios.post(`${url}/food/add/image`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Response:", response.data);

      toast.success("Product added successfully!")

    } catch (error) {
      console.error("Error:", error);

      toast.error("Failed to add product!");
    }  };

  // useEffect(() => {
   
    
  // },[handleSubmit])



  return (
    <div className="mt-10 mx-10">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <div>
          <p>Uplaod Image</p>
          <label htmlFor="image">
            <img src={image || assets.uploadImage} className="w-[9rem] border-amber-600 border-solid border-2 rounded-2xl p-1" />
          </label>
          <input type="file" id="image"  onChange={(event) => {
    handleImage(event);
    handleSendFile(event);
  }} hidden className="border-gray-400 border-solid border-2" />
        </div>

        <div>
          <label htmlFor="product">
            <p>Product Name</p>
          </label>
          <input type="text" id="name" name="name" value={data.name} onChange={handleChange} className="border-gray-400 border-solid border-2" />
        </div>

        <div>
          <label htmlFor="desc">
            <p>Product Description</p>
          </label>
          <input type="textarea" id="description" name="description" value={data.description} onChange={handleChange} className="border-gray-400 border-solid border-2"/>
        </div>

        <div>
          <label>Choose a Category</label>
          <select className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500" name="category" value={data.category} onChange={handleChange}>
            <option value="Salad">Salad</option>
            <option value="Rolls">Rolls</option>
            <option value="Desert">Desert</option>
            <option value="Sandwich">Sandwich</option>
            <option value="Cake">Cake</option>
            <option value="Pure_vwg">Pure Veg</option>
            <option value="Pasta">Pasta</option>
            <option value="Noodles">Noodles</option>
          </select>
        </div>

        <div>
          <label htmlFor="price"><p>Price</p></label>
          <input type="text" id="price" name="price" value={data.price} onChange={handleChange} className="border-gray-400 border-solid border-2"/>
        </div>

        <div>
          <button type="submit" className="border-amber-600 border-solid border-2 px-3 py-1 font-semibold bg-amber-600 text-white rounded-sm hover:bg-white hover:text-amber-600">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
