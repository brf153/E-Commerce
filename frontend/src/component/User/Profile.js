import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
// import Loader from "../layout/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import "./Profile.css";
import axios from "axios";

const Profile = () => {

  const history = useNavigate() 
  
  const [authentication, setAuthentication] = useState(false)
  const [user, setUser] = useState([])
    
//   const { user, authentication } = useSelector((state) => state.user);

  useEffect(() => {
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
          else{
              history("/login");
            }
              
        }
        catch(error){
          console.log(error)
        }
    }
    checkLogin()
  }, [history, authentication]);

  console.log(user)
  return (
        <Fragment>
          <MetaData title={`${user.name}'s Profile`} />
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              <img src={user.avatar.url ? user.avatar.url:"/Profile.png"} alt={user.name} />
              <Link to="/me/update">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user.createdAt).substr(0, 10)}</p>
              </div>

              <div>
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}

export default Profile;