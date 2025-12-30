import express from 'express'
import { handlegetProfile, handleLogin, handleSignup, handleUpdatename, handleUserData } from '../controller/user.controller.js'
import { auth } from '../middleware/auth.js'

const userRouter = express.Router()

userRouter.post("/signup",handleSignup)
userRouter.post("/login",handleLogin)
userRouter.get("/user-data", auth,handleUserData)
userRouter.post("/updateuser",handleUpdatename)
userRouter.get("/user-profile",auth,handlegetProfile)


export default userRouter