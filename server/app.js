import express from 'express'
import cookieParser from "cookie-parser";
import errorMiddleware from './middleware/error.js';
import cors from "cors"
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import dotenv from 'dotenv'
import path from 'path';


if (process.env.NODE_ENV !== "PRODUCTION") {
    dotenv.config({ path: "config/config.env" })
}
else {
    dotenv.config()
}

const app=express();

app.use(cookieParser())
app.use(express.json({limit: "500mb"}))
app.use(bodyParser.urlencoded({limit: "500mb"}))
app.use(fileUpload())


app.use(cors({
    origin: [process.env.FRONTEND_URL], //allow request only from these site
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true, //for getting cookies and other headers from backend
}))


//Route Import
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'

app.use("/api/v1",productRoutes)
app.use("/api/v1",userRoutes)
app.use("/api/v1",orderRoutes)
app.use("/api/v1",paymentRoutes)

app.get("/",(req,res)=>{
    res.send("welcome to home page")
})

// Middleware for error

app.use(errorMiddleware)

export default app;