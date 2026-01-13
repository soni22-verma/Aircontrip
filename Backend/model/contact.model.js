import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    name:{
        type:String,
        required : true,
    },
    email:{
        type:String,
        required : true,
    },
    phone:{
        type:String,
        required:true,
    },
    subject:{
        type:String,
        enum:["booking Assistance","changes & Cancellations","refund Request","technical Issue","feedback"],

    },
    message:{
        type:String,
    }
})

export const Contact = mongoose.model("contact",contactSchema)