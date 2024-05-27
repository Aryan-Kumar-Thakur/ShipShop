import React, { useEffect, useState } from 'react'
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../../../node_modules/bootstrap/dist/js/bootstrap.min.js"
import "./productDetails.css"
import { useSelector, useDispatch } from 'react-redux'
import { getProductsDetails } from '../../actions/productActions.jsx'
import { useParams } from 'react-router-dom';
import ReactStars from "react-rating-stars-component"
import ReviewCard from './ReviewCard.jsx'
import Loader from '../layout/loader/Loader.jsx'
import { useAlert } from "react-alert"
import { CLEAR_ERRORS, NEW_REVIEW_RESET } from '../../slice/productSlice.jsx'
import MetaData from '../layout/MetaData.jsx'
import { addItemsToCart } from '../../actions/cartActions.jsx'
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Rating } from '@mui/material';
import { newReview } from '../../actions/productActions.jsx'

const productDetails = () => {
  const dispatch = useDispatch();

  const alert = useAlert()

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  )

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  )

  const { id } = useParams();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(CLEAR_ERRORS())
    }
    if (reviewError) {
      alert.error(reviewError);
      dispatch(CLEAR_ERRORS())
    }

    if (success) {
      alert.success("Review Submitted Successfully")
      dispatch(NEW_REVIEW_RESET())
    }

    dispatch(getProductsDetails(id));
  }, [dispatch, id, alert, error, success, reviewError])

  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  }

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  }
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }


  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity))
    alert.success("Item aded to cart")
  }

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true)
  }

  const reviewSubmitHandler = () => {
    const myForm = new FormData();
    myForm.set("rating", rating)
    myForm.set("comment", comment)
    myForm.set("productId", id)
    dispatch(newReview(myForm))
    setOpen(false)
  }


  return (
    <>
      {loading ? (<Loader />) : (
        <>
          <MetaData title={`${product.name} -- Food-IFY`}></MetaData>
          <div className="ProductDetails">
            <div>
              <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                  {product.images &&
                    product.images.map((item, i) => (
                      <div key={i} className="carousel-item active">
                        <img src={item.url} className="d-block w-100" alt="..." />
                      </div>
                    ))}
                  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
            </div>

            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
                <h4>{`From ${product.restaurant}`}</h4>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">({product.numOfReviews} Reviews)</span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className='detailsBlock-3-1'>
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly value={quantity} type="number" />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button disabled={product.stock < 1 ? true : false} onClick={addToCartHandler}>Add to Cart</button>
                </div>
                <p>
                  Status:{` `}
                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {product.stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>
              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>
              <button className='submitReview' onClick={submitReviewToggle}>Submit Review</button>
            </div>
          </div>

          <h3 className='reviewReading'>REVIEWS</h3>

          <Dialog aria-labelledby='simple-dialog-title' open={open} onClose={submitReviewToggle}>
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className='submitDialog'>
              <Rating onChange={(e) => setRating(e.target.value)}
                value={rating} size='large'
              />
              <textarea className='submitDialogTextArea' cols="30" rows="5"
                value={comment} onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color='secondary'>Cancel</Button>
              <Button onClick={reviewSubmitHandler} color='primary'>Submit</Button>
            </DialogActions>
          </Dialog>
          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => <ReviewCard key={review._id} review={review} />)}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </>
      )}
    </>
  )
}

export default productDetails