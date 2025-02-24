import React, { useContext, useState } from 'react'
import { StoreContext } from '../context/StoreContext'
import { assets } from '../assets/assets';
import FoodItem from './FoodItem';

const FoodDisplay = ({category , setCategory}) => {

    const {food_list} = useContext(StoreContext);
   
    
  return (
    <>
    
    <div className='w-5/6 m-auto mt-10'>

            <div>
                <h1 className='font-semibold text-4xl mb-10'>Top dishes near you</h1>
            </div>

            <div className='flex flex-wrap justify-between gap-10'>
                {
                    food_list.filter((item) => category === "All" || category === item.category).map((item , index) => {
                       return ( 
                        <FoodItem key={index} category={category} item={item} />
                        )
                  
                    })
                }
            </div>

    </div>
    
    </>
  )
}

export default FoodDisplay