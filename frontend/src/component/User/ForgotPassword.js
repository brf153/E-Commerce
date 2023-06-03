import React, { Fragment, useState, useEffect } from "react";
import "./ForgotPassword.css";
// import Loader from "../layout/Loader/Loader";
// import { useDispatch, useSelector } from "react-redux";
// import { clearErrors, forgotPassword } from "../../actions/userAction";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
// import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import axios from "axios";

const ForgotPassword = () => {
  // const dispatch = useDispatch();
  // const alert = useAlert();

  // const { error, message, loading } = useSelector(
  //   (state) => state.forgotPassword
  // );

  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = async(e) => {
    e.preventDefault();
    const config={
      headers:{
        "Content-Type":"application/json"
    }
    }

    const myForm = new FormData();

    myForm.set("email", email);
    try{
      const response= await axios.post("/api/v1/password/forgot",myForm,config)
      console.log(response)
      if(response){
        console.log("Message Sent")
      }
    }
    catch(error){
      console.log(error.message)
    }
    // dispatch(forgotPassword(myForm));
  };

  // useEffect(() => {
  //   // if (error) {
  //   //   alert.error(error);
  //   //   dispatch(clearErrors());
  //   // }

  //   // if (message) {
  //   //   alert.success(message);
  //   // }
  // }, [dispatch, error, alert, message]);

  return (
        <Fragment>
          <MetaData title="Forgot Password" />
          <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
              <h2 className="forgotPasswordHeading">Forgot Password</h2>

              <form
                className="forgotPasswordForm"
                onSubmit={forgotPasswordSubmit}
              >
                <div className="forgotPasswordEmail">
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

                <input
                  type="submit"
                  value="Send"
                  className="forgotPasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
  );
};

export default ForgotPassword;