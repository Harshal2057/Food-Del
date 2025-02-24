import React from "react";
import { assets } from "../assets/assets";

const Navbar = () => {
  return (
    <div>
      <div  className='flex justify-between items-center mx-10 my-2'>
        <div>
          <img src={assets.logo} />
          <p>Admin Panel</p>
        </div>

        <div>
          <img src={assets.profile} />
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Navbar;
