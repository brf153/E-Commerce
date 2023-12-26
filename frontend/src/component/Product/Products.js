import React, { Fragment, useEffect, useState } from 'react'
import Loader from '../layout/Loader/loader'
import ProductCard from '../Home/ProductCard'
import "./Products.css" 
import axios from '../../axios'
import { useLocation } from 'react-router-dom'
import Pagination from 'react-js-pagination';
import Slider from "@material-ui/core/Slider"
import { Typography } from '@material-ui/core'
import MetaData from '../layout/MetaData'

const categories=[
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones"
]

const Products = ({data}) => {
    const [isLoading,setLoading] = useState(true)
    const [product, setProduct] = useState([])
    const [product_Count, setProductCount] = useState(0)
    const [page,setPage] = useState(1)
    const [price,setPrice] = useState([0,250000])
    const [category,setCategory] = useState("")
    const [ratings,setRatings] = useState(0)

    const location = useLocation()
    const keyword = location.pathname.slice(10)
    // console.log(keyword)
        
    useEffect(() => {
        const fetchData = async () => {
            try {


                window.scrollTo(0, 0)
                if (category) {
                    const response = await axios.get(`/api/v1/products?page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`)
                    const product = response.data.products
                    console.log(product)
                    setProductCount(response.data.productCount)
                    // console.log(response.data)
                    const filteredProducts = product.filter((e) => {
                        return e.name.toLowerCase().includes(keyword.toLowerCase())
                    })
                    // console.log(filteredProducts)
                    setProduct(filteredProducts)

                    await new Promise((resolve) => setTimeout(resolve, 1000))
                    setLoading(false)
                }
                else {
                   const response = await axios.get(`/api/v1/products?page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`)
                    const product = response.data.products
                    console.log(product)
                    setProductCount(response.data.productCount)
                    // console.log(response.data)
                    const filteredProducts = product.filter((e) => {
                        return e.name.toLowerCase().includes(keyword.toLowerCase())
                    })
                    // console.log(filteredProducts)
                    setProduct(filteredProducts)

                    await new Promise((resolve) => setTimeout(resolve, 1000))
                    setLoading(false)
                }
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [page, price, category, ratings])
    // console.log(product_Count)

    const handlePageClick=(e)=>{
        setPage(e)
    }

    const priceHandler = (event,newPrice)=>{
        setPrice(newPrice)
    }

    // console.log(page)

    if(isLoading){
        return <Loader/>
    }

    if(product){

        return (
          <Fragment>
            <MetaData title={`${product.name}---ECOMMERCE`} />
              <h2 className='productsHeading'>Products</h2>
              <div className='products'>
                {
                    product.map((e)=>{
                        return <ProductCard key={e._id} product={e}/>

                    }) 

                }
              </div>

                <div className='filterBox'>
                    <Typography>Price</Typography>
                    <Slider value={price} onChange={priceHandler} valueLabelDisplay='auto' aria-labelledby='range-slider' min={0} max={250000}/>
                </div>

                <Typography>Categories</Typography>
                <ul className='categoryBox'>
                    {categories.map((category)=>{
                       return <li
                         className='category-link'
                         key={category}
                         onClick={()=>setCategory(category)}
                        >
                            {category}
                        </li>
                    })}
                </ul>

                <fieldset>
                    <Typography component="legend">Ratings Above</Typography>
                    <Slider
                    value={ratings}
                    onChange={(e,newRating)=>{
                        setRatings(newRating)
                    }}
                    aria-labelledby='continuous-slider'
                    min={0}
                    max={5}
                    />
                </fieldset>

                {8 < product_Count && (

              <div className='paginationBox'>
                    <Pagination
                        activePage={page}
                        itemsCountPerPage={8}
                        totalItemsCount={product_Count}
                        onChange={handlePageClick}
                        nextPageText="Next"
                        prevPageText="Prev"
                        firstPageText="First"
                        lastPageText="Last"
                        itemClass='page-item'
                        linkClass='page-link'
                        activeClass='pageItemActive'
                        activeLinkClass='pageLinkActive'
                    />
              </div>
      
                )}
          </Fragment>
        )
    }
    else{
        return(
            <Fragment>
            <h2 className='productsHeading'>Products</h2>
            <div className='products'>
                   No Product Found
            </div>
            </Fragment>

        )
    }
}

export default Products