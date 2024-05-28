import { createSlice } from "@reduxjs/toolkit"

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
            state.filteredProductsCount = action.payload.filteredProductsCount;
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

export const adminProductsSlice = createSlice({
    name: "adminProducts",
    initialState: {
        products: [],
        loading: false,
        error: null
    },
    reducers: {
        ADMIN_PRODUCT_REQUEST: (state) => {
            state.loading = true;
            state.products = [];
            state.error = null;
        },
        ADMIN_PRODUCT_SUCCESS: (state, action) => {
            state.loading = false;
            state.products = action.payload;
        },
        ADMIN_PRODUCT_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.products = [];
        },
    },
});

export const newProductSlice = createSlice({
    name: "newProduct",
    initialState: {
        product: {},
        loading: false,
        error: null,
        success: false
    },
    reducers: {
        NEW_PRODUCT_REQUEST: (state) => {
            state.loading = true;
        },
        NEW_PRODUCT_SUCCESS: (state, action) => {
            state.loading = false;
            state.success = action.payload.success;
            state.product = action.payload.product;
        },
        NEW_PRODUCT_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        NEW_PRODUCT_RESET: (state, action) => {
            state.success = false
        }
    }
})

export const productSlice = createSlice({
    name: "product",
    initialState: {
        loading: false,
        error: null
    },
    reducers: {
        DELETE_PRODUCT_REQUEST: (state) => {
            state.loading = true;
        },
        UPDATE_PRODUCT_REQUEST: (state) => {
            state.loading = true;
        },
        DELETE_PRODUCT_SUCCESS: (state, action) => {
            state.loading = false;
            state.isDeleted = action.payload;
        },
        UPDATE_PRODUCT_SUCCESS: (state, action) => {
            state.loading = false;
            state.isUpdated = action.payload;
        },
        DELETE_PRODUCT_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        UPDATE_PRODUCT_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        DELETE_PRODUCT_RESET: (state) => {
            state.isDeleted = false;
        },
        UPDATE_PRODUCT_RESET: (state) => {
            state.isUpdated = false;
        }
    }
})

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
        },
        PRODUCT_DETAILS_SUCCESS: (state, action) => {
            state.loading = false;
            state.product = action.payload.product
        },
        PRODUCT_DETAILS_FAIL: (state, action) => {
            state.loading = false;
            state.product = {};
            state.error = action.payload;
        }
    }
})

export const newReviewSlice = createSlice({
    name: "newReview",
    initialState: {
        loading: false,
        error: null
    },
    reducers: {
        NEW_REVIEW_REQUEST: (state) => {
            state.loading = true;
        },
        NEW_REVIEW_SUCCESS: (state, action) => {
            state.loading = false;
            state.success = action.payload;
        },
        NEW_REVIEW_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        NEW_REVIEW_RESET: (state) => {
            state.success = false;
        }
    }
})

export const productReviewsSlice = createSlice({
    name: "productReviews",
    initialState: {
        reviews: [],
        loading: false,
        error: null
    },
    reducers: {
        ALL_REVIEW_REQUEST: (state) => {
            state.loading = true;
        },
        ALL_REVIEW_SUCCESS: (state, action) => {
            state.loading = false;
            state.reviews = action.payload;
        },
        ALL_REVIEW_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export const reviewSlice = createSlice({
    name: "review",
    initialState: {
        loading: false,
        error: null,
    },
    reducers: {
        DELETE_REVIEW_REQUEST: (state) => {
            state.loading = true;
        },
        DELETE_REVIEW_REQUEST: (state, action) => {
            state.loading = false,
                state.isDeleted = action.payload
        },
        DELETE_REVIEW_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        DELETE_REVIEW_RESET: (state) => {
            state.isDeleted = false;
        }
    }
})


export const productsReducer = productsSlice.reducer;
export const adminProductsReducer = adminProductsSlice.reducer;
export const newProductReducer = newProductSlice.reducer;
export const productReducer = productSlice.reducer;
export const productDetailsReducer = productDetailsSlice.reducer;
export const newReviewReducer = newReviewSlice.reducer
export const productReviewsReducer = productReviewsSlice.reducer
export const reviewReducer = reviewSlice.reducer

export const { ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_FAIL, CLEAR_ERRORS } = productsSlice.actions;

export const { ADMIN_PRODUCT_REQUEST, ADMIN_PRODUCT_SUCCESS, ADMIN_PRODUCT_FAIL } = adminProductsSlice.actions;

export const { NEW_PRODUCT_REQUEST, NEW_PRODUCT_SUCCESS, NEW_PRODUCT_FAIL, NEW_PRODUCT_RESET } = newProductSlice.actions;

export const { UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAIL, UPDATE_PRODUCT_RESET,
    DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAIL, DELETE_PRODUCT_RESET } = productSlice.actions

export const { PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL } = productDetailsSlice.actions;

export const { NEW_REVIEW_REQUEST, NEW_REVIEW_SUCCESS, NEW_REVIEW_FAIL, NEW_REVIEW_RESET } = newReviewSlice.actions

export const { ALL_REVIEW_REQUEST, ALL_REVIEW_SUCCESS, ALL_REVIEW_FAIL } = productReviewsSlice.actions

export const { DELETE_REVIEW_REQUEST, DELETE_REVIEW_SUCCESS, DELETE_REVIEW_FAIL, DELETE_REVIEW_RESET } = reviewSlice.actions
