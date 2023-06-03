import React, { Fragment, useState, useEffect } from "react";
import "./ResetPassword.css";
// import Loader from "../layout/Loader/Loader";
// import { useDispatch, useSelector } from "react-redux";
// import { clearErrors, resetPassword } from "../../actions/userAction";
// import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
//   const dispatch = useDispatch();
//   const alert = useAlert();

//   const { error, success, loading } = useSelector(
//     (state) => state.forgotPassword
//   );
  const history = useNavigate()
  const {token} = useParams()
//   console.log(token)
  const [isPassword,setIsPassword] = useState(false)

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

//   const token = JSON.parse(localStorage.getItem("token"))

  const resetPasswordSubmit = async(e) => {
    e.preventDefault();
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }

    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);

    try{
        const response = await axios.put(`/api/v1/password/reset/${token}`,myForm,config)
        if(response){

            setIsPassword(true)
        }
        else{
            console.log("Some error")
        }
    }
    catch(error){
        console.log(error.message)
    }
    // dispatch(resetPassword(match.params.token, myForm));
  };

  useEffect(() => {
    // if (error) {
    //   alert.error(error);
    //   dispatch(clearErrors());
    // }

    if (isPassword) {
    // //   alert.success("Password Updated Successfully");

      history("/login");
    }
  }, [isPassword]);

  return (
        <Fragment>
          <MetaData title="Change Password" />
          <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2 className="resetPasswordHeading">Update Profile</h2>

              <form
                className="resetPasswordForm"
                onSubmit={resetPasswordSubmit}
              >
                <div>
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="resetPasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
  );
};

export default ResetPassword;