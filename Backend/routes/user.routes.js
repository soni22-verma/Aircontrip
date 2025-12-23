import express from 'express'
import { handleLogin, handleSignup } from '../controller/user.controller.js'

const userRouter = express.Router()

userRouter.post("/signup",handleSignup)
userRouter.post("/login",handleLogin)


export default userRouter