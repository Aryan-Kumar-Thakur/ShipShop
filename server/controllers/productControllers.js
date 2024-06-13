import Product from "../models/productModel.js"
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import ApiFeatures from "../utils/apiFeatures.js";
import cloudinary from "cloudinary"

// Create Product --> Admin
const createProduct = catchAsyncError(async (req, res, next) => {

    // console.log(req.body)

    let images = []

    if (typeof (req.body.images) === "string") {
        images.push(req.body.images)
    }
    else {
        images = req.body.images
    }

    const imagesLink = []

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "products",
        })

        imagesLink.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }

    req.body.images = imagesLink
    req.body.user = req.user.id
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
})

//get all products
const getAllproducts = catchAsyncError(async (req, res, next) => {

    const resultPerPage = 8;
    const productsCount = await Product.countDocuments()

    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()

    let products = await apiFeature.query

    let filteredProductsCount = products.length;

    apiFeature.pagination(resultPerPage)

    products = await apiFeature.query.clone()

    res.status(200).json({
        success: true,
        products,
        productsCount,
        resultPerPage,
        filteredProductsCount,
    })
})

//get all products -- Admin
const getAdminproducts = catchAsyncError(async (req, res, next) => {

    const products = await Product.find()
    res.status(200).json({
        success: true,
        products
    })
})

//Update product --> Admin

const updateProduct = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id)
    if (!product) {
        return next(new ErrorHandler("product not found", 404))
    }

    //Images start here

    let images = []

    if (typeof (req.body.images) === "string") {
        images.push(req.body.images)
    }
    else {
        images = req.body.images
    }

    if (images !== undefined) {
        // Delete Image from cloudinary
        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id)
        }

        const imagesLink = []


        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "products",
            })

            imagesLink.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }

        req.body.images = imagesLink
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

//Delete product --> Admin

const deleteProduct = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id)
    if (!product) {
        return next(new ErrorHandler("product not found", 404))
    }

    //Deleting Images from Cloudinary
    for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id)
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


export default getAllproducts
export { getAdminproducts, createProduct, updateProduct, deleteProduct, getSingleProduct, createProductReview, getAllProductReview, deleteProductReview }