import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true,"please enter product Name"],
        trim:true,
    },
    description:{
        type:String,
        required: [true,"please enter product Description"]
    },
    price:{
        type:Number,
        maxLength:[8,"Price can not exceed 8 characters"],
        required: [true,"please enter product Price"]
    },
    ratings:{
        type:Number,
        default: 0
    },
    images:[
        {
            public_id:{
                type:String,
                required: true
            },
            url:{
                type:String,
                required: true
            }
        }
    ],
    category:{
        type:String,
        required: [true,"please enter product Category"]
    },
    stock:{
        type:Number,
        required: [true,"please enter product stock"],
        maxLength:[4,"Stock can not exceed 4 characters"],
        default:1
    },
    numOfReviews:{
        type:Number,
        default: 0,
    },
    reviews:[
        {
            user:{
                type: mongoose.Schema.ObjectId,
                ref: "User",
                require: true
            },
            name:{
                type:String,
                required: true,
            },
            rating:{
                type:Number,
                required: true
            },
            comment:{
                type:String,
                require: true
            }
        }
    ],

    user:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        require: true
    },

    createdAt:{
        type:Date,
        default:Date.now
    }
})

const Product = mongoose.model("Product",productSchema)

export default Product