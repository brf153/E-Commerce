import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productReviews.css";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   clearErrors,
//   getAllReviews,
//   deleteReviews,
// } from "../../actions/productAction";
// import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import DeleteIcon from "@material-ui/icons/Delete";
import Star from "@material-ui/icons/Star";

import SideBar from "./Sidebar";
// import { DELETE_REVIEW_RESET } from "../../constants/productConstants";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";

const ProductReviews = () => {
    const history = useNavigate()
    const [reviews, setReviews] = useState([])
//   const dispatch = useDispatch();

//   const alert = useAlert();

//   const { error: deleteError, isDeleted } = useSelector(
//     (state) => state.review
//   );

//   const { error, reviews, loading } = useSelector(
//     (state) => state.productReviews
//   );

 const [isDeleted, setDeleted] = useState(false)
 const [loading, setLoading] = useState(true)

  const [productId, setProductId] = useState("");

  const deleteReviewHandler = async(reviewId) => {
    const { data } = await axios.delete(
        `/api/v1/reviews?id=${reviewId}&productId=${productId}`
      );
      if(data){
        setDeleted(true)
      }
    // dispatch(deleteReviews(reviewId, productId));
  };

  const productReviewsSubmitHandler = async(e) => {
    e.preventDefault();
    const { data } = await axios.get(`/api/v1/reviews?id=${productId}`);
    setReviews(data.reviews)
    // dispatch(getAllReviews(productId));
  };

  useEffect(async() => {
    if (productId.length === 24) {
        const { data } = await axios.get(`/api/v1/reviews?id=${productId}`);
    //   dispatch(getAllReviews(productId));
    }
    // if (error) {
    //   alert.error(error);
    //   dispatch(clearErrors());
    // }

    // if (deleteError) {
    //   alert.error(deleteError);
    //   dispatch(clearErrors());
    // }

    if (isDeleted) {
      alert.success("Review Deleted Successfully");
      history("/admin/reviews");
      setDeleted(false)
    //   dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [isDeleted, productId]);

  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },

    {
      field: "user",
      headerName: "User",
      minWidth: 200,
      flex: 0.6,
    },

    {
      field: "comment",
      headerName: "Comment",
      minWidth: 350,
      flex: 1,
    },

    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 180,
      flex: 0.4,

      cellClassName: (params) => {
        return params.getValue(params.id, "rating") >= 3
          ? "greenColor"
          : "redColor";
      },
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
            <Button
              onClick={() =>
                deleteReviewHandler(params.getValue(params.id, "id"))
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

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL REVIEWS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productReviewsContainer">
          <form
            className="productReviewsForm"
            onSubmit={productReviewsSubmitHandler}
          >
            <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>

            <div>
              <Star />
              <input
                type="text"
                placeholder="Product Id"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={
                loading ? true : false || productId === "" ? true : false
              }
            >
              Search
            </Button>
          </form>

          {reviews && reviews.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          ) : (
            <h1 className="productReviewsFormHeading">No Reviews Found</h1>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProductReviews;