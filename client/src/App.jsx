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
import OrderSuccess from './components/Cart/OrderSuccess'
import MyOrders from './components/Order/MyOrders'
import OrderDetails from './components/Order/OrderDetails'
import Dashboard from './components/Admin/Dashboard'
import ProductList from './components/Admin/ProductList'
import NewProduct from './components/Admin/NewProduct'
import UpdateProduct from './components/Admin/UpdateProduct'
import OrderList from './components/Admin/OrderList'
import ProcessOrder from './components/Admin/ProcessOrder'
import UsersList from './components/Admin/UserList'
import UpdateUser from './components/Admin/UpdateUser'

import { baseUrl } from './constants/BaseUrl'
import ProductReviews from './components/Admin/ProductReviews'

const App = () => {


  const API_URI = `{baseUrl}/api/v1`;

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
            {<Route path="/success" element={<ProtectedRoute><OrderSuccess/></ProtectedRoute>}></Route>}
            {<Route path="/orders" element={<ProtectedRoute><MyOrders/></ProtectedRoute>}></Route>}
            {<Route path="/order/:id" element={<ProtectedRoute><OrderDetails/></ProtectedRoute>}></Route>}
            <Route path="/account" element={<ProtectedRoute><Profile /></ProtectedRoute>}></Route>
            <Route path="/me/update" element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>}></Route>
            <Route path="/password/update" element={<ProtectedRoute><UpdatePassword /></ProtectedRoute>}></Route>
            <Route path='/password/forgot' element={<ForgotPassword />}></Route>
            <Route path='/password/reset/:token' element={<ResetPassword />}></Route>
            <Route path="/login" element={<LoginSignUp />}></Route>
            <Route path="/admin/dashboard" element={<ProtectedRoute isAdmin={true}><Dashboard /></ProtectedRoute>}></Route>
            <Route path="/admin/products" element={<ProtectedRoute isAdmin={true}><ProductList /></ProtectedRoute>}></Route>
            <Route path="/admin/product" element={<ProtectedRoute isAdmin={true}><NewProduct /></ProtectedRoute>}></Route>
            <Route path="/admin/product/:id" element={<ProtectedRoute isAdmin={true}><UpdateProduct /></ProtectedRoute>}></Route>
            <Route path="/admin/orders" element={<ProtectedRoute isAdmin={true}><OrderList /></ProtectedRoute>}></Route>
            <Route path="/admin/orders/:id" element={<ProtectedRoute isAdmin={true}><ProcessOrder /></ProtectedRoute>}></Route>
            <Route path="/admin/users" element={<ProtectedRoute isAdmin={true}><UsersList /></ProtectedRoute>}></Route>
            <Route path="/admin/user/:id" element={<ProtectedRoute isAdmin={true}><UpdateUser /></ProtectedRoute>}></Route>
            <Route path="/admin/reviews" element={<ProtectedRoute isAdmin={true}><ProductReviews /></ProtectedRoute>}></Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </>
  )
}

export default App