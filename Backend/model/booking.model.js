import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
  
    gender: {
        type: String,
        enum: ["male", "female", "other"],
         required:true   
    },
    age: {
        type: Number,
        min: 1,
        max: 120,
        required:true

    },
    status: {
      type: String,
      default: "confirmed",
    },
   
},
    { timeseries: true }
)


export const Booking = mongoose.model("booking", bookingSchema);