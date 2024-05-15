import axios from "axios"
import {
    LOGIN_REQUEST, REGISTER_USER_REQUEST, LOAD_USER_REQUEST,
    LOGIN_SUCCESS, REGISTER_USER_SUCCESS, LOAD_USER_SUCCESS, LOGOUT_SUCCESS,
    LOGIN_FAIL, REGISTER_USER_FAIL, LOAD_USER_FAIL, LOGOUT_FAIL, CLEAR_ERRORS,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL
} from "../slice/userSlice"

import {
    UPDATE_PROFILE_REQUEST, UPDATE_PASSWORD_REQUEST, UPDATE_USER_REQUEST, DELETE_USER_REQUEST,
    UPDATE_PROFILE_SUCCESS, UPDATE_PASSWORD_SUCCESS, UPDATE_USER_SUCCESS, DELETE_USER_SUCCESS,
    UPDATE_PROFILE_FAIL, UPDATE_PASSWORD_FAIL, UPDATE_USER_FAIL, DELETE_USER_FAIL, UPDATE_PROFILE_RESET,
    UPDATE_PASSWORD_RESET, UPDATE_USER_RESET, DELETE_USER_RESET
} from "../slice/userSlice"

const API_URI = "http://localhost:8000/api/v1";

//login
export const login = (email, password) => {
    return async (dispatch) => {
        try {
            dispatch(LOGIN_REQUEST())

            const config = { headers: { "Content-Type": "application/json" }, withCredentials: true }
            const { data } = await axios.post(
                `${API_URI}/login`,
                { email, password },
                config
            )

            dispatch(LOGIN_SUCCESS(data))
        } catch (error) {
            dispatch(LOGIN_FAIL(error.response.data.message))
        }
    }
}

//register
export const register = (userData) => {
    return async (dispatch) => {
        try {
            dispatch(REGISTER_USER_REQUEST())

            const config = { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true }
            const { data } = await axios.post(
                `${API_URI}/register`,
                userData,
                config
            )

            dispatch(REGISTER_USER_SUCCESS(data))
        } catch (error) {
            dispatch(REGISTER_USER_FAIL(error.response.data.message))
        }
    }
}

// load user
export const loadUser = () => {
    return async (dispatch) => {
        try {
            dispatch(LOAD_USER_REQUEST())

            const { data } = await axios.get(`${API_URI}/me`, {
                withCredentials: true
            })

            dispatch(LOAD_USER_SUCCESS(data))
        } catch (error) {
            dispatch(LOAD_USER_FAIL(error.response.data.message))
        }
    }
}

// logout
export const logout = () => {
    return async (dispatch) => {
        try {

            await axios.get(`${API_URI}/logout`, {
                withCredentials: true,
            })
            dispatch(LOGOUT_SUCCESS())
        } catch (error) {
            dispatch(LOGOUT_FAIL(error.response.data.message))
        }
    }
}

//Update profile
export const updateProfile = (userData) => {
    return async (dispatch) => {
        try {
            dispatch(UPDATE_PROFILE_REQUEST())

            const config = { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true }
            const { data } = await axios.put(
                `${API_URI}/me/update`,
                userData,
                config
            )

            dispatch(UPDATE_PROFILE_SUCCESS(data.success))
        } catch (error) {
            dispatch(UPDATE_PROFILE_FAIL(error.response.data.message))
        }
    }
}

//Forgot Password

export const forgotPassword = (email) => {
    return async (dispatch) => {
        try {
            dispatch(FORGOT_PASSWORD_REQUEST())

            const config = { headers: { "Content-Type": "application/json" } }
            const { data } = await axios.post(
                `${API_URI}/password/forgot`,
                email,
                config
            )

            dispatch(FORGOT_PASSWORD_SUCCESS(data.message))
        } catch (error) {
            dispatch(FORGOT_PASSWORD_FAIL(error.response.data.message))
        }
    }
}

//reset Password

export const resetPassword = (token, passwords) => {
    return async (dispatch) => {
        try {
            dispatch(RESET_PASSWORD_REQUEST())

            const config = { headers: { "Content-Type": "multipart/form-data" }}
            const { data } = await axios.put(
                `${API_URI}/password/reset/${token}`,
                passwords,
                config
            )

            dispatch(RESET_PASSWORD_SUCCESS(data.success))
        } catch (error) {
            dispatch(RESET_PASSWORD_FAIL(error.response.data.message))
        }
    }
}

// Update Password
export const updatePassword = (passwords) => {
    return async (dispatch) => {
        try {
            dispatch(UPDATE_PASSWORD_REQUEST());
            const config = { headers: { "Content-Type": "application/json" }, withCredentials: true }
            const { data } = await axios.put(
                `${API_URI}/password/update`,
                passwords,
                config
            )

            dispatch(UPDATE_PASSWORD_SUCCESS(data.success))

        } catch (error) {
            dispatch(UPDATE_PASSWORD_FAIL(error.response.data.message))
        }
    }
}



export const clearErrors = () => async (dispatch) => {
    dispatch(CLEAR_ERRORS());
};