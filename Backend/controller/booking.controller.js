import jwt from "jsonwebtoken"
import { User } from "../model/user.model.js";
import { Ticket } from "../model/ticketbooking.model.js";

export const handleBookingTicket = async (req, res) => {
    try {
        const { email, phone, title, firstName, lastName, dateOfBirth, nationality, passportNumber, passportExpiry, seatPreference, mealPreference, specialrequest } = req.body;

        console.log("BODY 👉", req.body);
        // console.log("USERID 👉", req.userId);

        if (!email || !phone || !title || !firstName || !lastName || !dateOfBirth || !nationality || !passportNumber || !passportExpiry || !seatPreference || !mealPreference || !specialrequest) {
            return res.status(400).json({
                message: "fill required field",
                error: true,
                success: false
            })
        }

        let userId = req.userId || null  

        if (userId) {
            await User.findByIdAndUpdate(req.userId, {
                email, phone, title, firstName, lastName, dateOfBirth, nationality, passportNumber, passportExpiry, seatPreference, mealPreference, specialrequest
            }, { new: true })
        }
        const token = jwt.sign({ userId: req.userId }, "fghjkl", { expiresIn: "7d" });


        const booking = await Ticket.create({
            userId: req.userId,
            email, phone, title, firstName, lastName, dateOfBirth, nationality, passportNumber, passportExpiry, seatPreference, mealPreference, specialrequest,
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
        console.log(error, "this is error")
        return res.status(500).json({
            message: "ticket confirmation failed",
            error: true,
            success: false
        })
    }
}