import React, { Fragment, useEffect, useState } from 'react'
import Carousel from "react-material-ui-carousel"
import "./ProductDetails.css"
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReactStars from "react-rating-stars-component"
import ReviewCard from "./ReviewCard.js"
import Loader from '../layout/Loader/loader';

const ProductDetails = () => {
    const {id} = useParams()
   const[select,getProduct]= useState([]);
   const[product,setProduct] = useState([]);
   const[loader,setLoader] = useState(true)

   useEffect(() => {
    const fetchData = async () => {
      try {
        window.scrollTo(0,0);
        const response = await axios.get(`/api/v1/product/${id}`);
        console.log(response.data.product.images[0].url)
        getProduct(response.data.product.images[0].url);
        setProduct(response.data.product)
        await new Promise((resolve)=>setTimeout(resolve,1000))
        setLoader(false)
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchData();
  }, [id]);

//    useEffect(()=>{
//     const fetchData=async()=>{
//         try{
//              const productPromises= id.map(async(e)=>{
//                 // console.log(e)
//                  await axios.get(`/api/v1/product/${e}`)
//                 }) 
            
//             const response = await Promise.all(productPromises)
//             const productData = response.map((e)=>e.data.products)
//             console.log(productPromises)
//             getProducts(productData)
//             // console.log(response.data.products)
//         }
//         catch(error){
//             console.log(error)
//         }
//     }
//     fetchData()
//    },[id])
const options = {
    edit:false,
    color:"rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20:25,
    value:product.ratings,
    isHalf: true
}

if(loader){
 return <Loader/>
}
  return (
    <Fragment>
    
        <div className='ProductDetails'>
            <div>
                {/* <Carousel> */}
                    <img className='CarouselImage' src={select} alt="Slide"/>
                {/* </Carousel> */}
                </div>
                <div>
                <div className='detailsBlock-1'>
                    <h2>{product.name}</h2>
                    <p>Product # {product._id}</p>
                </div>
                <div className='detailsBlock-2'>
                    <ReactStars {...options}/>
                    <span>({product.numOfReviews} Reviews)</span>
                </div>
                <div className='detailsBlock-3'>
                    <h1>{`₹${product.price}`}</h1>
                    <div className='detailsBlock-3-1'>
                        <div className='detailsBlock-3-1-1'>
                            <button>-</button>
                            <input value="1" type="number"/>
                            <button>+</button>
                        </div>{" "}
                        <button>Add to Cart</button>
                    </div>
                    <p>
                        Status:{" "}
                        <b className={product.Stock < 1 ? "redColor":"greenColor"}>
                            {product.Stock<1?"OutofStock":"InStock"}
                        </b>
                    </p>
                </div>
                <div className='detailsBlock-4'>
                    Description: <p>{product.description}</p>
                </div>

                <button className='submitReview'>Submit Review</button>
            </div>
            </div>

            <h1 className='reviewsHeading'>REVIEWS</h1>

            {product.reviews && product.reviews[0] ? (
                <div className='reviews'>
                    {product.reviews && product.reviews.map((review)=>{
                        return <ReviewCard review={review}/>
                    })}
                </div>

            ):(
                <p className='noReviews'>No Reviews Yet</p>
            )}
            
    </Fragment>
  )
}

export default ProductDetails