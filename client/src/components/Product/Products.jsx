import React, { useEffect } from 'react'
import "./products.css"
import {useSelector , useDispatch} from "react-redux"
import { clearErrors , getProducts } from '../../actions/productActions'
import Loader from '../layout/loader/Loader'
import ProductCard from '../Home/ProductCard'

const Products = () => {
    const dispatch = useDispatch();

    const {products , loading , error , productsCount , resultPerPage} = useSelector(state => state.products)
    useEffect(()=>{
        dispatch(getProducts())
    },[dispatch , error])
  return (
    <>
        {loading ? <Loader/> : 
        <>
        <h2 className="productsHeading">Products</h2>
        <div className="products">
            {products &&
             products.map((product) => (
                <ProductCard key={product._id} product={product}/>
             ))}
        </div>
        </>
        }
    </>
  )
}

export default Products