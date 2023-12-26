import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./myOrders.css";
// import { useSelector, useDispatch } from "react-redux";
// import { clearErrors, myOrders } from "../../actions/orderAction";
// import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";
import LaunchIcon from "@material-ui/icons/Launch";
import axios from "../../axios";

const MyOrders = () => {
//   const dispatch = useDispatch();

//   const alert = useAlert();

//   const { loading, error, orders } = useSelector((state) => state.myOrders);
//   const { user } = useSelector((state) => state.user);
const [orders,setOrders] = useState([])
useEffect(()=>{
    const fetchData=async()=>{
      const response = await axios.get("/api/v1/orders/me")
      console.log(response.data.orders)
      setOrders(response.data.orders)
    }
  fetchData()
},[])
console.log(orders)
// const orders = []
// orders.push(JSON.parse(localStorage.getItem("myorders")))
const user = JSON.parse(localStorage.getItem("user"))

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.4,
      cellClassName: (params) => {
        console.log(params)
        const data =params.getValue(params.id, "status") === "Delivered" 
        ? "greenColor"
        : "redColor"
        console.log(data)
        return data
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.45,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      console.log(item)
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      })
    });

    console.log(rows)

//   useEffect(() => {
//     if (error) {
//       alert.error(error);
//       dispatch(clearErrors());
//     }

//     dispatch(myOrders());
//   }, [dispatch, alert, error]);

  return (
    <Fragment>
      <MetaData title={`${user.name} - Orders`} />

        <div className="myOrdersPage">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
          />

          <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
        </div>
    </Fragment>
  );
};

export default MyOrders;