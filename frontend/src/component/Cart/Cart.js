import React, { Fragment, useEffect, useState } from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard";
// import { useSelector, useDispatch } from "react-redux";
// import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Cart = () => {
    //   const dispatch = useDispatch();
    //   const { cartItems } = useSelector((state) => state.cart);
    const history = useNavigate()
    //   const productID = JSON.parse(localStorage.getItem("productID"))



    const cartProduct = JSON.parse(localStorage.getItem("cartProduct"))
    const [cartItems, setCartItems] = useState(cartProduct)
    const [quantity, setQuantity] = useState(1)
    console.log(cartItems)

    //   const [cartItems,setItem] = useState([])

    //   useEffect(()=>{
    //     const fetchData=async()=>{
    //         try{
    //             const response = await axios.get(`/api/v1/product/${productID}`)
    //             console.log(response)
    //             const product= response.data.product
    //             setItem(e=>[...e,product])
    //         }
    //         catch(error){
    //             console.log(error)
    //         }

    //     }
    //     fetchData()
    //   },[])

    const increaseQuantity = async (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (stock <= quantity) {
            return;
        }

        // dispatch(addItemsToCart(id, newQty));
        setQuantity(newQty)
    };

    const decreaseQuantity = (id, quantity) => {
        const newQty = quantity - 1;
        if (1 >= quantity) {
            return;
        }
        // dispatch(addItemsToCart(id, newQty));
        setQuantity(newQty)
    };

    const deleteCartItems = (id) => {
        const itemIndex = cartItems.findIndex((e) => e._id === id)
        console.log(itemIndex)
        // findItem
        if (itemIndex != -1) {
            const updatedCartItem = [...cartItems]
            updatedCartItem.splice(itemIndex, 1)
            console.log(updatedCartItem)
            setCartItems(updatedCartItem)
            localStorage.setItem("cartProduct",JSON.stringify(updatedCartItem))
        }
    };

    const checkoutHandler = () => {
        history("/login?redirect=shipping");
    };

    return (
        <Fragment>
            {
                cartItems.length === 0 ? (
                    <div className="emptyCart">
                        <RemoveShoppingCartIcon />

                        <Typography>No Product in Your Cart</Typography>
                        <Link to="/products">View Products</Link>
                    </div>
                ) : (
                    <Fragment>
                        <div className="cartPage">
                            <div className="cartHeader">
                                <p>Product</p>
                                <p>Quantity</p>
                                <p>Subtotal</p>
                            </div>

                            {cartItems &&
                                cartItems.map((item) => (
                                    <div className="cartContainer" key={item.name}>
                                        <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                                        <div className="cartInput">
                                            <button
                                                onClick={() =>
                                                    decreaseQuantity(item, quantity)
                                                }
                                            >
                                                -
                                            </button>
                                            <input type="number" value={quantity} readOnly />
                                            <button
                                                onClick={() =>
                                                    increaseQuantity(
                                                        item.product,
                                                        quantity,
                                                        item.Stock
                                                    )
                                                }
                                            >
                                                +
                                            </button>
                                        </div>
                                        <p className="cartSubtotal">{`₹${item.price * quantity
                                            }`}</p>
                                    </div>
                                ))}

                            <div className="cartGrossProfit">
                                <div></div>
                                <div className="cartGrossProfitBox">
                                    <p>Gross Total</p>
                                    <p>{`₹${cartItems.reduce(
                                        (acc, item) => acc + quantity * item.price,
                                        0
                                    )}`}</p>
                                </div>
                                <div></div>
                                <div className="checkOutBtn">
                                    <button onClick={checkoutHandler}>Check Out</button>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                )}
        </Fragment>
    );

};

export default Cart;