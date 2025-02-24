import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    
    <>
    
        <div id='footer' className='mt-9 w-full m-auto bg-gray-800 text-white flex justify-evenly p-10'>

            

            <div className='w-2/6 flex flex-col gap-4'>
                <img src={assets.logo} className='w-3xs'/>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis obcaecati pariatur quae inventore ducimus odio vel quia voluptas amet debitis? Quaerat culpa dolore deleniti accusamus provident cumque eligendi molestiae, at, assumenda labore, soluta repellendus quam natus consectetur voluptate? Reiciendis laborum veniam eum nihil,.</p>

                <div className='flex gap-5'>
                <img src={assets.facebook_icon}  /> 
                <img src={assets.twitter_icon}  /> 
                <img src={assets.linkedin_icon}  /> 
                </div>

            </div>

            <div>
                <h1 className='font-bold text-2xl'>COMPANY</h1>

                <div className='flex flex-col gap-2'>
                <p>Home</p>
                <p>About us</p>
                <p>Delivery</p>
                <p>Privacy Policy</p>
                </div>

            </div>

            <div>
                <h1  className='font-bold text-2xl'>GET IN TOUCH</h1>

                <div  className='flex flex-col gap-2'>
                <p>+1-4857-4755947-47</p>
                <p>tomato33@gmail.com</p>
                </div>
               
            </div>

        </div>

    </>
  )
}

export default Footer