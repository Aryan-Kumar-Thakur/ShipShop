import React, { useEffect, useState } from 'react'
import "./products.css"
import { useSelector, useDispatch } from "react-redux"
import { clearErrors, getProducts } from '../../actions/productActions'
import Loader from '../layout/loader/Loader'
import ProductCard from '../Home/ProductCard'
import { useParams } from 'react-router-dom'
import Pagination from "react-js-pagination"
import Slider from '@mui/material/Slider';
import { Typography } from '@mui/material'
import { useAlert } from "react-alert"
import { CLEAR_ERRORS } from '../../slice/productSlice'
import MetaData from '../layout/MetaData'

const categories = [
    "All",
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
];

const Products = () => {
    const dispatch = useDispatch();
    const alert = useAlert()

    const [currentPage, setcurrentPage] = useState(1)
    const [price, setPrice] = useState([0, 100000]);
    const [category, setCategory] = useState('');
    const [ratings, setRating] = useState(0)

    const { products, loading, error, productsCount, resultPerPage, filteredProductsCount } = useSelector(state => state.products)
    const { keyword } = useParams()


    const setCurrentPageNo = (e) => {
        setcurrentPage(e);
    }

    const priceHandler = (e, newPrice) => {
        setPrice(newPrice)
    }


    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(CLEAR_ERRORS())
        }
        dispatch(getProducts(keyword, currentPage, price, category, ratings))
    }, [dispatch, keyword, error, currentPage, price, category, ratings])

    let count = filteredProductsCount
    return (
        <>
            {loading ? <Loader /> :
                <>
                <MetaData title="PRODUCTS -- SHIPSHOP"></MetaData>
                    <div className="products-page">
                        <h2 className="productsHeading">Products</h2>
                        <div className="products">
                            {products &&
                                products.map((product) => (
                                    <ProductCard key={product._id} product={product} />
                                ))}
                        </div>

                        <div className="filterBox">
                            <Typography>Price</Typography>
                            <Slider
                                value={price}
                                onChange={priceHandler}
                                valueLabelDisplay='auto'
                                aria-labelledby="range-slider"
                                min={0}
                                max={100000}
                            ></Slider>
                            <Typography>Categories</Typography>
                            <ul className="categoryBox">
                                {categories.map((category) => (
                                    <li
                                        className="category-link"
                                        key={category}
                                        onClick={() => setCategory(category)}
                                    >
                                        {category}
                                    </li>
                                ))}
                            </ul>
                            <fieldset>
                                <Typography component="legend">Ratings Above</Typography>
                                <div className="ratingFilter">
                                    <Slider value={ratings}
                                        onChange={(e, newRating) => { setRating(newRating) }}
                                        aria-labelledby='continuous-slider'
                                        valueLabelDisplay="auto"
                                        min={0}
                                        max={5}
                                    >
                                    </Slider>
                                </div>
                            </fieldset>
                        </div>

                        {resultPerPage < count && (
                            <div className="paginationBox">
                                <Pagination
                                    activePage={currentPage}
                                    itemsCountPerPage={resultPerPage}
                                    totalItemsCount={productsCount}
                                    onChange={setCurrentPageNo}
                                    nextPageText="Next"
                                    prevPageText="Prev"
                                    firstPageText="1st"
                                    lastPageText="Last"
                                    itemClass="page-item"
                                    linkClass="page-link"
                                    activeClass="pageItemActive"
                                    activeLinkClass="pageLinkActive"
                                />
                            </div>
                        )}
                    </div>
                </>
            }
        </>
    )
}

export default Products