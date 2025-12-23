import mongoose from "mongoose";
import donenv from "dotenv"

export const connectdb=async()=>{  
    try{
         mongoose.connect(process.env.MONGO_URL)
        .then(()=>{
        console.log("database connected successfully");
    })
    }
    catch(error){
        console.log(error,"this is error")
    }
    

    
}