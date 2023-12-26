import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
// import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import axios from "../../axios";
// import {
//   deleteOrder,
//   getAllOrders,
//   clearErrors,
// } from "../../actions/orderAction";
// import { DELETE_ORDER_RESET } from "../../constants/orderConstants";

const OrderList = () => {

    const history = useNavigate()

    const [isDeleted, setDeleted] = useState(false)

    const [orders, setOrders] = useState([])
    // const [isLoading, setLoading] = useState(true)
//   const dispatch = useDispatch();

//   const alert = useAlert();

//   const { error, orders } = useSelector((state) => state.allOrders);

//   const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  const deleteOrderHandler = async(id) => {
    const response = await axios.delete(`/api/v1/admin/order/${id}`);
    
    // dispatch(deleteOrder(id));
  };

  useEffect(async() => {
    // if (error) {
    //   alert.error(error);
    //   dispatch(clearErrors());
    // }

    // if (deleteError) {
    //   alert.error(deleteError);
    //   dispatch(clearErrors());
    // }

    if (isDeleted) {
    //   alert.success("Order Deleted Successfully");
      setDeleted(false)
      history("/admin/orders");
    //   dispatch({ type: DELETE_ORDER_RESET });
    }

    // dispatch(getAllOrders());
    // setLoading(true)
    const response = await axios.get("/api/v1/admin/orders")
    setOrders(response.data.orders)

  }, []);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.4,
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
          <Fragment>
            <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteOrderHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

//   console.log(orders)

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL ORDERS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL ORDERS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default OrderList;