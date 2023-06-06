import React, { Fragment, useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PersonIcon from "@material-ui/icons/Person";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import SideBar from "./Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
// import { UPDATE_USER_RESET } from "../../constants/userConstants";
// import {
//   getUserDetails,
//   updateUser,
//   clearErrors,
// } from "../../actions/userAction";
// import Loader from "../layout/Loader/Loader";

const UpdateUser = () => {
    const history = useNavigate()

    const params = useParams()

    const [user, setUser] = useState([])
    const [isUpdated, setUpdated] = useState(false)
    const [isLoading, setLoading] = useState(true)
//   const dispatch = useDispatch();
//   const alert = useAlert();

//   const { loading, error, user } = useSelector((state) => state.userDetails);

//   const {
//     loading: updateLoading,
//     error: updateError,
//     isUpdated,
//   } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const userId = params.id;

  useEffect(async() => {
    if (user && user._id !== userId) {
    //   dispatch(getUserDetails(userId));
    const { data } = await axios.get(`/api/v1/admin/user/${userId}`);
    setUser(data.user)
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
    // if (error) {
    //   alert.error(error);
    //   dispatch(clearErrors());
    // }

    // if (updateError) {
    //   alert.error(updateError);
    //   dispatch(clearErrors());
    // }

    if (isUpdated) {
    //   alert.success("User Updated Successfully");
      history("/admin/users");
      setUpdated(false)
    //   dispatch({ type: UPDATE_USER_RESET });
    }
  }, [isUpdated]);

  const updateUserSubmitHandler = async(e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `/api/v1/admin/user/${userId}`,
      myForm,
      config
    );

    if(data){
        setUpdated(true)
    }
    // dispatch(updateUser(userId, myForm));
  };

  return (
    <Fragment>
      <MetaData title="Update User" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
            <form
              className="createProductForm"
              onSubmit={updateUserSubmitHandler}
            >
              <h1>Update User</h1>

              <div>
                <PersonIcon />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <VerifiedUserIcon />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Choose Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <Button
                id="createProductBtn"
                type="submit"
                disabled={
                  isLoading ? true : false || role === "" ? true : false
                }
              >
                Update
              </Button>
            </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateUser;