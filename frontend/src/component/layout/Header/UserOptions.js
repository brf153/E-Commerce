import React, { Fragment, useEffect, useState } from 'react'
import "./Header.css"
import {SpeedDial, SpeedDialAction} from "@material-ui/lab"
import Backdrop from "@material-ui/core/Backdrop";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserOptions = () => {

    // const [loggedIn, setLogin] = useState(true)
    const [cartItems, setCartItems] = useState([])

    const user = JSON.parse(localStorage.getItem("user"))

    const history = useNavigate()

    const [open,setOpen] = useState(false)

    const logoutUser=async()=>{
        await axios.get('/api/v1/logout')
        window.location.reload()
        console.log("Logged Out Successfully")
    }

    useEffect(()=>{
        fetchData=async()=>{
            try{
                const response= await axios.get("/api/v1/getcart").then((e)=>console.log(e)).catch((err)=>console.log(err))
                setCartItems(response.data.orders)
                console.log(response.data.orders)
            }
            catch(error){
                console.log(error)
            }
        }
        fetchData()
    },[])

    console.log(cartItems)

    const options=[
        {icon:<ListAltIcon/>, name:"Orders", func: orders},
        {icon:<PersonIcon/>, name:"Profile", func: account},
        {icon:<ShoppingCartIcon style={{color: cartItems.length>0 ? "tomato":"unset"}}/>, name:`Cart(${cartItems.length})`, func: cart},
        {icon:<ExitToAppIcon/>, name:"LogOut", func: logoutUser}
    ]

    if(user.role==="admin"){
        options.unshift({icon:<DashboardIcon/>, name:"Dashboard", func: dashboard},)
    }

    function dashboard(){
        history("/dashboard")
    }

    function orders(){
        history("/orders")
    }

    function cart(){
        history("/cart")
    }

    function account(){
        history("/account")
    }

  return (
    <Fragment>
        <Backdrop open={open} style={{ zIndex: "10" }} />
        <SpeedDial 
        ariaLabel='SpeedDial tooltip example'
        onClose={()=>setOpen(false)}
        onOpen={()=>setOpen(true)}
        style={{zIndex:"11"}}
        open={open}
        direction='down'
        className="speedDial"
        icon={<img
            className='speedDialIcon'
            src={user.avatar.url ? user.avatar.url : "/Profile.png"}
            alt='Profile'
            />}
        >

           {
            options.map((e)=>{

                return <SpeedDialAction icon={e.icon} tooltipTitle={e.name} onClick={e.func} tooltipOpen={window.innerWidth<=600 ? true:false}/>
            })   

           } 

        </SpeedDial>

    </Fragment>
  )
}

export default UserOptions