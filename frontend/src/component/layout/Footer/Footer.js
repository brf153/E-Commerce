import React from 'react'
import playStore from "../../../images/playstore.png"
import appStore from "../../../images/Appstore.png"
import "./Footer.css"

const Footer = () => {
  return (
    <footer id='footer'>
    <div className='leftFooter'>
        <h4>Download Our App</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt='playstore'/>
        <img src={appStore} alt='appstore'/>
    </div>
    <div className='midFooter'>
        <h1>ECOMMERCE</h1>
        <p>High Quality is out first priority</p>
        <p>Copyright 2021 &copy; MeBhandari</p>
    </div>
    <div className='rightFooter'>
        <h4>Follow Us</h4>
        <a href='lsdkfj'>Instagram</a>
        <a href='fjdsla'>Facebook</a>
        <a href='d;slgf'>Youtube</a>
    </div>
    </footer>
  )
}

export default Footer