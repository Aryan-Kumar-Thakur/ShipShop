import axios from "axios"
import { CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAIL, CLEAR_ERRORS } from "../slice/orderSlice"
import { MY_ORDERS_REQUEST, MY_ORDERS_SUCCESS, MY_ORDERS_FAIL } from "../slice/orderSlice"
import { ALL_ORDERS_REQUEST, ALL_ORDERS_SUCCESS, ALL_ORDERS_FAIL } from "../slice/orderSlice"
import {
    UPDATE_ORDER_REQUEST, UPDATE_ORDER_SUCCESS, UPDATE_ORDER_FAIL, UPDATE_ORDER_RESET,
    DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS, DELETE_ORDER_FAIL, DELETE_ORDER_RESET
} from "../slice/orderSlice"
import { ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL } from "../slice/orderSlice"


const API_URI = "/api/v1";

export const createOrder = (order) => {
    return async (dispatch) => {
        try {
            dispatch(CREATE_ORDER_REQUEST())

            const config = { headers: { "Content-Type": "application/json" }, withCredentials: true }

            const { data } = await axios.post(
                `${API_URI}/order/new`,
                order,
                config
            )
            dispatch(CREATE_ORDER_SUCCESS(data))

        } catch (error) {
            dispatch(CREATE_ORDER_FAIL(error.response.data.message));
        }
    }
}

export const myOrders = () => {
    return async (dispatch) => {
        try {
            dispatch(MY_ORDERS_REQUEST())

            const config = { withCredentials: true }

            const { data } = await axios.get(
                `${API_URI}/order/get/my`,
                config
            )
            dispatch(MY_ORDERS_SUCCESS(data.orders))
        } catch (error) {
            dispatch(MY_ORDERS_FAIL(error.response.data.message));
        }
    }
}

//get all orders -- Admin
export const getAllOrders = () => {
    return async (dispatch) => {
        try {
            dispatch(ALL_ORDERS_REQUEST());

            const config = { withCredentials: true }

            const { data } = await axios.get(
                `${API_URI}/admin/orders`,
                config
            )
            dispatch(ALL_ORDERS_SUCCESS(data.orders))
        } catch (error) {
            dispatch(ALL_ORDERS_FAIL(error.response.data.message))
        }
    }
}

//update Order -- Admin
export const updateOrder = (id, order) => {
    return async (dispatch) => {
        try {
            dispatch(UPDATE_ORDER_REQUEST());

            const config = { headers: { "Content-Type": "application/json" }, withCredentials: true }

            const { data } = await axios.put(
                `${API_URI}/admin/orders/${id}`,
                order,
                config
            )
            dispatch(UPDATE_ORDER_SUCCESS(data.success))
        } catch (error) {
            dispatch(UPDATE_ORDER_FAIL(error.response.data.message))
        }
    }
}

//delete Order -- Admin
export const deleteOrder = (id) => {
    return async (dispatch) => {
        try {
            dispatch(DELETE_ORDER_REQUEST());

            const config = {withCredentials: true }

            const { data } = await axios.delete(
                `${API_URI}/admin/orders/${id}`,
                config
            )
            dispatch(DELETE_ORDER_SUCCESS(data.success))
        } catch (error) {
            dispatch(DELETE_ORDER_FAIL(error.response.data.message))
        }
    }
}

export const getOrderDetails = (id) => {
    return async (dispatch) => {
        try {
            dispatch(ORDER_DETAILS_REQUEST());

            const config = { withCredentials: true }

            const { data } = await axios.get(
                `${API_URI}/order/${id}`,
                config
            )
            dispatch(ORDER_DETAILS_SUCCESS(data.order))
        } catch (error) {
            dispatch(ORDER_DETAILS_FAIL(error.response.data.message))
        }
    }
}


export const clearErrors = () => async (dispatch) => {
    dispatch(CLEAR_ERRORS());
};