import express from 'express'
import cookieParser from "cookie-parser";
import errorMiddleware from './middleware/error.js';
import cors from "cors"
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import dotenv from 'dotenv'


dotenv.config({path:'server/config/config.env'})

const app=express();

app.use(cookieParser())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(fileUpload())

app.use(cors({
    origin: 'http://localhost:5173', //allow request only from these site
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true, //for getting cookies and other headers from backend
    samesite : "none",
    secure: true,
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

// Middleware for error

app.use(errorMiddleware)

export default app;