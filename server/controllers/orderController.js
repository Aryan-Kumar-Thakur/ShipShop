import Order from "../models/orderModel.js";
import Product from "../models/productModel.js"
import User from "../models/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "../middleware/catchAsyncError.js";

// Create new order

const newOrder = catchAsyncError(async (req, res, next) => {
    const { shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
    })

    res.status(201).json({
        success: true,
        order
    })
})

//get single order

const getSingleOrder = catchAsyncError(async (req, res, next) => {


    const order = await Order.findById(req.params.id).populate("user", "name email")

    if (!order) {
        return next(new ErrorHandler("order not found with this id", 404));
    }

    res.status(200).json({
        success: true,
        order
    })
})

//get logged in user order

const getMyOrders = catchAsyncError(async (req, res, next) => {


    const orders = await Order.find({ user: req.user._id })


    res.status(200).json({
        success: true,
        orders
    })
})

// get all orders by admin

const getAllOrders = catchAsyncError(async (req, res, next) => {

    const orders = await Order.find()

    let totalAmount = 0;

    orders.forEach(order => {
        totalAmount += order.totalPrice
    })

    res.status(200).json({
        success: true,
        orders,
        totalAmount
    })
})

//update order status

const updateOrder = catchAsyncError(async (req, res, next) => {

    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("order not found with this id", 404));
    }

    if (order.orderStatus == "Delivered") {
        return next(new ErrorHandler("You have already delivered this order", 404));
    }

    order.orderStatus = req.body.status;

    if(req.body.status === "Shipped"){
        order.orderItems.forEach(async (o) => {
            await updateStock(o.product, o.quantity);
        })
    }

    if (req.body.status === "Delievered") {
        order.deliveredAt = Date.now();
    }

    await order.save({validateBeforeSave:false})
    res.status(200).json({
        success: true,
        order
    })
})

async function updateStock(id,quantity){
    const product = await Product.findById(id);

    product.stock-=quantity;

    await product.save({validateBeforeSave:false})
}

// get all orders by admin

const deleteOrders = catchAsyncError(async (req, res, next) => {

    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("order not found with this id", 404));
    }

    await Order.findByIdAndDelete(req.params.id)

    res.status(200).json({
        success: true,
        message: "order deleted successfully"
    })
})

export { newOrder, getSingleOrder, getMyOrders, getAllOrders , updateOrder , deleteOrders }