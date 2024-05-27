import React, { useState, useRef, useEffect } from 'react'
import "./payment.css"
import MetaData from '../layout/MetaData'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from "react-alert";
import { useNavigate } from 'react-router-dom'
import CheckoutSteps from './CheckoutSteps'
import { Typography } from '@mui/material';
import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements } from '@stripe/react-stripe-js'
import axios from 'axios';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EventIcon from '@mui/icons-material/Event';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { createOrder , clearErrors } from '../../actions/orderActions';


const Payment = () => {

    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"))

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const alert = useAlert()
    const stripe = useStripe()
    const elements = useElements()
    const payBtn = useRef(null)

    const { shippingInfo, cartItems } = useSelector((state) => state.cart)
    const { user } = useSelector((state) => state.user)
    const { error } = useSelector((state) => state.newOrder)

    const API_URI = "http://localhost:8000/api/v1";

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100),
        description: "Payment at Food-IFY",
    }

    const order = {
        shippingInfo,
        orderItems: cartItems,
        itemPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice
    }

    // indian card number :  4000003560000008

    const submitHandler = async (e) => {
        e.preventDefault();
        payBtn.current.disabled = true;
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true
            }
            const { data } = await axios.post(
                `${API_URI}/process/payment`,
                paymentData,
                config
            )

            const client_secret = data.client_secret;

            console.log(client_secret)

            if (!stripe || !elements) return;

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.pinCode,
                            country: shippingInfo.country,
                        },
                    },
                },
            });

            if (result.error) {
                payBtn.current.disabled = false;
                // console.log(result.error.message)
                alert.error(result.error.message)
            }
            else {
                console.log(result.paymentIntent.status)
                if (result.paymentIntent.status === "succeeded") {
                    order.paymentInfo={
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                    }
                    dispatch(createOrder(order))
                    navigate("/success")
                }
                else {
                    alert.error("There is some Issue while Processing Payment")
                }
            }

        } catch (error) {
            payBtn.current.disabled = false;
            alert.error(error)
        }
    }

    useEffect(()=>{
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
    },[dispatch,error,alert])

    return (
        <>
            <MetaData title="Payment -- Food-IFY" />
            <CheckoutSteps activeStep={2} />
            <div className="paymentContainer">
                <form className='paymentForm' onSubmit={(e) => submitHandler(e)}>
                    <Typography>Card Info</Typography>
                    <div>
                        <CreditCardIcon />
                        <CardNumberElement className='paymentInput' />
                    </div>
                    <div>
                        <EventIcon />
                        <CardExpiryElement className='paymentInput' />
                    </div>
                    <div>
                        <VpnKeyIcon />
                        <CardCvcElement className='paymentInput' />
                    </div>
                    <input type="submit" value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
                        ref={payBtn} className='paymentFormBtn' />

                </form>
            </div>
        </>
    )
}

export default Payment