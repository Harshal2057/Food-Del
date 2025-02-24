import userModel from "../model/userModel.js"



const addToCart = async(req,res) => {

    try {
        console.log(`User id in cart => ${req.body.userId}`);
                const userData = await userModel.findOne({_id:req.body.userId});
              

        if (!userData) {
            console.log("User not found");
          } 

        let cart = await userData.cart;

        if (!cart[req.body.itemId]) {
            cart[req.body.itemId] = 1;
        }else{
            cart[req.body.itemId] += 1;
        }


        const updatedUser = await userModel.findByIdAndUpdate(
            req.body.userId,
            { $set: { cart: userData.cart } },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Food added to the cart successfully",
            cart: updatedUser.cart, // Send updated cart in response
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            success:false,
            message:`The error is  =>${error}`
        })

    }

}

const removeFromCart = async(req,res) => {
    
        try {
            
            const userData = await userModel.findById(req.body.userId);

            if (!userData) {
               return res.status(400).json({
                    success:false,
                    message:"User not find"
                })
            }

            let cartData = userData.cart;

            if (cartData[req.body.itemId] > 0 ) {
                cartData[req.body.itemId] -= 1;
            }

            

            const updatedCart = await userModel.findByIdAndUpdate(req.body.userId , 
                { $set: { cart: cartData } },
                { new: true }
            )

            res.status(200).json({
                success:true,
                message:"Food removed from cart "
            })

        } catch (error) {
            res.status(400).json({
                success:false,
                message:"Error occured while removing food from cart"
            })
        }

}

const getCart = async(req,res) => {

    try {
        
        const userData = await userModel.findById(req.body.userId);

        if(!userData){
            res.status(400).json({
                success:false,
                message:"User not found"
            })
        }

        const cartData = await userData.cart;

    } catch (error) {
        res.status(400).json({
            success:true,
            message:"Error occured while displaying cart"
        })
    }

}

export {addToCart ,removeFromCart, getCart} ;