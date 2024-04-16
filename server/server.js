import app from './app.js'
import connectDatabase from './config/database.js'
import dotenv from 'dotenv'

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