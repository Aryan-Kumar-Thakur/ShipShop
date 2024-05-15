import { createSlice } from "@reduxjs/toolkit";

export const newOrderSlice = createSlice({
    name: "newOrder",
    initialState: {
        loading: true,
        error: null
    },
    reducers: {
        CREATE_ORDER_REQUEST: (state) => {
            state.loading = true;
        },
        CREATE_ORDER_SUCCESS: (state, action) => {
            state.loading = false;
            state.order = action.payload;
        },
        CREATE_ORDER_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        CLEAR_ERRORS: (state, action) => {
            state.error = null;
        }
    }
})

export const myOrdersSlice = createSlice({
    name: "myOrders",
    initialState: {
        orders: [],
        loading: true,
        error: null,
    },
    reducers: {
        MY_ORDERS_REQUEST: (state) => {
            state.loading = true;
        },
        MY_ORDERS_SUCCESS: (state, action) => {
            state.loading = false;
            state.orders = action.payload;
        },
        MY_ORDERS_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export const allOrdersSlice = createSlice({
    name: "allOrders",
    initialState: {
        orders: [],
        loading: true,
        error: null
    },
    reducers: {
        ALL_ORDERS_REQUEST: (state) => {
            state.loading = true;
        },
        ALL_ORDERS_SUCCESS: (state, action) => {
            state.loading = false;
            state.orders = action.payload;
        },
        ALL_ORDERS_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export const orderSlice = createSlice({
    name: "order",
    initialState: {
        loading: true,
        error: null
    },
    reducers: {
        UPDATE_ORDER_REQUEST: (state) => {
            state.loading = true;
        },
        DELETE_ORDER_REQUEST: (state) => {
            state.loading = true;
        },
        UPDATE_ORDER_SUCCESS: (state, action) => {
            state.loading = false;
            state.isUpdated = action.payload;
        },
        DELETE_ORDER_SUCCESS: (state, action) => {
            state.loading = false;
            state.isDeleted = action.payload;
        },
        UPDATE_ORDER_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        DELETE_ORDER_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        UPDATE_ORDER_RESET: (state) => {
            state.isUpdated = false;
        },
        DELETE_ORDER_RESET: (state) => {
            state.isDeleted = false;
        }
    }
})

export const orderDetailsSlice = createSlice({
    name: "orderDetails",
    initialState: {
        order: {},
        loading: true,
        error: null,
    },
    reducers: {
        ORDER_DETAILS_REQUEST: (state) => {
            state.loading = true;
        },
        ORDER_DETAILS_SUCCESS: (state, action) => {
            state.loading = false;
            state.order = action.payload;
        },
        ORDER_DETAILS_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export const newOrderReducer = newOrderSlice.reducer;
export const myOrdersReducer = myOrdersSlice.reducer;
export const allOrdersReducer = allOrdersSlice.reducer;
export const orderReducer = orderSlice.reducer;
export const orderDetailsReducer = orderDetailsSlice.reducer

export const { CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAIL } = newOrderSlice.actions

export const { MY_ORDERS_REQUEST, MY_ORDERS_SUCCESS, MY_ORDERS_FAIL } = myOrdersSlice.actions

export const { ALL_ORDERS_REQUEST, ALL_ORDERS_SUCCESS, ALL_ORDERS_FAIL } = allOrdersSlice.actions

export const { UPDATE_ORDER_REQUEST, UPDATE_ORDER_SUCCESS, UPDATE_ORDER_FAIL, UPDATE_ORDER_RESET,
    DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS, DELETE_ORDER_FAIL, DELETE_ORDER_RESET } = orderSlice.actions

export const { ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL } = orderDetailsSlice.actions