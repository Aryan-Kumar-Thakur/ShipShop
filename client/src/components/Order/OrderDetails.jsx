import React, { useEffect } from 'react'
import "./orderDetails.css"
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getOrderDetails } from '../../actions/orderActions';
import Loader from '../layout/loader/Loader';
import { Link, useNavigate } from 'react-router-dom';
import { types, useAlert } from 'react-alert';
import { Typography } from '@material-ui/core';
import MetaData from '../layout/MetaData';
import LaunchIcon from '@mui/icons-material/Launch';
import { useParams } from 'react-router-dom';

const OrderDetails = () => {
  const alert = useAlert()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { order, error, loading } = useSelector((state) => state.orderDetails)
  const { id } = useParams();

  // console.log(order)

  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    dispatch(getOrderDetails(id))
  }, [error, dispatch, alert, id])
  return (
    <>
      <>
        {loading ? <Loader /> : (
          <>
            <MetaData title="Order Details" />
            <div className="orderDetailsPage">
              <div className="orderDetailsContainer">
                <Typography component="h1">
                  Order #{order && order._id}
                </Typography>
                <Typography>Shipping Info</Typography>
                <div className="orderDetailsContainerBox">
                  <div>
                    <p>Name:</p>
                    <span>{order.user && order.user.name}</span>
                  </div>
                  <div>
                    <p>Phone:</p>
                    <span>{order.shippingInfo && order.shippingInfo.phoneNo}</span>
                  </div>
                  <div>
                    <p>Address:</p>
                    <span>{order.shippingInfo &&
                      `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`
                    }</span>
                  </div>
                </div>
                <Typography>Payment</Typography>
                <div className="orderDetailsContainerBox">
                  <div>
                    <p className={order.paymentInfo && order.paymentInfo.status === "succeded" ? "greenColor" : "redColor"}>
                      {order.paymentInfo && order.paymentInfo.status === "succeded" ? "PAID" : "NOT PAID"}
                    </p>
                  </div>
                  <div>
                    <p>Amount:</p>
                    <span>{order.totalPrice && order.totalPrice}</span>
                  </div>
                </div>
                <Typography>Order Status</Typography>
                <div className="orderDetailsContainerBox">
                  <div>
                    <p className={order.orderStatus && order.orderStatus === "Delivered" ? "greenColor" : "redColor"}>
                      {order.orderStatus && order.orderStatus}
                    </p>
                  </div>
                </div>
                <div className="orderDetailsCartItems">
                  <Typography>Order Items:</Typography>
                  <div className="orderDetailsCartItemsContainer">
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <div key={item.product}>
                          <img src={item.image} alt="Product" />
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                          <span>
                            {item.quantity} X ₹{item.price} =
                            <b> ₹{item.price * item.quantity}</b>
                          </span>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </>
    </>
  )
}

export default OrderDetails