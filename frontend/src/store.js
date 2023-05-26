// import {legacy_createStore as createStore, combineReducers, applyMiddleware} from "redux"
// import thunk from "redux-thunk"
// import { composeWithDevTools} from "redux-devtools-extension"
// // import {configureStore} from "@reduxjs/toolkit"
// import { productsReducer } from "./reducers/productsReducer"

// const reducer = combineReducers({
//     products:productsReducer,
// });

// let initialState = {
//     products:[]
// }

// const middleware = [thunk]

// const store = createStore(
//     reducer,
//     initialState,
//     composeWithDevTools(applyMiddleware(...middleware))
// )

// export default store

import {combineReducers, configureStore, createSlice} from "@reduxjs/toolkit"
import thunk from 'redux-thunk';
import {productsReducer} from "./reducers/productsReducer";
import slice from "./slice"; 
// import { legacy_createStore as createStore } from "@reduxjs/toolkit";
// import { applyMiddleware } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import { legacy_createStore as createStore, applyMiddleware} from 'redux'

let initial_State={}

const reducer = combineReducers({
    products: productsReducer
})

const middleware = [thunk]

const store = createStore(
    reducer,
    initial_State,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store
    