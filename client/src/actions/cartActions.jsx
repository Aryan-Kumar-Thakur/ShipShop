import { ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO } from "../slice/cartSlice";
import axios from "axios";

const API_URI = "/api/v1";

// Add to cart

export const addItemsToCart = (id, quantity) => {
    return async (dispatch, getState) => {
        const { data } = await axios.get(`${API_URI}/product/${id}`)

        dispatch(ADD_TO_CART({
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            stock: data.product.stock,
            quantity
        }))
        localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
    }
}

//Remove from cart

export const removeItemsFromCart = (id) => {
    return async (dispatch, getState) => {
        dispatch(REMOVE_CART_ITEM(id))
        localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
    }
}

//Save Shipping Info
export const saveShippingInfo = (data)=>{
    return async(dispatch)=>{
        dispatch(SAVE_SHIPPING_INFO(data))
        localStorage.setItem("shippingInfo", JSON.stringify(data));
    }
}