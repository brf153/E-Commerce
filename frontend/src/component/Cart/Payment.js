import React, { Fragment, useEffect, useRef, useState } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Typography } from "@material-ui/core";
// import { useAlert } from "react-alert";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import axios from "axios";
import "./payment.css";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { useNavigate } from "react-router-dom";
// import { createOrder, clearErrors } from "../../actions/orderAction";

const Payment = () => {

    const history = useNavigate()

    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"))
    const user = JSON.parse(localStorage.getItem("user"))
    const cartItems = JSON.parse(localStorage.getItem("cartProduct"))
    const shippingInfo = JSON.parse(localStorage.getItem("shippingInfo"))
    // const product = JSON.parse(localStorage.getItem("product"))
    console.log(cartItems)

    const stripe = useStripe()
    const elements = useElements()
    const payBtn = useRef(null)

    // const [cardNumber, setCardNumber] = useState("")
    const orderProducts = cartItems.map((e)=>{
           return{
               name: e.name,
               price: e.price,
               quantity: e.Stock,
               image: e.images[0].url,
               product: e
           } 

        
    })

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100)
    }

    const order = {
        shippingInfo,
        orderItems: orderProducts,
        itemsPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice,
      };

    const submitHandler=async(e)=>{
        e.preventDefault()
        payBtn.current.disabled = true
        try{
            const config={
                headers:{
                    "Content-Type":"application/json"
                }
            }
            const {data} = await axios.post("/api/v1/payment/process",paymentData,config)
            const client_secret = data.client_secret

            if(!stripe||!elements) return 

            const result = await stripe.confirmCardPayment(client_secret,{
                payment_method:{
                    card: elements.getElement(CardNumberElement),
                    billing_details:{
                        name: user.name,
                        email: user.email,
                        address:{
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: parseInt(shippingInfo.pinCode),
                            country: shippingInfo.country
                        }
                    }
                }
            })
            if(result.error){
                payBtn.current.disabled = false
                console.log(result.error)
            }
            else{
                if(result.paymentIntent.status==="succeeded"){
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                      };

                    localStorage.setItem("myorders", JSON.stringify(order))

                    const {data} = await axios.post("/api/v1/order/new",order,config)
                    console.log(data)
                    if(data){
                        history("/success")
                    }
                    else{
                        console.log("Dekhle payment nhi hui hai abhi")
                    }
                }
                else{
                    console.log("There is some issue while processing payment")
                }
            }
        }
        catch(error){
            payBtn.current.disabled = false
            console.log(error.message)
        }
    }
  return (
    <Fragment>
        <MetaData title="Payment"/>
        <CheckoutSteps activeStep={2} />
        <div className="paymentContainer">
            <form className="paymentForm" onSubmit={(e)=> submitHandler(e)}>
                <Typography>Card Info</Typography>
                <div>
                    <CreditCardIcon />
                    <CardNumberElement className="paymentInput" />
                </div>
                <div>
                    <EventIcon />
                    <CardExpiryElement className="paymentInput" />
                </div>
                <div>
                    <VpnKeyIcon />
                    <CardCvcElement className="paymentInput" />
                </div>
                <input 
                type="submit"
                value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
                ref={payBtn}
                className="paymentFormBtn"
                />
            </form>
        </div>
    </Fragment>
  )
}

export default Payment