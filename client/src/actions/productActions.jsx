import axios from "axios"
import { ALL_PRODUCT_REQUEST , ALL_PRODUCT_SUCCESS , ALL_PRODUCT_FAIL , CLEAR_ERRORS, NEW_REVIEW_FAIL, NEW_REVIEW_REQUEST, NEW_REVIEW_SUCCESS } from "../slice/productSlice";
import {PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_SUCCESS} from "../slice/productSlice" 

const API_URI = "http://localhost:8000/api/v1";

export const getProducts = (keyword = "",currentPage=1,price = [0,25000], category, ratings = 0) => {
  return async (dispatch) => {
      try {
          dispatch(ALL_PRODUCT_REQUEST());

          let link = `${API_URI}/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`

          if(category){
            link = `${API_URI}/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`
          }
          
          const { data } = await axios.get(link);

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

          const { data } = await axios.get(`${API_URI}/product/${id}`);

          dispatch(PRODUCT_DETAILS_SUCCESS(data));
      } catch (error) {
          dispatch(PRODUCT_DETAILS_FAIL(error.response.data.message));
      }
  };
};

// New Review
export const newReview = (reviewData)=>{
  return async(dispatch)=>{
    try {
      dispatch(NEW_REVIEW_REQUEST())

      const config = { headers: { "Content-Type": "application/json" }, withCredentials: true }

      const {data} = await axios.put(
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




export const clearErrors = () => async (dispatch) => {
  dispatch(CLEAR_ERRORS());
};