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
// import UserOptions from './components/layout/Header/UserOptions'

const App = () => {

  useEffect(()=>{
    webFont.load({
      google:{
        families: ["Roboto","Droid Sans","Chilanka"]
      }
    })

    store.dispatch(loadUser());
  },[])

  return (
    <>
      <div className="body">
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/product/:id" element={<ProductDetails/>}></Route>
          <Route path="/products" element={<Products/>}></Route>
          <Route path="/products/:keyword" element={<Products/>}></Route>
          <Route path="/contact" element={<Contact/>}></Route>
          <Route path="/about" element={<Header/>}></Route>
          <Route path="/search" element={<Search/>}></Route>
          <Route path="/cart" element={<Header/>}></Route>
          <Route path="/login" element={<LoginSignUp/>}></Route>
          <Route path="/password/forgot" element={<LoginSignUp/>}></Route>
        </Routes>
        <Footer/>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App