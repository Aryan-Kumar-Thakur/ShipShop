import express from 'express'
import cookieParser from "cookie-parser";
import errorMiddleware from './middleware/error.js';
import cors from "cors"

const app=express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json())
app.use(cookieParser())


//Route Import
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js'

app.use("/api/v1",productRoutes)
app.use("/api/v1",userRoutes)
app.use("/api/v1",orderRoutes)

// Middleware for error

app.use(errorMiddleware)

export default app;