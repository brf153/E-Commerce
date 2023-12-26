import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import "./loginSignUp.css"
import faceLogo from "../../images/Profile.png"
import axios from '../../axios';

const LoginSignUp = () => {

    const history = useNavigate()

    const loginTab = useRef(null)
    const registerTab = useRef(null)
    const switcherTab = useRef(null)

    const [loginEmail,setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    const [authentication,setAuthentication] = useState(false)

    const [user,setUser] = useState({
        name:"",
        email:"",
        password:"",
    })

    const {name,email,password} = user

    const [avatar,setAvatar] = useState()
    const [avatarPreview,setAvatarPreview] = useState(faceLogo)

    const loginSubmit=async(e)=>{
        e.preventDefault()
        const post = {
            email: loginEmail,
            password: loginPassword
        }
        try{
            const config={
                headers:{
                    "Content-Type":"application/json"
                }
            }
            console.log(loginEmail,loginPassword)
            const response = await axios.post("/api/v1/login", post, config)
            const {success,message} = response.data

            if(success){
                console.log('Login Successful')
                history("/account")
            }
            else{
                console.log("Login Failed", message)
            }
            
        }
        catch(error){
            console.log("Login Error:", error.message)
        }
    }

    const registerSubmit=async(e)=>{
        e.preventDefault();
        const config={
            headers:{
                "Content-Type":"application/json"
            }
        }
        const myForm = new FormData();

        myForm.set("name",name);
        myForm.set("email",email);
        myForm.set("password",password);
        myForm.set("avatar",avatar)

        try{
            const response = await axios.post("/api/v1/register",myForm,config)
            const {success,message} = response.data

            if(success){
                console.log('Registration Successful')
                history("/account")
            }
            else{
                console.log("Login Failed", message)
            }

            console.log("Sign Up Form Submitted")
        }
        catch(error){
            console.log(error.message)
        }
    }

    const registerDataChange = (e)=>{
        if(e.target.name==="avatar"){
            const reader= new FileReader()

            reader.onload=()=>{
                if(reader.readyState===2){
                    console.log(reader)
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0])
        }
        else{
            setUser({...user, [e.target.name]:e.target.value})
        }
    }

    const redirect = window.location.href ? window.location.href.split("=")[1] :"/account"
    console.log("checkRedirect",redirect)

    useEffect(()=>{
        console.log("auth", authentication)
        const checkLogin=async()=>{
            try{
              await axios.get("/api/v1/me").then((e)=>{
                console.log("dateResponse ",e)
                setUser(e.data.user) 
                const user = e.data.user
                localStorage.setItem("user", JSON.stringify(user))
                setAuthentication(true)
              }).catch((err)=>{
                console.log("Checking Error in loginSignUp.js")
                console.log("errorHere",err)
              }) 
              
            }
            catch(error){
              console.log("errorMessage",error.message)
            }
          }
          checkLogin()
        if(authentication){
            history(`/${redirect}`)
        }
    },[])

    const switchTabs = (e,tab)=>{
        if(tab==="login"){
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight")

            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft")
        }
        if(tab === "register"){
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral")

            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft")
        }
    }

  return (
    <Fragment>
        <div className='LoginSignUpContainer'>
            <div className='LoginSignUpBox'>
                <div>
                    <div className='login_signUp_toggle'>
                        <p onClick={(e)=>switchTabs(e,"login")}>LOGIN</p>
                        <p onClick={(e)=>switchTabs(e,"register")}>REGISTER</p>
                    </div>
                    <button ref={switcherTab}></button>
                </div>
                <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
                    <div className='loginEmail'>
                        <MailOutlineIcon/>
                        <input 
                        type="email"
                        placeholder='Email'
                        required
                        value={loginEmail}
                        onChange={(e)=>setLoginEmail(e.target.value)}
                        />
                    </div>
                    <div className='loginPassword'>
                        <LockOpenIcon/>
                        <input 
                        type='password'
                        placeholder='Password'
                        required
                        value={loginPassword}
                        onChange={(e)=>setLoginPassword(e.target.value)}
                        />

                    </div>
                    <Link to="/password/forgot" className='link_pass'>Forgot Password ?</Link>
                    <input type='submit' value="Login" className='loginBtn' />
                </form>
                <form
                className='signUpForm'
                ref={registerTab}
                encType='multipart/form-data'
                onSubmit={registerSubmit}
                >
                    <div className='signUpName'>
                        <FaceIcon/>
                        <input 
                        type='text'
                        placeholder='Name'
                        required
                        name='name'
                        value={name}
                        onChange={registerDataChange}
                        />
                    </div>
                    <div className='signUpEmail'>
                        <MailOutlineIcon/>
                        <input 
                        type='email'
                        placeholder='Email'
                        required
                        name='email'
                        value={email}
                        onChange={registerDataChange}
                        />
                    </div>
                    <div className='signUpPassword'>
                        <LockOpenIcon/>
                        <input 
                        type='password'
                        placeholder='Password'
                        required
                        name='password'
                        value={password}
                        onChange={registerDataChange}
                        />
                    </div>
                    <div id='registerImage'>
                        <img src={avatarPreview} alt="Avatar Preview"/>
                        <input
                        type="file"
                        name='avatar'
                        accept='image/'
                        onChange={registerDataChange}
                        />
                    </div>
                    <input 
                    type='submit'
                    value="Register"
                    className='signUpBtn'
                    />
                    {/* // disabled={loading? true:false}
                    /> */}
                </form>
            </div>
        </div>
    </Fragment>
  )
}

export default LoginSignUp