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

  React.useEffect(()=>{
    WebFont.load({
      google:{
        families:["Roboto","Droid Sans","Chilanka"]
      }
    })
    const checkLogin=async()=>{
      try{
        const response = await axios.get("/api/v1/me")
        console.log(response.data)
        const {success} = response.data
        setUser(response.data.user) 
        console.log(user)
        if(success){
          setAuthentication(true)
        }
      }
      catch(error){
        console.log(error.message)
      }
    }
    checkLogin()
  },[])

  console.log(user)

  return (
    <Router>
      <Header/>
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route exact path='/product/:id' element={<ProductDetails />} />
      <Route exact path='/products' element={<Products data={data}/>} />
      <Route path='/products/:keyword' element={<Products />} />
      <Route exact path='/search' element={<Search />} />
      <Route exact path='/account' element={<Profile />}/>
      <Route exact path='/login' element={<LoginSignUp authentication={isAuthenticated}/>} />
      </Routes>
      <Footer/>  
    </Router>
  );
  }
export default App;
