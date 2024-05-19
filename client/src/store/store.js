import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { thunk } from 'redux-thunk'
import { legacy_createStore as createStore } from 'redux'
import { productsReducer, productDetailsReducer } from "../slice/productSlice"
import { forgotPasswordReducer, profileReducer, userReducer } from "../slice/userSlice"
import { forgotPassword } from "../actions/userActions"
import { cartReducer } from "../slice/cartSlice"

const initialState = {
    cart: {
        cartItems : localStorage.getItem("cartItems") ?
        JSON.parse(localStorage.getItem("cartItems")) : [],
        shippingInfo: localStorage.getItem("shippingInfo") ?
        JSON.parse(localStorage.getItem("shippingInfo")) : {},
    },
}

const middleware = [thunk]
const rootReducer = {
    products: productsReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
}

const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
    devTools: process.env.NODE_ENV !== 'production'
})

export default store