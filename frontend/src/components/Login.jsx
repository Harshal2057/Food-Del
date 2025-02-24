import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios"
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StoreContext } from "../context/StoreContext";

const Login = ({ setShowLogin }) => {

  const{token , setToken} = useContext(StoreContext);

  const [form, setForm] = useState("Sign-In");
  const [data , setData] = useState({
    username : "",
    email : "",
    password : ""

  })

  const url = "http://localhost:4000"


  const handleChange = (event) => {

    const name = event.target.name;
    const value = event.target.value;

    setData((prev) => ({
      ...prev,
      [name]:value
    }))

  }

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      console.log("Form data submitted successfully!");
  
      const formData = new FormData();
      formData.append("name", data.username);
      formData.append("email", data.email);
      formData.append("password", data.password);
  
      
      let newUrl = url;

      if (form === "Sign-In") {
        
        newUrl += "/api/user/register"

      }else{

         newUrl += "/api/user/login"

      }

      const response = await axios.post(newUrl , formData , {
        headers: { "Content-Type": "multipart/form-data" },
      })

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem( "token",response.data.token);

        if (form === "Sign-In") {
          toast.success("Sign-up successful! 🎉");
        } else {
          toast.success("Login successful! 🚀");
        }

        setShowLogin(false);

      }else{
        alert(response.data.message);
      }

    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message); // Show "User already registered!"
      } else {
        toast.error("Something went wrong, please try again.");
      }
    }
  };
  

  return (
    <div className="fixed inset-0 flex justify-center  items-center backdrop-blur-xs z-20">
      <div className="w-sm p-6 bg-white opacity-100 border-amber-700 border-solid border-2 rounded-lg ">
        <div className="flex justify-between ">
          <h1 className="font-bold text-2xl">{form}</h1>
          <button onClick={() => setShowLogin(false)}>
            <img src={assets.cross_icon} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mt-4 flex flex-col gap-4">
            {form === "Sign-In" && (
              <div>
                <input
                  type="text"
                  name="username"
                  value={data.username}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full h-10 px-3 border-stone-300 border-solid border-2"
                />
              </div>
            )}

            <div>
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full h-10 px-3 border-stone-300 border-solid border-2"
              />
            </div>

            <div>
              <input
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full h-10 px-3 border-stone-300 border-solid border-2"
              />
            </div>
          </div>

          <div className="w-full h-10 mt-4 bg-amber-600 flex justify-center text-white font-semibold hover:bg-white border-amber-600 border-solid border-2 hover:text-amber-600">
    <button type="submit" className="w-full h-full">
        {form}
    </button>
</div>
        </form>

        {form === "Sign-In" ? (
          <div className="flex mt-4">
            <p>Already have an account?</p>
            <button className="text-amber-700" onClick={() => setForm("Login")}>
              Try Logging in
            </button>
          </div>
        ) : (
          <div className="flex mt-4">
            <p>New user?</p>
            <button
              className="text-amber-700"
              onClick={() => setForm("Sign-In")}
            >
              Create a new account
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
