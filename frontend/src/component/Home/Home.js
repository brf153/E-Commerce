import React, { Fragment, useEffect } from 'react'
import {BsMouse} from "react-icons/bs"
import "./Home.css"
import Product from './Product'
import MetaData from '../layout/MetaData'
import {getProduct} from "../../actions/productAction.js"
import {useSelector, useDispatch} from "react-redux"

const product ={
  name:"HElpp",
  image: "../../images/Appstore.png",
  price:"$300",
  _id:"abhishek"
}

const Home = () => {
  const dispatch = useDispatch()

  // const {loading,error,products}= useSelector(
  //   (state)=>state.products
  //   )

  useEffect(()=>{
    dispatch(getProduct())
  },[dispatch])
  
  return (
    <Fragment>
      <MetaData title="Ecommerce" />
        <div className='banner'>
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS</h1>
            <a href='#container'>
                <button>
                    Scroll <BsMouse />
                </button>
            </a>
        </div>
        <h2 className='homeHeading'>Featured Products</h2>
        <div className='container' id='container'>

          
             <Product product={product}/>
            
          
        </div>
    </Fragment>
  )
}

export default Home