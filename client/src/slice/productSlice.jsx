import { createSlice } from "@reduxjs/toolkit"

import {
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    NEW_PRODUCT_RESET,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_RESET,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_RESET,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    NEW_REVIEW_RESET,
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS,
    ALL_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
    DELETE_REVIEW_RESET,
} from "../constants/productConstants";


const initialState = {
    products: [],
    loading: false,
    error: null
};

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        ALL_PRODUCT_REQUEST: (state) => {
            state.loading = true;
            state.products = [];
            state.error = null;
        },
        ALL_PRODUCT_SUCCESS: (state, action) => {
            state.loading = false;
            state.products = action.payload.products;
            state.productsCount = action.payload.productsCount;
            state.resultPerPage = action.payload.resultPerPage;
        },
        ALL_PRODUCT_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.products = [];
        },
        CLEAR_ERRORS: (state) => {
            state.error = null;
        },
    },
});

export const productDetailsSlice = createSlice({
    name: "productDetails",
    initialState: {
        product: {},
        loading: false,
        error: null
    },
    reducers: {
        PRODUCT_DETAILS_REQUEST: (state) => {
            state.loading = true;
            state.product = {};
            state.error = null;
        },
        PRODUCT_DETAILS_SUCCESS: (state, action) => {
            state.loading = false;
            state.product = action.payload.product
            // console.log(state.product)
        },
        PRODUCT_DETAILS_FAIL: (state, action) => {
            state.loading = false;
            state.product = {};
            state.error = action.payload;
        }
    }
})


const productsReducer = productsSlice.reducer;
const productDetailsReducer = productDetailsSlice.reducer;

export const { ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_FAIL, CLEAR_ERRORS } = productsSlice.actions;
export const { PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL } = productDetailsSlice.actions;

export {productsReducer , productDetailsReducer}
