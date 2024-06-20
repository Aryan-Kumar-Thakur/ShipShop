import React, { useEffect, useState } from "react";
import { DataGrid, renderActionsCell } from '@mui/x-data-grid';
import "./productReviews.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getAllReviews, deleteReviews } from "../../actions/productActions";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import SideBar from "./Sidebar";
import { DELETE_REVIEW_RESET } from "../../slice/productSlice";

const ProductReviews = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate()

  const { error, reviews, loading } = useSelector((state) => state.productReviews)

  const { error: deleteError, isDeleted } = useSelector((state) => state.review)

  // console.log(isDeleted)

  const [productId, setProductId] = useState("")

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReviews(reviewId, productId));
  }

  const productReviewSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId))
  }


  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
    }
    if (error) {
      alert.error(error)
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(deleteError)
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success("Review Deleted Successfully")
      navigate("/admin/reviews")
      dispatch(DELETE_REVIEW_RESET())
    }
  }, [error, dispatch, alert, deleteError, isDeleted, navigate, productId])

  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },
    { field: "user", headerName: "User", minWidth: 200, flex: 0.6 },
    { field: "comment", headerName: "Comment", minWidth: 350, flex: 1 },
    {
      field: "rating", headerName: "Rating", type: Number, minWidth: 180, flex: 0.4,
      cellClassName: (params) => {
        return params.value >= 3
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "actions", headerName: "Actions", type: Number, minWidth: 150, flex: 0.3, sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => deleteReviewHandler(params.id)}><DeleteIcon /></Button>
          </>
        )
      }
    },
  ]

  const rows = [];

  reviews &&
    reviews.forEach((item, index) => {
      rows.push({
        key: index,
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name
      })
    })
  return (
    <>
      <MetaData title={"ALL REVIEWS --Admin"} />
      <div className="dashboard">
        <SideBar />
        <div className="productReviewsContainer">

          <form
            className="productReviewsForm"
            onSubmit={productReviewSubmitHandler}
          >
            <h1 className="productReviewsFormHeading">All REVIEWS</h1>

            <div>
              <StarIcon />
              <input
                type="text"
                placeholder="Product ID"
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
              SEARCH
            </Button>
          </form>

          {reviews && reviews.length > 0 ? <DataGrid rows={rows} columns={columns} pageSizeOptions={[10]}
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            disableRowSelectionOnClick
            className="productListTable" autoHeight /> :
            <h1 className="productReviewFormHeading">No Reviews Found</h1>}
        </div>
      </div>
    </>
  )
}

export default ProductReviews