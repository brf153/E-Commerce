import React from 'react'
import { Link } from 'react-router-dom'
import "./CardItemCard.css"
import Logo from "./../../images/Profile.png"

const CartItemCard = ({item,deleteCartItems}) => {
  // console.log(item.images[0].url)
    const handleClick=()=>{
        deleteCartItems(item._id)
    }
  return (
    <div className='CartItemCard'>
        <img src={item.images[0].url} alt='ssa'/>
        <div>
            <Link to={`/product/${item.product}`}>{item.name}</Link>
            <span>{`Price: ₹${item.price}`}</span>
            <p onClick={handleClick}>Remove</p>
        </div>
    </div>
  )
}

export default CartItemCard