import mongoose from "mongoose";

const connectDatabase = ()=>{
    mongoose.connect(process.env.DB_URI,{
        dbName: "ShipShop"
    }).then((data)=>{
        console.log(`mondodb is connected with server: ${data.connection.host}`)
    })
}

export default connectDatabase