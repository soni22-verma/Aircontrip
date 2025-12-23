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

export const handleLogin = async(req,res)=>{
  try {

    const{email,password}= req.body;
    console.log(req.body)

    if(!email || !password){
      return res.status(400).json({
        message:"fill required field",
        error:true,
        success:false
      });
    }

    const user = await User.findOne({email})
   if(!user){
    return res.status(400).json({
      message:"user not registered",
      error:true,
      success:false
    })
   }

   const  match = await  bcrypt.compareSync(password, user.password); 

   if(!match){
    return res.status(400).json({
      message:"email and password is not matched",
      error:true,
      success:false
    })
   }

  const token = jwt.sign({userId :user._id }, "fghjkl" )
     
   return res.status(200).json({
    message:"Login Successfull",
    error:false,
    success:true,
    token
   })
    
  } catch (error) {
    console.log(error,"somthing went wrong")
  }
}
