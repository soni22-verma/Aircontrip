import express from "express";
import {handleBooking, handleDestopProfile, handleEditProfile, handlegetProfile ,handleImageUpload,handleLogin,handleSignup,handleUpdatename,handleUserData,
} from "../controller/user.controller.js";

import { auth } from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const userRouter = express.Router();

userRouter.post("/signup", handleSignup);
userRouter.post("/login", handleLogin);
userRouter.get("/user-data", auth, handleUserData);
userRouter.post("/updateuser", auth, handleUpdatename);
userRouter.get("/user-profile", auth, handlegetProfile);
userRouter.post("/booking-ticket",auth,handleBooking)
userRouter.post("/upload-image" , upload.single("image") , handleImageUpload)
userRouter.post("/destop-profile", auth ,handleDestopProfile)
userRouter.post("/update-profile",auth,handleEditProfile)

export default userRouter;
