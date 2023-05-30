import axios from "axios"

import { ALL_PRODUCT_SUCCESS,ALL_PRODUCT_FAIL,ALL_PRODUCT_REQUEST, CLEAR_ERRORS } from "../constants/productConstants"
// import { createAction } from "@reduxjs/toolkit"

export const getProduct = () => async(dispatch)=>{
    try{
        dispatch({type:ALL_PRODUCT_REQUEST});

        const {data} = await axios.get("/api/v1/products")

        dispatch({
            type:ALL_PRODUCT_SUCCESS,
            payload:data
        });
    }
    catch(error){
        dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error.response.data.message
        })
    }
}

export const getProductDetails = () => async(dispatch)=>{
    try{
        dispatch({type:PRODUCT_DETAILS_REQUEST});

        const {data} = await axios.get(`/api/v1/product/${id}`)

        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload:data.product
        });
    }
    catch(error){
        dispatch({
        type: PRODUCT_DETAILS_FAIL,
        payload: error.response.data.message
        })
    }
}

// export const allProductSuccess= createAction(ALL_PRODUCT_SUCCESS)
// allProductSuccess(async()=>{return await axios.get("/api/v1/products")})

// export const allProductFail= createAction(ALL_PRODUCT_FAIL)
// allProductFail((error)=>{return error.response.data.message})

//Clearing Errors  
export const clearErrors = () => async(dispatch)=>{
    dispatch({
        type: CLEAR_ERRORS
    })
}