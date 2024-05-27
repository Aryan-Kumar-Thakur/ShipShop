import React, { useEffect, useState, useRef } from 'react'
import webFont from "webfontloader"
import { BrowserRouter, Routes, Route, useSearchParams } from 'react-router-dom'
import Header from "./components/layout/Header/Header"
import Footer from "./components/layout/Footer/Footer"
import Home from './components/Home/Home'
import Contact from '../Pages/Contact'
import Products from './components/Product/Products'
import ProductDetails from './components/Product/ProductDetails'
import Search from './components/Product/Search'
import LoginSignUp from './components/User/LoginSignUp'
import store from "./store/store"
import { loadUser } from './actions/userActions'
import { useSelector } from 'react-redux'
import Profile from './components/User/Profile'
import ProtectedRoute from './components/Route/ProtectedRoute'
import UpdateProfile from './components/User/UpdateProfile'
import UpdatePassword from './components/User/UpdatePassword'
import ForgotPassword from './components/User/ForgotPassword'
import ResetPassword from './components/User/ResetPassword'
import Cart from './components/Cart/Cart'
import Shipping from './components/Cart/Shipping'
import ConfirmOrder from './components/Cart/ConfirmOrder'
import axios from 'axios'
import Payment from './components/Cart/Payment'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const App = () => {


  const API_URI = "http://localhost:8000/api/v1";

  const [stripeApiKey, setStripeApiKey] = useState("");

  const getStripeApiKey = async () => {
    const { data } = await axios.get(`${API_URI}/stripeapikey`,{
      withCredentials: true
  })
    setStripeApiKey(data.stripeApiKey)
  }

  const PaymentWrapper = () => {
    if (!stripeApiKey) return null;

    const stripePromise = loadStripe(stripeApiKey);

    return (
      <Elements stripe={stripePromise}>
        <Payment />
      </Elements>
    );
  }

  useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    })

    store.dispatch(loadUser());

    getStripeApiKey();
  }, [])


  return (
    <>
      <div className="body">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/product/:id" element={<ProductDetails />}></Route>
            <Route path="/products" element={<Products />}></Route>
            <Route path="/products/:keyword" element={<Products />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
            <Route path="/about" element={<Header />}></Route>
            <Route path="/search" element={<Search />}></Route>
            <Route path='/cart' element={<Cart />}></Route>
            <Route path="/login/shipping" element={<ProtectedRoute><Shipping /></ProtectedRoute>}></Route>
            <Route path="/order/confirm" element={<ConfirmOrder />}></Route>
            {stripeApiKey && <Route path="/process/payment" element={<ProtectedRoute><PaymentWrapper /></ProtectedRoute>}></Route>}
            <Route path="/account" element={<ProtectedRoute><Profile /></ProtectedRoute>}></Route>
            <Route path="/me/update" element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>}></Route>
            <Route path="/password/update" element={<ProtectedRoute><UpdatePassword /></ProtectedRoute>}></Route>
            <Route path='/password/forgot' element={<ForgotPassword />}></Route>
            <Route path='/password/reset/:token' element={<ResetPassword />}></Route>
            <Route path="/login" element={<LoginSignUp />}></Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </>
  )
}

export default App