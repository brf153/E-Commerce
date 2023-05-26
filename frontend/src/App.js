import './App.css';
import React from 'react';
import Header from "./component/layout/Header/Header.js"
import Footer from './component/layout/Footer/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WebFont from 'webfontloader';
import Home from './component/Home/Home.js';

function App() {

  React.useEffect(()=>{
    WebFont.load({
      google:{
        families:["Roboto","Droid Sans","Chilanka"]
      }
    })
  })

  return (
    <Router>
      <Header/>
      <Routes>
      <Route exact path="/" element={<Home/>}/>
      </Routes>
      <Footer/>  
    </Router>
  );
  }
export default App;
