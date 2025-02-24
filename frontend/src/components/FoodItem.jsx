import React, {  useContext, useState } from 'react'
import { assets } from '../assets/assets';
import { StoreContext } from '../context/StoreContext';

const FoodItem = ({item}) => {

    const{cartItem , addToCart , removeFromCart , url} = useContext(StoreContext);
    const id = item._id;

  return (
    <>
         <div  className='flex flex-col gap-2 relative'>
                        <img className='w-3xs rounded-2xl ' src={`${url}/uploads/${item.image.split("\\").pop()}`} />
                        <h1 className='font-semibold text-2xl'>{item.name}</h1>
                        <h2 className='w-3xs text-sm'>{item.description}</h2>
                        <h1 className='text-amber-600 font-semibold text-lg '>${item.price}</h1>
                        <button className='absolute bottom-[8rem] left-[13rem] bg-white rounded-full p-1 px-2 '>
                                {
                                    !cartItem[id] ?  <img src={assets.add_icon_white}  onClick={() => addToCart(id)} />
                                                : <div>
                                                    <img src={assets.remove_icon_red} onClick={() => removeFromCart(id)}/>
                                                     <h1>{cartItem[id]}</h1>
                                                     <img src={assets.add_icon_green} onClick={() =>addToCart(id)}/>
                                                </div>
                                }
                        </button>
                    </div>   
    </>
  )
}

export default FoodItem