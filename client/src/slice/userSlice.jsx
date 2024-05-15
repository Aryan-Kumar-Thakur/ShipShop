import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: {},
        loading: false,
        isAuthenticated: false
    },
    reducers: {
        LOGIN_REQUEST: (state) => {
            state.loading = true;
            state.isAuthenticated = false;
        },
        REGISTER_USER_REQUEST: (state) => {
            state.loading = true;
            state.isAuthenticated = false;
        },
        LOAD_USER_REQUEST: (state) => {
            state.loading = true;
            state.isAuthenticated = false;
        },
        LOGIN_SUCCESS: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
        },
        REGISTER_USER_SUCCESS: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
        },
        LOAD_USER_SUCCESS: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
        },
        LOGOUT_SUCCESS: (state) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
        },
        LOGIN_FAIL: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
        },
        REGISTER_USER_FAIL: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
        },
        LOAD_USER_FAIL: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
        },
        LOGOUT_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        CLEAR_ERRORS: (state) => {
            state.error = null;
        }

    }
})

export const profileSlice = createSlice({
    name: "profile",
    initialState: {
        loading: false,
        error: null,
        isUpdated: false,
    },
    reducers: {
        UPDATE_PROFILE_REQUEST: (state, action) => {
            state.loading = true;
        },
        UPDATE_PASSWORD_REQUEST: (state, action) => {
            state.loading = true;
        },
        UPDATE_USER_REQUEST: (state, action) => {
            state.loading = true;
        },
        DELETE_USER_REQUEST: (state, action) => {
            state.loading = true;
        },
        UPDATE_PROFILE_SUCCESS: (state, action) => {
            state.loading = false;
            state.isUpdated = action.payload;
        },
        UPDATE_PASSWORD_SUCCESS: (state, action) => {
            state.loading = false;
            state.isUpdated = action.payload;
        },
        UPDATE_USER_SUCCESS: (state, action) => {
            state.loading = false;
            state.isUpdated = action.payload;
        },
        DELETE_USER_SUCCESS: (state, action) => {
            state.loading = false;
            state.isDeleted = action.payload.success;
            state.message = action.payload.message;
        },
        UPDATE_PROFILE_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        UPDATE_PASSWORD_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        UPDATE_USER_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        DELETE_USER_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        UPDATE_PROFILE_RESET: (state, action) => {
            state.isUpdated = false;
        },
        UPDATE_PASSWORD_RESET: (state, action) => {
            state.isUpdated = false;
        },
        UPDATE_USER_RESET: (state, action) => {
            state.isUpdated = false;
        },
        DELETE_USER_RESET: (state, action) => {
            state.isDeleted = false;
        },
    }
})

export const forgotPasswordSlice = createSlice({
    name: "forgotPassword",
    initialState: {
        loading: false,
        error: null
    },
    reducers: {
        FORGOT_PASSWORD_REQUEST: (state) => {
            state.loading = true;
        },
        RESET_PASSWORD_REQUEST: (state) => {
            state.loading = true;
        },
        FORGOT_PASSWORD_SUCCESS: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        RESET_PASSWORD_SUCCESS: (state, action) => {
            state.loading = false;
            state.success = action.payload;
        },
        FORGOT_PASSWORD_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        RESET_PASSWORD_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export const allUsersSlice = createSlice({
    name: "allUsers",
    initialState: {
        users: [],
        loading: true,
        error: null
    },
    reducers: {
        ALL_USERS_REQUEST: (state) => {
            state.loading = true;
        },
        ALL_USERS_SUCCESS: (state, action) => {
            state.loading = false;
            state.users = action.payload;
        },
        ALL_USERS_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export const userDetailsSlice = createSlice({
    name: "userDetails",
    initialState: {
        user: {},
        loading: true,
        error: null
    },
    reducers: {
        USER_DETAILS_REQUEST: (state) => {
            state.loading = true;
        },
        USER_DETAILS_SUCCESS: (state, action) => {
            state.loading = false;
            state.user = action.payload;
        },
        USER_DETAILS_FAIL: (state, action) => {
            state.loading = true;
            state.error = action.payload;
        }
    }
})

export const userReducer = userSlice.reducer;
export const profileReducer = profileSlice.reducer;
export const forgotPasswordReducer = forgotPasswordSlice.reducer;
export const allUsersReducer = allUsersSlice.reducer;
export const userDetailsReducer = userDetailsSlice.reducer;

export const { LOGIN_REQUEST, REGISTER_USER_REQUEST, LOAD_USER_REQUEST,
    LOGIN_SUCCESS, REGISTER_USER_SUCCESS, LOAD_USER_SUCCESS, LOGOUT_SUCCESS,
    LOGIN_FAIL, REGISTER_USER_FAIL, LOAD_USER_FAIL, LOGOUT_FAIL, CLEAR_ERRORS } = userSlice.actions

export const { UPDATE_PROFILE_REQUEST, UPDATE_PASSWORD_REQUEST, UPDATE_USER_REQUEST, DELETE_USER_REQUEST,
    UPDATE_PROFILE_SUCCESS, UPDATE_PASSWORD_SUCCESS, UPDATE_USER_SUCCESS, DELETE_USER_SUCCESS,
    UPDATE_PROFILE_FAIL, UPDATE_PASSWORD_FAIL, UPDATE_USER_FAIL, DELETE_USER_FAIL, UPDATE_PROFILE_RESET,
    UPDATE_PASSWORD_RESET, UPDATE_USER_RESET, DELETE_USER_RESET } = profileSlice.actions

export const { FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL } = forgotPasswordSlice.actions

export const { ALL_USERS_REQUEST, ALL_USERS_SUCCESS, ALL_USERS_FAIL } = allUsersSlice.actions

export const { USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL } = userDetailsSlice.actions
