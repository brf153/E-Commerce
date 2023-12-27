import './App.css';
import React, { useEffect, useState } from 'react';
import Header from "./component/layout/Header/Header.js"
import Footer from './component/layout/Footer/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WebFont from 'webfontloader';
import Home from './component/Home/Home.js';
import ProductDetails from './component/Product/ProductDetails.js'
import axios from './axios.js';
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
import Dashboard from "./component/Admin/Dashboard"
import ProductList from './component/Admin/ProductList';
import NewProduct from './component/Admin/NewProduct';
import UpdateProduct from './component/Admin/UpdateProduct';
import OrderList from './component/Admin/OrderList';
import ProcessOrder from './component/Admin/ProcessOrder';
import UsersList from './component/Admin/UsersList';
import UpdateUser from './component/Admin/UpdateUser';
import ProductReviews from './component/Admin/ProductReviews';
import Contact from './component/layout/Contact/Contact';
import About from './component/layout/About/About';
import NotFound from './component/layout/Not Found/NotFound';

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
        await axios.get("/api/v1/me").then((e)=>{
          
          console.log("dateResponse ",e.data.success)
          if(e.data.success){
            setUser(e.data.user) 
            const user = e.data.user
            localStorage.setItem("user", JSON.stringify(user))
            setAuthentication(true)
          }
          else{
            setAuthentication(false)
          }
          
        }).catch((err)=>{
          console.log("Checking Error")
          console.log("errorHere",err)
        }) 
        
      }
      catch(error){
        console.log("errorMessage",error.message)
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
        <Route exact path='/login' element={<LoginSignUp />} />
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
        <Route exact path='/admin/dashboard' element={<Dashboard/>} />
        <Route exact path='/admin/products' element={<ProductList/>} />
        <Route exact path='/admin/product' element={<NewProduct/>} />
        <Route exact path="/admin/product/:id" isAdmin={true} element={<UpdateProduct/>} />
        <Route exact path='/admin/orders' element={<OrderList/>} />
        <Route exact path='/admin/order/:id' element={<ProcessOrder/>} />
        <Route exact path="/admin/users" element={<UsersList/>} />
        <Route exact path='/admin/user/:id' element={<UpdateUser/>} />
        <Route exact path='/admin/reviews' element={<ProductReviews/>} />
        <Route exact path='/contact' element={<Contact/>} />
        <Route exact path='/about' element={<About/>} />
        <Route path='*' element={ <NotFound/>}/>
      </Routes>
      <Footer />
    </Router>
  );
  }
export default App;
