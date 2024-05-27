import catchAsyncError from "../middleware/catchAsyncError.js";
import Stripe from "stripe";
import dotenv from 'dotenv'

dotenv.config({ path: 'server/config/config.env' })


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// console.log(stripe)

const processPayment = catchAsyncError(async (req, res, next) => {
    const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        description: req.body.description,
        currency: "inr",
        metadata: {
            company: 'Food-IFY',
        },
    })
    // console.log(myPayment)
    res.status(200).json({
        success: true,
        client_secret: myPayment.client_secret
    })
})

const sendStripeApiKey = catchAsyncError(async (req, res, next) => {
    res.status(200).json({
        success: true,
        stripeApiKey: process.env.STRIPE_API_KEY,
    })
})

export { processPayment, sendStripeApiKey };
