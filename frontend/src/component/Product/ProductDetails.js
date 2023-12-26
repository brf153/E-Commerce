import React, { Fragment, useEffect, useState } from 'react'
import Carousel from "react-material-ui-carousel"
import "./ProductDetails.css"
import axios from "../../axios";
import { useNavigate, useParams } from 'react-router-dom';
import ReactStars from "react-rating-stars-component"
import ReviewCard from "./ReviewCard.js"
import Loader from '../layout/Loader/loader';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
  } from "@material-ui/core";
  import { Rating } from "@material-ui/lab";
// import { response } from 'express';

const ProductDetails = () => {
   const {id} = useParams()
   const history = useNavigate()
   const[select,getProduct]= useState([]);
   const[product,setProduct] = useState([]);
   const[loader,setLoader] = useState(true)

   const [open, setOpen] = useState(false);
   const [rating, setRating] = useState(0);
   const [comment, setComment] = useState("");


   const cartItems=[]

   useEffect(() => {
    const fetchData = async () => {
      try {
        window.scrollTo(0,0);
        const response = await axios.get(`/api/v1/product/${id}`);
        // sresponse.data.product
        console.log(response.data.product)
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

const addCart=async()=>{
    const itemExist = cartItems.find((e)=>e.product===product)
    if(itemExist){
        history("/cart")
        return
    } 
    else{
        // cartItems.push(product)
        const config={
          headers:{
              "Content-Type":"application/json"
          }
      }
        await axios.post("/api/v1/addcart",product,config )
        history("/cart")
        
    }
}

const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

const params = useParams()

const reviewSubmitHandler = async() => {
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }
    const myForm = new FormData();

    myForm.set("rating", rating);
    console.log(rating)
    myForm.set("comment", comment);
    myForm.set("productId", params.id);

    // dispatch(newReview(myForm));
    await axios.put("/api/v1/review",myForm,config)
    .then((response)=>console.log(response))
    .catch((error)=>console.log(error))

    window.location.reload()
    window.scrollTo(0,0)
    setOpen(false);
  };

const [quantity, setQuantity] = useState(1)

const increaseQuantity=()=>{
    if(product.Stock<=quantity) return

    setQuantity(quantity+1)
}

const decreaseQuantity=()=>{
    if(1>=quantity) return

    setQuantity(quantity-1)
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
                            <button onClick={decreaseQuantity}>-</button>
                            <input value={quantity} type="number"/>
                            <button onClick={increaseQuantity}>+</button>
                        </div>{" "}
                        <button onClick={addCart}>Add to Cart</button>
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

                <button onClick={submitReviewToggle} className='submitReview'>Submit Review</button>
            </div>
            </div>

            <h1 className='reviewsHeading'>REVIEWS</h1>

            <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

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