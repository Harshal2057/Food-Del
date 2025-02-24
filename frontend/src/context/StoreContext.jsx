import { createContext, useEffect, useState } from "react";
import axios from "axios"

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const url = "http://localhost:4000"

    const [cartItem, setCartItem] = useState(() => {
        // ✅ Load cart from localStorage on mount
        const savedCart = localStorage.getItem("cartItem");
        return savedCart ? JSON.parse(savedCart) : {};
    });
    const[token , setToken] = useState("");
    const[food_list , setFood_list] = useState([]);


    useEffect(() => {
        localStorage.setItem("cartItem", JSON.stringify(cartItem));
    }, [cartItem]);
   

    const addToCart = async (id) => {
        setCartItem(prev => {
            const updatedCart = { ...prev, [id]: (prev[id] || 0) + 1 };
            return updatedCart;
        });
        
        try {
            await axios.post(url + "/api/cart/add/cart", 
                { itemId: id }, // ✅ No need to send `userId`
                { headers: { token } } // ✅ Token is enough
            );
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
        
    };

    const removeFromCart = async (itemId) => {
        setCartItem((prev) => {
            const updatedCart = { ...prev };
            if (updatedCart[itemId] > 1) {
                updatedCart[itemId] -= 1; // Decrease quantity if it's greater than 1
            } else {
                delete updatedCart[itemId]; // Remove the item if quantity is 1 or less
            }
            return updatedCart;
        });

        try {
            await axios.post(url + "/api/cart/remove/cart", 
                { itemId: itemId }, // ✅ No need to send `userId`
                { headers: { token } } // ✅ Token is enough
            );
        } catch (error) {
            console.error("Error removing to cart:", error);
        }
    };

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(url + "/food/show/list");
            setFood_list(response.data.data);
        } catch (error) {
            console.error("Error fetching food list:", error.message);
        }
    };
    

    const loadCartData = async (token) => {
        try {
            const response = await axios.post(url + "/api/cart/get/cart", {}, { headers: { token } });
            setCartItem(response.data.cart);
        } catch (error) {
            console.error("Error loading cart data:", error.message);
        }
    };
    
    const amount = Object.keys(cartItem).reduce((total , id) => {
        const item = food_list.find((food) => food._id === id);
    
        if (item) {
            return total +  cartItem[id] * item.price;
        }
        return total;
      } , 0);

    useEffect(() => {

        const loadData = async() => {

            await fetchFoodList();

            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"))
            }

        }

        loadData();

    },[]);

    // useEffect(() => {
    //         console.log(cartItem);
    // } , [cartItem]);

    const contextValue = {
            food_list,
            cartItem,
            addToCart,
            removeFromCart,
            token,
            setToken,
            url,
            amount
    }

    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;