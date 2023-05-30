import { createSlice } from "@reduxjs/toolkit";
import { productsReducer } from "./reducers/productsReducer";

const slice = createSlice({
    name:'product',
    initialState: {products:[]},
    reducers:{
        productsReducer
    }

},
{
    name:"productDetails",
    
})

export default slice.reducer