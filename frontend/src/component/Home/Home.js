import React, { Fragment, useEffect, useState } from 'react'
import {BsMouse} from "react-icons/bs"
import "./Home.css"
import Product from './ProductCard'
import MetaData from '../layout/MetaData'
import axios from '../../axios'
import Loader from '../layout/Loader/loader'
import {useAlert} from "react-alert"

const Home = () => {

  const alert = useAlert()

  const [data, setData] = useState([]);

  let [isLoading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/v1/products'); // Replace with your API endpoint URL
        setData(response.data.products); // Assuming the response contains an array of data
        await new Promise((resolve)=>setTimeout(resolve,2000))
        setLoading(isLoading=false)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if(isLoading){
    return <div><Loader/></div>
  }
  
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

          
             {data.map((e)=>{
               return <Product product={e}/>
            })}
            
          
        </div>
    </Fragment>
  )
}

export default Home