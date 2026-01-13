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
        enum: ["confirmed", "pending", "Cancel"],
        default: "confirmed",
    },
    title: {
        type: String,
        enum: ["Mr", "Mrs", "Ms"]
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
    },
    nationality: {
        type: String
    },
    passportNumber: {
        type: String
    },
    passportExpiry: {
        type: String
    },
    seatPreference: {
        type: String
    },
    mealPreference: {
        type: String
    },
    specialrequest: {
        type: String
    },
    flightNumber: {
        type: String
    },
    airline: {
        type: String
    },
    from: {
        type: String
    },
    to: {
        type: String
    },
    departureTime: {
        type: String
    },
    arrivalTime: {
        type: String
    },
    journeyDate: {
        type: Date,
       
    },
    totalPrice: {
        type: Number,
    },
    bookedon:{
        type:Date,
    },
    userId: {
        type: String
    }



},
    { timeseries: true }
)


export const Ticket = mongoose.model("ticket", ticketbookingSchema);