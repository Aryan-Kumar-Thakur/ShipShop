import Product from "../models/productModel.js"
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import ApiFeatures from "../utils/apiFeatures.js";

// Create Product --> Admin
const createProduct = catchAsyncError(async (req, res, next) => {

    req.body.user = req.user.id
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
})

//get all products
const getAllproduct = catchAsyncError(async (req, res, next) => {

    const resultPerPage = 8;
    const productCount = await Product.countDocuments()

    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination()
    let products = await apiFeature.query
    // let filteredProductsCount = products.length;
    // apiFeature.pagination(resultPerPage)
    // products = await apiFeature.query
    res.status(200).json({
        success: true,
        products,
        productCount,
        resultPerPage,
        // filteredProductsCount,
    })
})

//Update product --> Admin

const updateProduct = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id)
    if (!product) {
        return next(new ErrorHandler("product not found", 404))
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidator: true,
        useFindAndModefy: false
    })

    res.status(200).json({
        success: true,
        product
    })
})

//Delet product --> Admin

const deleteProduct = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id)
    if (!product) {
        return next(new ErrorHandler("product not found", 404))
    }
    product = await Product.findByIdAndDelete(req.params.id)
    res.status(200).json({
        success: true,
        message: "Product Deleted Successfully"
    })
})

// get single product 

const getSingleProduct = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id)
    if (!product) {
        return next(new ErrorHandler("product not found", 404))
    }
    product = await Product.findById(req.params.id)
    res.status(200).json({
        success: true,
        product
    })
})

// create new Review or Update Review

const createProductReview = catchAsyncError(async (req, res, next) => {

    const { rating, comment, productId } = req.body

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    }

    const product = await Product.findById(productId)

    const isReviewed = product.reviews.find(rev => rev.user.toString() === req.user._id.toString())

    if (isReviewed) {
        product.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString()) {
                rev.rating = rating,
                    rev.comment = comment
            }
        })
    }
    else {
        product.reviews.push(review)
        product.numOfReviews = product.reviews.length
    }
    let avg = 0;
    product.reviews.forEach(rev => {
        avg += rev.rating
    })

    product.ratings = avg / product.reviews.length

    await product.save({ validateBeforeSave: false })

    res.status(200).json({
        success: true,
        product
    })
})

//Get all reviews of a product

const getAllProductReview = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    if (!product) {
        return next(new ErrorHandler("product not found", 404))
    }
    res.status(200).json({
        success: true,
        reviews: product.reviews
    })

})

// Delete a review

const deleteProductReview = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.productID);

    if (!product) {
        return next(new ErrorHandler("product not found", 404))
    }

    const reviews = product.reviews.filter((rev) => rev._id.toString() !== req.query.id.toString())

    let avg = 0;
    reviews.forEach((rev) => {
        avg += rev.rating
    })

    const ratings = avg / reviews.length

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(req.query.productID, {
        reviews, ratings, numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModefy: false
    })

    res.status(200).json({
        success: true,
        product
    })

})


export default getAllproduct
export { createProduct, updateProduct, deleteProduct, getSingleProduct, createProductReview, getAllProductReview, deleteProductReview }