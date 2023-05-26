// import { createReducer } from "@reduxjs/toolkit"
import { ALL_PRODUCT_SUCCESS,ALL_PRODUCT_REQUEST,CLEAR_ERRORS, ALL_PRODUCT_FAIL } from "../constants/productConstants"

export const productsReducer = (state = { products: [] }, action) => {
    switch (action.type) {
      case ALL_PRODUCT_REQUEST:
        return {
          loading: true,
          products: [],
        };

      case ALL_PRODUCT_SUCCESS:
        return {
          loading: false,
          products: action.payload.products,
          productsCount: action.payload.productsCount,
        };

      case ALL_PRODUCT_FAIL:
        return{
            loading: false,
            error: action.payload
        }  
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };