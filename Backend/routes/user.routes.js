import express from 'express'
import { handleLogin, handleSignup, handleUpdatename, handleUserData } from '../controller/user.controller.js'
import { auth } from '../middleware/auth.js'

const userRouter = express.Router()

userRouter.post("/signup",handleSignup)
userRouter.post("/login",handleLogin)
userRouter.get("/user-data", auth,handleUserData)
userRouter.post("/updateuser",handleUpdatename)


export default userRouter