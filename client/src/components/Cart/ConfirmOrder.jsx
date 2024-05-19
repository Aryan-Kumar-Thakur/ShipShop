import React, { useState } from 'react'
import "./confirmOrder.css"
import MetaData from '../layout/MetaData'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from "react-alert";
import { useNavigate } from 'react-router-dom'
import CheckoutSteps from './CheckoutSteps'
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

const ConfirmOrder = () => {
    const { shippingInfo, cartItems } = useSelector((state) => state.cart)
    const { user } = useSelector((state) => state.user)
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
                                <span>{user.phoneNo}</span>
                            </div>
                            <div>
                                <p>Address:</p>
                                <span>{address}</span>
                            </div>
                        </div>
                        <div className="confirmCartItems">
                            <Typography>Your Cart Items:</Typography>
                            <div className="confirmCartItemsContainer">
                                {cartItems && cartItems.map((item)=>(
                                    <div key={item.product}>
                                        <img src={item.image} alt="Product" />
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        <span>
                                            {item.quantity} X ₹{item.price} =
                                            <b>₹{item.price*item.quantity}</b>
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div>

                </div>
            </div>
        </>
    )
}

export default ConfirmOrder