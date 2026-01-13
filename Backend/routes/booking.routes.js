import express from "express"
import { auth } from "../middleware/auth.js";
import { getAllBookingDetails, handleBookingTicket, handleGetBookingDetails } from "../controller/booking.controller.js";


const bookingRouter = express.Router();

bookingRouter.post("/ticket-booking",auth,handleBookingTicket)
bookingRouter.get("/all-booking-details",auth,getAllBookingDetails)
bookingRouter.post("/get-user-details",handleGetBookingDetails)

export default bookingRouter;