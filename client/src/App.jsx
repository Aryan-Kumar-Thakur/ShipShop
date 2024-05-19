import React, { useEffect } from 'react'
import webFont from "webfontloader"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
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

const App = () => {

  useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    })

    store.dispatch(loadUser());
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
            <Route path='/cart' element={<Cart/>}></Route>
            <Route path="/login/shipping" element={<ProtectedRoute><Shipping /></ProtectedRoute>}></Route>
            <Route path="/order/confirm" element={<ConfirmOrder />}></Route>
            <Route path="/login/shipping" element={<ProtectedRoute><Shipping /></ProtectedRoute>}></Route>
            <Route path="/account" element={<ProtectedRoute><Profile /></ProtectedRoute>}></Route>
            <Route path="/me/update" element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>}></Route>
            <Route path="/password/update" element={<ProtectedRoute><UpdatePassword /></ProtectedRoute>}></Route>
            <Route path='/password/forgot' element={<ForgotPassword/>}></Route>
            <Route path='/password/reset/:token' element={<ResetPassword/>}></Route>
            <Route path="/login" element={<LoginSignUp />}></Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </>
  )
}

export default App