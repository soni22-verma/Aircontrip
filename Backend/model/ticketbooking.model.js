import mongoose from "mongoose";

const ticketbookingSchema = new mongoose.Schema({
   
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },

    status: {
      type: String,
      default: "confirmed",
    },
   title:{
    type:String,
    enum:["Mr","Mrs","Ms"]
   },
   firstName:{
     type:String,
     required:true
   },
   lastName:{
    type:String,
    required:true
   },
   dateOfBirth:{
    type:Date,
   },
   nationality:{
    type:String
   },
   passportNumber:{
    type:String
   },
   passportExpiry:{
    type:String
   },
   seatPreference:{
    type:String
   },
   mealPreference:{
    type:String
   },
   specialrequest:{
    type:String
   }



},
    { timeseries: true }
)


export const Ticket = mongoose.model("ticket", ticketbookingSchema);