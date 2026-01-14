import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
    password: {
        type: String,
        required: true,
        unique: true
    },
    // profilepic: {
    //     type: String,
    //     default: null,
    // },
    dob: {
        type:String,
    },
    nationality:{
        type:String,
    },

    passportNumber: {
      type:String,
    },

   address: {
    type:String,
    },

    emergencyno:{
        type:String,
    },
    
 profileCompleted: {
      type: Boolean,
      default: false,   
    },


},
    { timeseries: true }
)


export const User = mongoose.model("User", userSchema);