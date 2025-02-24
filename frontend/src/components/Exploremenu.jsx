import React, { useState } from 'react';
import { menu_list } from '../assets/assets';

const Exploremenu = ({ category, setCategory }) => {
  const [activeMenu, setActiveMenu] = useState(null); // Store the active menu name

  return (
    <>
      <div id='Explore-menu' className='w-5/6 mx-auto mt-10 flex flex-col gap-8'>
        <h2 className='text-4xl font-semibold'>Explore our Menu</h2>
        <div className='flex gap-8 flex-wrap md:flex-nowrap'>
          {menu_list.map((menu, index) => {
            const isActive = activeMenu === menu.menu_name; // Check if this menu is active
            return (
              <div
                onClick={() => setCategory(prev => (prev === menu.menu_name ? "All" : menu.menu_name))}
                key={index}
                className='flex flex-col items-center gap-2'
              >
                <img
                  className={`p-1 border-4 border-transparent hover:border-amber-700 border-solid rounded-full ${isActive ? "border-amber-700" : "border-transparent"}`}
                  onClick={() => setActiveMenu(isActive ? null : menu.menu_name)} // Toggle active menu
                  src={menu.menu_image}
                />
                <h2>{menu.menu_name}</h2>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Exploremenu;


//active hovering effect
