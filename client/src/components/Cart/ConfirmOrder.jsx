import React, { useState } from 'react'
import "./confirmOrder.css"
import MetaData from '../layout/MetaData'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from "react-alert";
import { Navigate, useNavigate } from 'react-router-dom'
import CheckoutSteps from './CheckoutSteps'
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

const ConfirmOrder = () => {
    const navigate = useNavigate()
    const { shippingInfo, cartItems } = useSelector((state) => state.cart)
    const { user } = useSelector((state) => state.user)

    const subtotal = cartItems.reduce(
        (acc,item)=> acc + item.quantity*item.price,
        0
    )

    const shippingChages = subtotal > 1000? 0 : 30;

    const tax = subtotal*0.05;

    const totalPrice=subtotal+shippingChages+tax;

    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

    const proceedToPayment = ()=>{
        const data={
            subtotal,
            shippingChages,
            tax,
            totalPrice,
        }
        sessionStorage.setItem("orderInfo",JSON.stringify(data));
        navigate("/process/payment")
    }

    return (
        <>
            <MetaData title="confirmOrder -- SHIPSHOP"></MetaData>
            <CheckoutSteps activeStep={1} />
            <div className="confirmOrderPage">
                <div>
                    <div className="confirmshippingArea">
                        <Typography>Shipping Info</Typography>
                        <div className="confirmshippingAreaBox">
                            <div>
                                <p>Name:</p>
                                <span>{user.name}</span>
                            </div>
                            <div>
                                <p>Phone:</p>
                                <span>{shippingInfo.phoneNo}</span>
                            </div>
                            <div>
                                <p>Address:</p>
                                <span>{address}</span>
                            </div>
                        </div>
                        <div className="confirmCartItems">
                            <Typography>Your Cart Items:</Typography>
                            <div className="confirmCartItemsContainer">
                                {cartItems && cartItems.map((item) => (
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
                <div>
                    <div className="orderSummary">
                        <Typography>Order Summary</Typography>
                        <div>
                            <div>
                                <p>Subtotal</p>
                                <span>₹{subtotal}</span>
                            </div>
                            <div>
                                <p>Shipping Charges</p>
                                <span>₹{shippingChages}</span>
                            </div>
                            <div>
                                <p>GST</p>
                                <span>₹{tax}</span>
                            </div>
                        </div>
                        <div className="orderSummaryTotal">
                            <p><b>Total:</b></p>
                            <span>₹{totalPrice}</span>
                        </div>
                        <button onClick={proceedToPayment}>Proceed To Payment</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ConfirmOrder