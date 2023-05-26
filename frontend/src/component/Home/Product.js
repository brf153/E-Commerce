import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component"
import images from "./images.js"
import logo from "../../images/Appstore.png"

const options = {
    edit:false,
    color:"rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20:25,
    value:2.5,
    isHalf: true
}

const Product = ({product})=>{
    const {name,image,price,_id} = product
    return(
        <Link className="productCard" to={_id}>
           <img src={images[0].path} alt={name}/>
            <p>{name}</p>
            <div>
                <ReactStars {...options} /> <span>(256 reviews)</span>
            </div>
            <span>{price}</span>
        </Link>
    )
}

export default Product;