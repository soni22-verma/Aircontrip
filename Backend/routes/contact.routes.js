import express from 'express'
import { handleContact } from '../controller/contact.controller.js';
import { auth } from '../middleware/auth.js';


const contactRouter = express.Router();

contactRouter.post("/contact-us", handleContact)

export default contactRouter