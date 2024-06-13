import express from 'express'
import cookieParser from "cookie-parser";
import errorMiddleware from './middleware/error.js';
import cors from "cors"
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import dotenv from 'dotenv'
import path from 'path';


if (process.env.NODE_ENV !== "PRODUCTION") {
    dotenv.config({ path: "server/config/config.env" })
}
else {
    dotenv.config()
}

const app=express();

app.use(cookieParser())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(fileUpload())
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/client/dist")));

app.use(cors({
    origin: 'http://localhost:3000', //allow request only from these site
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