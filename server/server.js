import app from './app.js'
import connectDatabase from './config/database.js'
import dotenv from 'dotenv'
import cloudinary from "cloudinary"

//handling uncaught Exception

process.on("uncaughtException",err=>{
    console.log(`Error: ${err.message}`)
    console.log("Shutting down the server due to uncaught Exception")

    server.close(()=>{
        process.exit(1);
    })
})


//config
dotenv.config({path:'server/config/config.env'})

connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET 
})

const server = app.listen(process.env.PORT,()=>{
    console.log(`server is live at port http://localhost:${process.env.PORT}`);
})


//unhandled promise rejection

process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`)
    console.log("Shutting down the server due to unhandled promise rejection")

    server.close(()=>{
        process.exit(1);
    })
})