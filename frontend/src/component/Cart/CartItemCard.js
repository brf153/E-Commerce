import React from 'react'
import { Link } from 'react-router-dom'
import "./CardItemCard.css"

const CartItemCard = ({item,deleteCartItems}) => {
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