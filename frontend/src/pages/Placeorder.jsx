import React, { useContext, useRef, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import { Link } from "react-router-dom";
import axios from "axios"

const Placeorder = () => {

      const { food_list, cartItem , removeFromCart , amount } = useContext(StoreContext);
    
      const handlePayment = async () => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_HOST_URL}/api/payment/order` , {
                amount
            },{
                headers:{
                    "Content-Type":"application/json"
                }
            })

            const data = await res.data;
            console.log(data);
            handlePaymentVerify(data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handlePaymentVerify = async (data) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: data.amount,
            currency: data.currency,
            name: "Tomato",
            description: "Test Mode",
            order_id: data.id,
            handler: async (response) => {
                console.log("response", response)
                try {
                    const res = await axios.post(
                        `${import.meta.env.VITE_BACKEND_HOST_URL}/api/payment/verify`,
                        {
                          razorpay_order_id: response.razorpay_order_id,
                          razorpay_payment_id: response.razorpay_payment_id,
                          razorpay_signature: response.razorpay_signature,
                        },
                        {
                          headers: {
                            "Content-Type": "application/json",
                          },
                        }
                      );

                    const verifyData = await res.data;

                    if (verifyData.message) {
                        toast.success(verifyData.message)
                    }
                } catch (error) {
                    console.log(error);
                }
            },
            theme: {
                color: "#5f63b8"
            }
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    }
    

  return (
    <div className='w-full'>

        <div className='w-5/6 m-auto mt-24 p-5 flex justify-around border-amber-600 border-solid border-2'>

        {/* //left side box */}
        <div className='w-2/6'>
            <div>
                <h1 className='text-3xl font-semibold'>Delivery information</h1>
            </div>

            <div className='flex flex-col gap-5 mt-5 '>

                    <div className='flex gap-7'>
                        <input className='border-stone-300 border-solid border-2 p-1'type='text' placeholder='firstname' name='firstnamee' />
                        <input className='border-stone-300 border-solid border-2 p-1' type='text' placeholder='lastname' name='lastname' />
                    </div>

                    <input className='border-stone-300 border-solid border-2 p-1' type='email' placeholder='Email address' name='email' />
                    <input className='border-stone-300 border-solid border-2 p-1' type='text' placeholder='Street' name='street' />

                    <div className='flex gap-7'>
                        <input className='border-stone-300 border-solid border-2 p-1' type='text' placeholder='City' name='city' />
                        <input className='border-stone-300 border-solid border-2 p-1' type='text' placeholder='State' name='state' />
                    </div>

                    <div className='flex gap-7'>
                        <input className='border-stone-300 border-solid border-2 p-1' type='text' placeholder='Zipcode' name='zipcode' />
                        <input className='border-stone-300 border-solid border-2 p-1' type='text' placeholder='Country' name='country' />
                    </div>

                    <input className='border-stone-300 border-solid border-2 p-1' type='text' placeholder='Phone' name='phone' />

            </div>
        </div>

        {/* //right side box */}
        <div className="w-2/6 h-fit mt-10 flex flex-col gap-5 border-amber-600 border-solid border-2 p-5">

        <div>
            <h1 className="font-bold text-2xl px-5">Cart Total</h1>
        </div>

        <div className="w-full flex justify-between px-5 ">
            <p className="font-semibold">Subtotal</p>
            <p>${amount}</p>
        </div>

        <Link to="/orders">
        <div>
            <button onClick={handlePayment} className="w-full bg-amber-600 text-white font-semibold hover:bg-white border-amber-600 border-solid border-2  hover:text-amber-600 ">Proceed to payment</button>
        </div>
        </Link>

        </div>


        </div>

    </div>
  )
}

export default Placeorder