import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component"
// import images from "./images.js"
// import logo from "../../images/Appstore.png"

const ProductCard = ({product})=>{
    const options = {
        edit:false,
        color:"rgba(20,20,20,0.1)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 20:25,
        value:2.5,
        isHalf: true
    }
    // console.log(product.images[0].url)
    return(
        <Link className="productCard" to={`/product/${product._id}`}>

           <img src={product.images[0].url} alt={product.name}/>
            <p>{product.name}</p>
            <div>
                <ReactStars {...options} /> <span>({product.numofReviews} reviews)</span>
            </div>
            <span>{`₹${product.price}`}</span>
            
        </Link>
    )
}

export default ProductCard;