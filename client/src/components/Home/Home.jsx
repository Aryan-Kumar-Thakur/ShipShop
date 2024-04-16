import React, { useEffect } from 'react'
import "./home.css"
import { CgMouse } from "react-icons/cg"
import Product from './Product'
import MetaData from '../layout/MetaData'
import { getProducts } from '../../actions/productActions'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../layout/loader/Loader'
import { useAlert } from 'react-alert'


const Home = () => {

  const alert = useAlert()
  const dispatch = useDispatch()
  const { loading, error, products, productCount } = useSelector(
    (state) => state.products
  )

  useEffect(() => {
    if(error){
      return alert.error(error)
    }
    dispatch(getProducts())
  }, [dispatch, error, alert])

  return (
    <>
      {loading ? <Loader/> :
        <>
          <MetaData title="ShipSHop" />
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
              <Product product={product} />
            ))}
          </div>
        </>
      }
    </>
  )
}

export default Home