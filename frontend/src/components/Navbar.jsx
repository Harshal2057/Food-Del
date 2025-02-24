import React, { useContext, useRef, useState } from "react";
import Exploremenu from "./Exploremenu";
import { Link, Links, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets"; 
import { Player } from "@lordicon/react";   /// => LORD-ICON
import Lottie from "lottie-react";    /// => LORD-ICON
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import searchIcon from "../assets/orange_search.json";
import cart from "../assets/cart_icon.json";
import { use } from "react";
import { StoreContext } from "../context/StoreContext";

const Navbar = ({setShowLogin}) => {
  const searchRef = useRef(null);   /// => LORD-ICON
  const cartRef = useRef(null);    /// => LORD-ICON
  const [isHovered, setIsHovered] = useState(false);

  const {token , setToken} = useContext(StoreContext);

  const navigate = useNavigate()

  const logOut = () => {
    localStorage.removeItem("token")
    setToken("")
    navigate("/")
    
  }

  return (
    <div className="w-full flex justify-between gap-32 sm:justify-around mt-5 px-10 ">
      <div>
        <img
          className="w-auto min-w-[100px] max-w-[200px]"
          src={assets.logo}
          alt="Logo"
        />
      </div>

      <div className=" hidden xl:flex gap-10 ">
        <Link to="/" >
          <ul className="hover:underline decoration-2 underline-offset-4">
            Home
          </ul>
        </Link>

       
          <a href="#Explore-menu" className="hover:underline decoration-2 underline-offset-4">
            Menu
          </a>
          

      
          <a href="" className="hover:underline decoration-2 underline-offset-4 ">
            Mobile App
          </a>
        

       
          <a href="#footer" className="hover:underline decoration-2 underline-offset-4 ">
            Contact Us
          </a>
      
      </div>

      <div className="hidden md:flex gap-10">
        {/* Lordicon Animation */}
        <div
          onMouseEnter={() => searchRef.current?.goToAndPlay(0)}
          className="w-10 h-10"
        >
          <Lottie
            animationData={searchIcon}
            lottieRef={searchRef}
            style={{ width: 40, height: 40 }}
            loop={false}
            autoplay={false} // Prevent auto-start
           
          />
        </div>

        <Link to="/cart">
        <div
          onMouseEnter={() => cartRef.current?.goToAndPlay(0)}
          className="w-10 h-10"
        >
          <Lottie
            animationData={cart}
            lottieRef={cartRef}
            style={{ width: 40, height: 40 }}
            loop={false}
            autoplay={false} // Prevent auto-start
           
          />
        </div>
        </Link>
       
      {!token 
      ?   <button onClick={() => setShowLogin(true)} className="h-10 text-amber-600 font-semibold border-amber-700 border-solid border-2 rounded-3xl px-3 hover:bg-amber-600 hover:text-white whitespace-nowrap">
      Sign in
    </button>
    :<div className="relative group">
    {/* Profile Icon */}
    <img src={assets.profile_icon} className="cursor-pointer" />
  
    {/* Dropdown Menu (Initially Hidden) */}
    <ul className="absolute z-10 left-0 mt-2 w-32 bg-white shadow-md rounded-lg hidden group-hover:block">
      <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer">
        <img src={assets.bag_icon} className="w-5 h-5" />
        <p>Orders</p>
      </li>
      <hr />
      <li onClick={logOut} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer">
        <img src={assets.logout_icon} className="w-5 h-5" />
        <p>Logout</p>
      </li>
    </ul>
  </div>
  }

      

      </div>

      <div className=" md:hidden ">
        <FontAwesomeIcon icon={faBars} size="2x" />
      </div>
    </div>
  );
};

export default Navbar;
