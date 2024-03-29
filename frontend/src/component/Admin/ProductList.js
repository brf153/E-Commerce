import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   clearErrors,
//   getAdminProduct,
//   deleteProduct,
// } from "../../actions/productAction";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import axios from "../../axios";
// import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";

const ProductList = () => {

    const history = useNavigate()

    const [isDeleted, setDeleted] = useState(false)

    const [products, setProducts] = useState([])
//   const dispatch = useDispatch();

//   const alert = useAlert();

//   const { error, products } = useSelector((state) => state.products);

//   const { error: deleteError, isDeleted } = useSelector(
//     (state) => state.product
//   );

  const deleteProductHandler = async(id) => {
    const response = await axios.delete(`/api/v1/admin/product/${id}`)
    // dispatch(deleteProduct(id));
    console.log(response.data)
    setDeleted(true)

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
    //   alert.success("Product Deleted Successfully");
      setDeleted(false)
      history("/admin/dashboard");
    }

    const response_product = await axios.get("/api/v1/admin/products")
    console.log(response_product)
    setProducts(response_product.data.products)

  }, []);

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 200,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
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
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteProductHandler(params.getValue(params.id, "id"))
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

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.Stock,
        price: item.price,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL PRODUCTS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>

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

export default ProductList;