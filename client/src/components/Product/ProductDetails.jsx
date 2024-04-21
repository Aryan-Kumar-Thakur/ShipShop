import React, { useEffect } from 'react'
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../../../node_modules/bootstrap/dist/js/bootstrap.min.js"
import "./productDetails.css"
import { useSelector, useDispatch } from 'react-redux'
import { getProductsDetails } from '../../actions/productActions.jsx'
import { useParams } from 'react-router-dom';
import ReactStars from "react-rating-stars-component"
import ReviewCard from './ReviewCard.jsx'
import Loader from '../layout/loader/Loader.jsx'
import {useAlert} from "react-alert"
import { CLEAR_ERRORS } from '../../slice/productSlice.jsx'

const productDetails = () => {
  const dispatch = useDispatch();

  const alert = useAlert()

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  )

  const { id } = useParams();

  console.log(id)

  useEffect(() => {
    if(error){
      alert.error(error);
      dispatch(CLEAR_ERRORS())
    }
    dispatch(getProductsDetails(id));
  }, [dispatch, id, alert, error])

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  }


  return (
    <>
      {loading ? (<Loader />) : (
        <>
          <div className="ProductDetails">
            <div>
              <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                  {product.images &&
                    product.images.map((item, i) => (
                      <div className="carousel-item active">
                        <img src={item.url} className="d-block w-100" alt="..." />
                      </div>
                    ))}
                  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                  </button>
                  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
            </div>

            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <ReactStars {...options} />
                <span className="detailsBlock-2-span">({product.numOfReviews} Reviews)</span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className='detailsBlock-3-1'>
                  <div className="detailsBlock-3-1-1">
                    <button>-</button>
                    <input value="1" type="number" />
                    <button>+</button>
                  </div>
                  <button>Add to Cart</button>
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
              <button className='submitReview'>Submit Review</button>
            </div>
          </div>

          <h3 className='reviewReading'>REVIEWS</h3>
          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => <ReviewCard review={review} />)}
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