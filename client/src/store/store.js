import { configureStore } from "@reduxjs/toolkit"
import {thunk} from 'redux-thunk'
import { productsReducer } from "../slice/productSlice"
import { productDetailsReducer } from "../slice/productSlice"

const initialState = {}

const middleware = [thunk]

const store = configureStore({
    reducer: {
        products: productsReducer,
        productDetails: productDetailsReducer
    },
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
    devTools: process.env.NODE_ENV !== 'production'
})

export default store