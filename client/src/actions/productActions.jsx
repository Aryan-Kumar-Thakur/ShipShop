import axios from "axios"
import {
  ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_FAIL, ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS, ADMIN_PRODUCT_FAIL, CLEAR_ERRORS, NEW_REVIEW_FAIL, NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS, NEW_PRODUCT_REQUEST, NEW_PRODUCT_SUCCESS, NEW_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_SUCCESS, ALL_REVIEW_FAIL, ALL_REVIEW_REQUEST, ALL_REVIEW_SUCCESS,
  DELETE_REVIEW_REQUEST, DELETE_REVIEW_SUCCESS, DELETE_REVIEW_FAIL
} from "../slice/productSlice";

import { PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_SUCCESS } from "../slice/productSlice"

import { DELETE_ORDER_FAIL } from "../slice/orderSlice";

import { baseUrl } from "../constants/BaseUrl"

const API_URI = `${baseUrl}/api/v1`;

//get Products

export const getProducts = (keyword = "", currentPage = 1, price = [0, 100000], category, ratings = 0) => {
  return async (dispatch) => {
    try {
      dispatch(ALL_PRODUCT_REQUEST());

      let link = `${API_URI}/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`

      if (category && category!=="All") {
        link = `${API_URI}/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`
      }

      const { data } = await axios.get(link);

      dispatch(ALL_PRODUCT_SUCCESS(data));
    } catch (error) {
      dispatch(ALL_PRODUCT_FAIL(error.response.data.message));
    }
  };
};

// get Products - Admin

export const getAdminProducts = () => {
  return async (dispatch) => {
    try {
      dispatch(ADMIN_PRODUCT_REQUEST());

      let link = `${API_URI}/admin/products`

      const config = { withCredentials: true }

      const { data } = await axios.get(link, config);

      dispatch(ADMIN_PRODUCT_SUCCESS(data.products));
    } catch (error) {
      dispatch(ADMIN_PRODUCT_FAIL(error.response.data.message));
    }
  };
};

// Create New Product - Admin

export const createProduct = (productData) => {
  return async (dispatch) => {
    try {
      dispatch(NEW_PRODUCT_REQUEST())

      const config = { headers: { "Content-Type": "application/json" }, withCredentials: true }

      // console.log(productData)

      const { data } = await axios.post(
        `${API_URI}/admin/product/new`,
        productData,
        config
      )

      dispatch(NEW_PRODUCT_SUCCESS(data))
    } catch (error) {
      dispatch(NEW_PRODUCT_FAIL(error.response.data.message))
    }
  }
}

//Update Product -- Admin

export const updateProduct = (id, productData) => {
  return async (dispatch) => {
    try {
      dispatch(UPDATE_PRODUCT_REQUEST());

      const config = { headers: { "Content-Type": "application/json" }, withCredentials: true }

      const { data } = await axios.put(
        `${API_URI}/admin/products/${id}`,
        productData,
        config
      )

      console.log(data)
      dispatch(UPDATE_PRODUCT_SUCCESS(data.success))

    } catch (error) {
      dispatch(UPDATE_PRODUCT_FAIL(error.response.data.message))
    }
  }
}

// Delete Product -- Admin

export const deleteProduct = (id) => {
  return async (dispatch) => {
    try {
      dispatch(DELETE_PRODUCT_REQUEST());

      const config = { withCredentials: true }

      const { data } = await axios.delete(
        `${API_URI}/admin/products/${id}`,
        config
      )
      dispatch(DELETE_PRODUCT_SUCCESS(data.success))

    } catch (error) {
      dispatch(DELETE_ORDER_FAIL(reaponse.error.data.message))
    }
  }
}

// get product details

export const getProductsDetails = (id) => {
  return async (dispatch) => {
    try {
      dispatch(PRODUCT_DETAILS_REQUEST());

      const { data } = await axios.get(`${API_URI}/product/${id}`);

      dispatch(PRODUCT_DETAILS_SUCCESS(data));
    } catch (error) {
      dispatch(PRODUCT_DETAILS_FAIL(error.response.data.message));
    }
  };
};


// New Review
export const newReview = (reviewData) => {
  return async (dispatch) => {
    try {
      dispatch(NEW_REVIEW_REQUEST())

      const config = { headers: { "Content-Type": "application/json" }, withCredentials: true }

      const { data } = await axios.put(
        `${API_URI}/review`,
        reviewData,
        config
      )

      dispatch(NEW_REVIEW_SUCCESS(data.success))
    } catch (error) {
      dispatch(NEW_REVIEW_FAIL(error.response.data.message))
    }
  }
}

// get all reviews -- Admin
export const getAllReviews = (id) => {
  return async (dispatch) => {
    try {
      dispatch(ALL_REVIEW_REQUEST())

      const config = { headers: { "Content-Type": "application/json" }, withCredentials: true }


      const { data } = await axios.get(
        `${API_URI}/review?id=${id}`,
        config,
      )

      dispatch(ALL_REVIEW_SUCCESS(data.reviews))
    } catch (error) {
      dispatch(ALL_REVIEW_FAIL(error.response.data.message))
    }
  }
}

//delete product reviews -- admin
export const deleteReviews = (reviewId, productID) => {
  return async (dispatch) => {
    try {
      dispatch(DELETE_REVIEW_REQUEST())

      const config = { headers: { "Content-Type": "application/json" }, withCredentials: true }

      const { data } = await axios.delete(
        `${API_URI}/review?id=${reviewId}&productID=${productID}`,
        config,
      )

      // console.log(data.success)

      dispatch(DELETE_REVIEW_SUCCESS(data.success))
    } catch (error) {
      dispatch(DELETE_REVIEW_FAIL(error.response.data.message))
    }
  }
}




export const clearErrors = () => async (dispatch) => {
  dispatch(CLEAR_ERRORS());
};