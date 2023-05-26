import { createSlice } from "@reduxjs/toolkit";
import { productsReducer } from "./reducers/productsReducer";

let initial_State={}

const slice = createSlice({
    name:'product',
    initialState: initial_State,
    reducers:{
        productsReducer
    }

})

export default slice.reducer