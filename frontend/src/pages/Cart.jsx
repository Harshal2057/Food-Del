import React, { useContext, useRef } from "react";
import { StoreContext } from "../context/StoreContext";
import Lottie from "lottie-react";   
import minus from "../assets/orange-minus.json";
import { Link } from "react-router-dom";

const Cart = () => {
  const { food_list, cartItem , removeFromCart,url,amount} = useContext(StoreContext);

  // Create a ref for each cart item
  const removeRefs = useRef({});

  // const subTotal = Object.keys(cartItem).reduce((total , id) => {
  //   const item = food_list.find((food) => food._id === id);

  //   if (item) {
  //       return total +  cartItem[id] * item.price;
  //   }
  //   return total;
  // } , 0);

  return (
    <div className="w-5/6 m-auto mt-10">
      <div className="mb-1.5 flex justify-between  text-lg">
        <ul>Item</ul>
        <ul>Title</ul>
        <ul>Price</ul>
        <ul>Quantity</ul>
        <ul>Total</ul>
        <ul>Remove</ul>
      </div>

      <hr />

      <div>
        {Object.keys(cartItem).map((id) => {
          const item = food_list.find((food) => food._id === id);
          if (!item) return null;

          // Create a ref for each item dynamically
          if (!removeRefs.current[id]) {
            removeRefs.current[id] = React.createRef();
          }

          const total = cartItem[id] * item.price;

          return (
            <div key={id} className="flex  items-center my-5">
              <img src={`${url}/uploads/${item.image.split("\\").pop()}`} className="w-[6rem] border-amber-600 border-solid border-2 rounded-sm" alt={item.name} />
              <p className="ml-[8rem]">{item.name}</p>
              <p className="ml-44">${item.price}</p>
              <p className="ml-[15rem]">{cartItem[id]}</p>
              <p className="ml-[15rem]">${total}</p>

              <div
                onMouseEnter={() => removeRefs.current[id]?.current?.goToAndPlay(0)}
                className="w-10 h-10 ml-[15rem]"
                onClick={() => removeFromCart(id) }
              >
                <Lottie
                  animationData={minus}
                  lottieRef={removeRefs.current[id]}
                  style={{ width: 40, height: 40 }}
                  loop={false}
                  autoplay={false}
                />
              </div>
            
            </div>

            
            
          );
        })}
      </div>

      <hr />

      <div className="w-2/6 mt-10 flex flex-col gap-5 border-amber-600 border-solid border-2 p-5">
        <div>
            <h1 className="font-bold text-2xl px-5">Cart Total</h1>
        </div>

        <div className="w-full flex justify-between px-5 ">
            <p className="font-semibold">Subtotal</p>
            <p>{amount}</p>
        </div>

        <Link to="/orders">
        <div>
            <button className="w-full bg-amber-600 text-white font-semibold hover:bg-white border-amber-600 border-solid border-2  hover:text-amber-600 ">Proceed to checkout</button>
        </div>
        </Link>

      </div>


    </div>
  );
};

export default Cart;
