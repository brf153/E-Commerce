import React, { Fragment, useState, useEffect } from "react";
import "./UpdateProfile.css";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import MetaData from "../layout/MetaData";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateProfile = () => {
//   console.log(user)
  const user = JSON.parse(localStorage.getItem("user"))
  const history = useNavigate()

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState(user.avatar.url);
  const [isUpdated, setUpdate] = useState(false)

  const updateProfileSubmit = async(e) => {
    e.preventDefault();
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);

    try{
        const response = await axios.put("/api/v1/me/update",myForm,config)
        // console.log(response.data.user)
        localStorage.setItem("user", JSON.stringify(response.data.user))

        console.log(response)
        const {statusText,data} = response
        if(statusText==="OK"){
            setUpdate(true)
            console.log("Update Successfully")
            console.log(data)
        }
    }
    catch(error){
        console.log(error.message)
    }

  };

  const updateProfileDataChange = (e) => {
    e.preventDefault()

        if(e.target.name==="avatar"){
        const reader = new FileReader();
    
        reader.onload = () => {
          if (reader.readyState === 2) {
            console.log(reader)
            setAvatarPreview(reader.result);
            setAvatar(reader.result);
          }
        };
    
        reader.readAsDataURL(e.target.files[0]);
    }
    
  };

  useEffect(() => {
    // if (user) {
    //   setName(user.name);
    //   setEmail(user.email);
    //   setAvatarPreview(user.avatar.url);
    // }

    if (isUpdated) {
      console.log(user)
      history("/account");
    }
  }, [isUpdated]);
  return (
        <Fragment>
          <MetaData title="Update Profile" />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>

              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
  );
};

export default UpdateProfile;