import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectdb } from "./config/connectdb.js";
import userRouter from "./routes/user.routes.js";
import { handleError } from "./middleware/errorhandling.js";
import bookingRouter from "./routes/booking.routes.js";

dotenv.config();

const app = express();
connectdb();

// ✅ MUST BE BEFORE ROUTES
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/user", userRouter);
app.use("/booking",bookingRouter);
app.use(handleError)

const PORT = 2020;
app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});
