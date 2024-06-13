import React, { useEffect } from 'react'
import "./home.css"
import { CgMouse } from "react-icons/cg"
import ProductCard from './ProductCard'
import MetaData from '../layout/MetaData'
import { getProducts } from '../../actions/productActions'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../layout/loader/Loader'
import { useAlert } from 'react-alert'
import { CLEAR_ERRORS } from '../../slice/productSlice'


const Home = () => {

  const alert = useAlert()
  const dispatch = useDispatch()
  const { loading, error, products } = useSelector(
    (state) => state.products
  )

  useEffect(() => {
    if(error){
      alert.error(error);
      dispatch(CLEAR_ERRORS())
    }
    dispatch(getProducts())
  }, [dispatch, error, alert])

  return (
    <>
      {loading ? <Loader/> :
        <>
          <MetaData title="SHIPSHOP" />
          <div className="banner">
            <p>Welcome to ShipShop</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>Scroll <CgMouse /></button>
            </a>
          </div>
          <h2 className="homeheading">Featured Products</h2>
          <div className="container" id="container">
            {products && products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </>
      }
    </>
  )
}

export default Home