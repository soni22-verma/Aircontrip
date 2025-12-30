import bcrypt from "bcrypt";
import { User } from "../model/user.model.js";
import jwt from "jsonwebtoken"

export const handleSignup = async (req, res) => {
  try {
  

    const { name, email, phone, password } = req.body;
    console.log(req.body)

    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        message: "fill required fields",
        success: false,
      });
    }

    const user = await User.findOne({email})
    if(user?.email){
      return res.status(400).json({
        message:"user already registered",
        error:true,
        success:false
      })
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      phone,
      password: hashpassword,
    });

    await newUser.save();

    return res.status(200).json({
      message: "user register successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const handleLogin = async (req, res) => {
  try {
    let { email, password } = req.body;
    console.log(req.body);

    if (!email || !password) {
      return res.status(400).json({
        message: "fill required field",
        error: true,
        success: false,
      });
    }

    email = email.toLowerCase().trim();

    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(400).json({
        message: "user not registered",
        error: true,
        success: false,
      });
    }

    const match = await bcrypt.compare(password, user.password);
 
    if (!match) {
      return res.status(400).json({
        message: "email and password is not matched",
        error: true,
        success: false,
      });
    }

    const token = jwt.sign({ userId: user._id }, "fghjkl");

    return res.status(200).json({
      message: "Login Successful",
      error: false,
      success: true,
      token,
      user,
    });
  } catch (error) {
    console.log(error, "something went wrong");
    res.status(500).json({
      message: "server error",
      success: false,
    });
  }
};


export const handleUserData = async(req,res,next)=>{
  try {
      const {userId} = req.body;
      if(!userId){
        return res.status(400).json({
          message:"userId is not found",
          error:true,
          success:false
        })
      }
      const user = await User.findById(userId)
      if(!user){
        return res.status(400).json({
          message:"user not found",
          error:true,
          success:false
        })
      }

      return res.status(200).json({
        message:"this is user",
        error:false,
        success:true,
        user
      })
  } catch (error) {
    next(error)
    
  }
}

export const handleUpdatename = async(req,res)=>{
   try {
    const {userId,name,phone} =req.body;
    console.log(userId , " this is user id")

    if(!userId){
      return res.status(400).json({
        message:"userid is required",
        error:true,
        success:false
      })
    }
 
    const user = await User.findByIdAndUpdate(userId,{
       name:name,
       phone:phone
    } ,{new:true})
      console.log(user,"this is user")
    
   } catch (error) {
    console.log(error)
   }
}

export const handlegetProfile = async(req,res)=>{
   try {
    const user= await User.findById(req.userId).select("name email");
    console.log("REQ USER ID:", req.userId);

    if(!user){
      return res.status(400).json({
        message:"user not found",
        error:true,
        success:false
      })
    }

    return res.status(200).json({
      success:true,
      user,
    });
    
   } catch (error) {
    console.log(error);
    return res.status(500).json({
      message:"server error",
      error:true,
      success:false
    });
   }
};