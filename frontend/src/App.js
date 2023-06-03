import './App.css';
import React, { useEffect, useState } from 'react';
import Header from "./component/layout/Header/Header.js"
import Footer from './component/layout/Footer/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WebFont from 'webfontloader';
import Home from './component/Home/Home.js';
import ProductDetails from './component/Product/ProductDetails.js'
import axios from 'axios';
import Products from "./component/Product/Products.js"
import Search from "./component/Product/Search.js"
import LoginSignUp from './component/User/loginSignUp';
import UserOptions from "./component/layout/Header/UserOptions.js"
import Profile from './component/User/Profile';
// import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdateProfile from "./component/User/UpdateProfile.js"
import UpdatePassword from './component/User/UpdatePassword';
import ResetPassword from './component/User/ResetPassword';
import ForgotPassword from './component/User/ForgotPassword';
import Cart from './component/Cart/Cart';
import Shipping from "./component/Cart/Shipping.js"
import ConfirmOrder from './component/Cart/ConfirmOrder';
import Payment from './component/Cart/Payment';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from './component/Cart/OrderSuccess';
import MyOrders from './component/Order/MyOrders';
import OrderDetails from './component/Order/OrderDetails';

function App() {

  const[data,setData]= useState([])
  const[isAuthenticated,setAuthentication]=useState(false)
  const[user, setUser] = useState([])
  // const[dataId,setId] = useState([])
  const dataId = []

  useEffect(()=>{
    const fetchData=async()=>{
      const response = await axios.get(`/api/v1/products`)
      // console.log(response.data)
      setData(response.data.products)
      // setId(response.data.products.id)
      // setId(response.data.products._id)
    }
    fetchData()
  },[])

  // dataId.push(data._id)
  //eslint-disable-next-line
  {data.map((e,i)=>{
    return dataId.push(e._id)
  })}

  // const data_id = data._id
  // console.log(data)
  // console.log(dataId)

  const [stripeApiKey, setStripeApiKey] = useState("")

  async function getStripeApiKey(){
    const {data} = await axios.get("/api/v1/stripeapikey")

    setStripeApiKey(data.stripeApiKey)
  }

  useEffect(()=>{
    WebFont.load({
      google:{
        families:["Roboto","Droid Sans","Chilanka"]
      }
    })

    const checkLogin=async()=>{
      try{
        const response = await axios.get("/api/v1/me")
        // console.log(response.data)
        const {success} = response.data
        setUser(response.data.user) 
        const user = response.data.user
        localStorage.setItem("user", JSON.stringify(user))
        if(success){
          setAuthentication(true)
        }
      }
      catch(error){
        console.log(error.message)
      }
    }
    checkLogin()
    getStripeApiKey()
  },[])

  // console.log(user)

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path='/product/:id' element={<ProductDetails />} />
        <Route exact path='/products' element={<Products data={data} />} />
        <Route path='/products/:keyword' element={<Products />} />
        <Route exact path='/search' element={<Search />} />
        { user && ( <Route exact path='/account' element={<Profile user={user} authentication={isAuthenticated} />} /> ) }
        <Route exact path="/me/update" element={<UpdateProfile authentication={isAuthenticated} />} />
        <Route exact path='/login' element={<LoginSignUp authentication={isAuthenticated} />} />
        <Route exact path='/password/update' element={<UpdatePassword/>} />
        <Route exact path='/password/forgot' element={<ForgotPassword/>} />
        <Route exact path="/password/reset/:token" element={<ResetPassword/>}/>
        <Route exact path='/cart' element={<Cart/>} />
        <Route exact path='/shipping' element={<Shipping/>} />
        <Route exact path='/order/confirm' element={<ConfirmOrder/>} />
        {stripeApiKey &&
        <Route exact path='/process/payment' element={

        <Elements stripe={loadStripe(stripeApiKey)}>
        <Payment/>
        </Elements>
        }>
        </Route>
        }
        <Route exact path='/success' element={<OrderSuccess/>} />
        <Route exact path='/orders' element={<MyOrders/>} />
        <Route exact path='/order/:id' element={<OrderDetails/>} />
      </Routes>
      <Footer />
    </Router>
  );
  }
export default App;
