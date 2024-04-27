import axios from "axios"
import {
    LOGIN_REQUEST, REGISTER_USER_REQUEST, LOAD_USER_REQUEST,
    LOGIN_SUCCESS, REGISTER_USER_SUCCESS, LOAD_USER_SUCCESS, LOGOUT_SUCCESS,
    LOGIN_FAIL, REGISTER_USER_FAIL, LOAD_USER_FAIL, LOGOUT_FAIL, CLEAR_ERRORS
} from "../slice/userSlice"

const API_URI = "http://localhost:8000/api/v1";

//login
export const login = (email, password) => {
    return async (dispatch) => {
        try {
            dispatch(LOGIN_REQUEST())

            const config = { headers: { "Content-Type": "application/json" } , withCredentials: true}
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

            const config = { headers: { "Content-Type": "multipart/form-data" } , withCredentials: true }
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

//load user
export const loadUser = () => {
    return async (dispatch) => {
        try {
            dispatch(LOAD_USER_REQUEST())

            const { data } = await axios.get(`${API_URI}/me` ,{
                withCredentials: true
            })

            dispatch(LOAD_USER_SUCCESS(data))
        } catch (error) {
            dispatch(LOAD_USER_FAIL(error.response.data.message))
        }
    }
}

// logout
export const logout = () =>{
    return async (dispatch) => {
        try {

            await axios.get(`${API_URI}/logout`,{
                withCredentials: true,
            })
            dispatch(LOGOUT_SUCCESS())
        } catch (error) {
            dispatch(LOGOUT_FAIL(error.response.data.message))
        }
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch(CLEAR_ERRORS());
};