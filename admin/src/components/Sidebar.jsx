import React from 'react'
import { assets } from '../assets/assets'
import { Link , NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div>
        
           <div className='w-xs min-h-screen flex flex-col items-end border-b border-r border-l border-black '>

            <div className='mt-16 flex flex-col gap-11'>

        <NavLink to="/add"> 
            <div className='flex  border-t border-b border-l border-gray-700 p-1.5 rounded-tl-2xl rounded-bl-2xl'>
                    <img className="w-[40px]" src={assets.add_icon}/>
                    <p className=' mr-14'>Add Items</p>
                </div>
         </NavLink>    

        <NavLink to="/list">
                <div className='flex  border-t border-b border-l border-black p-1.5 rounded-tl-2xl rounded-bl-2xl'>
                    <img className="w-[40px]" src={assets.list} />
                    <p>List Items</p>
                </div>
         </NavLink>

        <NavLink to="/orders">
                <div className='flex  border-t border-b border-l border-black p-1.5 rounded-tl-2xl rounded-bl-2xl'>
                    <img className="w-[40px]" src={assets.orders} />
                    <p>Orders</p>
                </div>
        </NavLink>            

            </div>
            
            </div> 

    </div>
  )
}

export default Sidebar