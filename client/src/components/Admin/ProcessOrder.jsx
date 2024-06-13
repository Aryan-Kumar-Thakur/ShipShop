import React, { useEffect, useState } from 'react'
import "./processOrder.css"
import MetaData from '../layout/MetaData'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from "react-alert";
import { Navigate, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import SideBar from "./Sidebar";
import { getOrderDetails, clearErrors, updateOrder } from '../../actions/orderActions';
import { useParams } from 'react-router-dom';
import Loader from '../layout/loader/Loader';
import { Button } from "@material-ui/core";
import { UPDATE_ORDER_RESET } from '../../slice/orderSlice';

const ProcessOrder = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const alert = useAlert()

  const { order, error, loading } = useSelector((state) => state.orderDetails)
  const { error: updateError, isUpdated } = useSelector((state) => state.order);

  const { id } = useParams()

  const [status, setStatus] = useState("")

  const updateProcessSubmitHandler = (e) => {
    e.preventDefault()

    const myForm = new FormData();

    myForm.set("status",status)

    dispatch(updateOrder(id,myForm))
  }

  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    if (updateError) {
      alert.error(updateError)
    }
    if(isUpdated) {

      alert.success("Order Updated Successfully");
      dispatch(UPDATE_ORDER_RESET())
      navigate("/admin/orders")
    }
    dispatch(getOrderDetails(id))
  }, [error, dispatch, alert, id, isUpdated, updateError])



  return (
    <>
      <MetaData title="Process Order" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {loading ? <Loader /> : (
            <div className="confirmOrderPage"
            style={{
                display: order.orderStatus === "delivered" ? "block" : "grid",
              }}>
              <div>
                <div className="confirmshippingArea">
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
                      <p className={order.orderStatus && order.orderStatus === "delivered" ? "greenColor" : "redColor"}>
                        {order.orderStatus && order.orderStatus}
                      </p>
                    </div>
                  </div>
                  <div className="confirmCartItems">
                    <Typography>Your Cart Items:</Typography>
                    <div className="confirmCartItemsContainer">
                      {order.orderItems && order.orderItems.map((item) => (
                        <div key={item.product}>
                          <img src={item.image} alt="Product" />
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                          <span>
                            {item.quantity} X ₹{item.price} =
                            <b> ₹{item.price * item.quantity}</b>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div
              style={{
                  display: order.orderStatus === "delivered" ? "none" : "block",
                }}>
                <form
                  className="updateOrderForm"
                  onSubmit={updateProcessSubmitHandler}
                >
                  <h1>Process Order</h1>
                  <div>
                    <AccountTreeIcon />
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Choose Category</option>
                      {order.orderStatus === "processing" && (
                        <option value="shipped">Shipped</option>
                      )}

                      {order.orderStatus === "shipped" && (
                        <option value="delivered">delivered</option>
                      )}
                    </select>
                  </div>
                  <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={loading ? true : false || status === "" ? true:false}
                  >
                    Update
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

    </>
  )
}

export default ProcessOrder