import { Contact } from "../model/contact.model.js";

export const handleContact = async(req,res)=>{
    try {
        const {name,email,phone,subject,message} = req.body.formData;
        console.log(req.body,"this is req.body")

        if(!name || !email || !phone || !subject || !message){
            return res.status(400).json({
                message:"fill require field",
                error :true,
                success:false
            })
        }

          const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({
                message:"email is not valid",
                error:true,
                success:false
            })
        }
        const phoneRegex = /^(?:\+91|91)?[6-9]\d{9}$/;
        if(!phoneRegex.test(phone)){
            return res.status(400).json({
                message:"phone no is not valid",
                error:true,
                success:false
            })
        } 

        const newContact =  await Contact.create({
              name,
              email,
              phone,
              subject,
              message
        })

        return res.status(200).json({
            message:"Your message has been sent successfully.We’ll get back to you soon.",
            error:false,
            success:true,
            data:newContact
        })
        
    } catch (error) {
        console.log(error,"this is error")
        
    }
}