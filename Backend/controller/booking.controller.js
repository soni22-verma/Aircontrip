import jwt from "jsonwebtoken"
import { User } from "../model/user.model.js";
import { Ticket } from "../model/ticketbooking.model.js";

export const handleBookingTicket = async (req, res) => {
    try {
        const { email, phone, title, firstName, lastName, dateOfBirth, nationality, passportNumber, passportExpiry, seatPreference, mealPreference, specialrequest,flightNumber,
                airline,
                from,
                to,
                departureTime,
                arrivalTime,
                journeyDate,
                totalPrice,
                bookedon} = req.body || {};

        // console.log("this is date of booked on",bookedon);

        if (!email || !phone || !title || !firstName || !lastName || !dateOfBirth || !nationality || !passportNumber || !passportExpiry || !seatPreference || !mealPreference || !specialrequest ) {
            return res.status(400).json({
                message: "fill required field",
                error: true,
                success: false
            })
        }

        console.log(req.body);
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const isemail = emailRegex.test(email);

        if (!isemail) {
            return res.status(400).json({
                message: "email is not valid",
                error: true,
                success: false
            })
        }

        const phoneRegex = /^(?:\+91|91)?[6-9]\d{9}$/;
        const isphone = phoneRegex.test(phone)
        if (!isphone) {
            return res.status(400).json({
                message: "phone no is not valid",
                error: true,
                success: false
            })
        }

        // let userId = req.userId || null

        // if (userId) {
        //     await User.findByIdAndUpdate(req.userId, {
        //         email, phone, title, firstName, lastName, dateOfBirth, nationality, passportNumber, passportExpiry, seatPreference, mealPreference, specialrequest,
        //         flightNumber,
        //         airline,
        //         from,
        //         to,
        //         departureTime,
        //         arrivalTime,
        //         journeyDate,
        //         totalPrice,

        //         status: "confirmed"
        //     }, { new: true })
        // }
  
       
        const token = jwt.sign({ userId: req.userId }, "fghjkl", { expiresIn: "7d" });


        const booking = await Ticket.create({
            userId: req.body.userId,
            email, phone, title, firstName, lastName, dateOfBirth, nationality, passportNumber, passportExpiry, seatPreference, mealPreference, specialrequest,
              flightNumber,
                airline,
                from,
                to,
                departureTime,
                arrivalTime,
                journeyDate,
                totalPrice,
                bookedon,
                
            status: "confirmed"
        });
        return res.status(200).json({
            message: "Ticket Confirmed Successfully , thankyou 😁",
            error: false,
            success: true,
            booking,
            token
        })

    } catch (error) {
        // console.log(error, "this is error")
        return res.status(500).json({
            message: "ticket confirmation failed",
            error: true,
            success: false
        })
    }
}

export const getAllBookingDetails = async (req, res) => {
    try {
        const userId = req.body.userId;
        // console.log("this is req.body:", req.body);


        const booking = await Ticket.find({userId})
            .sort({ createdAt: -1 });   //jo data last me data dange wo sabse pahele aa show hoga

        res.status(200).json({
            success: true,
            booking
        })

    } catch (error) {
        res.status(500).json({
            error: true,
            message: "unable to fatch booking details",
        });
    }
};

export const handleGetBookingDetails = async(req,res)=>{
    try {

        const {email} = req.body
        console.log(email ," this is my userDetailsEamil")

        const userDetails = await Ticket.find({email})
        console.log(userDetails , " TJBNJTNBRTBUTRB")
        if(!userDetails){
            return res.status(400).json({
                message:"userDetail not found",
                error:true,
                success:false
            })
        }

        return res.status(200).json({
            message:"userDetails is found",
            error:false,
            success:true,
            userDetails
        })
        
    } catch (error) {
      console.log(error,"this is error")   
    }
}