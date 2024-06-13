import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { thunk } from 'redux-thunk'
import { legacy_createStore as createStore } from 'redux'
import { productsReducer, productDetailsReducer, newReviewReducer, adminProductsReducer, newProductReducer, productReducer } from "../slice/productSlice"
import { allUsersReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, userReducer } from "../slice/userSlice"
import { forgotPassword } from "../actions/userActions"
import { cartReducer } from "../slice/cartSlice"
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer } from "../slice/orderSlice"

const initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems") ?
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
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
    adminProducts: adminProductsReducer,
    newProduct: newProductReducer,
    product: productReducer,
    allOrder: allOrdersReducer,
    order: orderReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer
}

const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
    // devTools: process.env.NODE_ENV !== 'production'
})

export default store