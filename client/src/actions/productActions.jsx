import axios from "axios"
import { ALL_PRODUCT_REQUEST , ALL_PRODUCT_SUCCESS , ALL_PRODUCT_FAIL , CLEAR_ERRORS } from "../slice/productSlice";
import {PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_SUCCESS} from "../slice/productSlice"

const API_URI = "http://localhost:8000/api/v1";

export const getProducts = () => {
  return async (dispatch) => {
      try {
          dispatch(ALL_PRODUCT_REQUEST());

          const { data } = await axios.get(`${API_URI}/products`);

          dispatch(ALL_PRODUCT_SUCCESS(data));
      } catch (error) {
          dispatch(ALL_PRODUCT_FAIL(error.response.data.message));
      }
  };
};

export const getProductsDetails = (id) => {
  return async (dispatch) => {
      try {
          dispatch(PRODUCT_DETAILS_REQUEST());

          const { data } = await axios.get(`${API_URI}/products/${id}`);

          dispatch(PRODUCT_DETAILS_SUCCESS(data));
      } catch (error) {
          dispatch(PRODUCT_DETAILS_FAIL(error.response.data.message));
      }
  };
};




export const clearErrors = () => async (dispatch) => {
  dispatch(CLEAR_ERRORS());
};