import express from "express"
import { auth } from "../middleware/auth.js";
import { handleBookingTicket } from "../controller/booking.controller.js";


const bookingRouter = express.Router();

bookingRouter.post("/ticket-booking",auth,handleBookingTicket)

export default bookingRouter;