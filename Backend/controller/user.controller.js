import bcrypt from "bcrypt";
import { User } from "../model/user.model.js";
import { Booking } from "../model/booking.model.js";
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


    const user = await User.findOne({ email })
    if (user?.email) {
      return res.status(400).json({
        message: "user already registered",
        error: true,
        success: false
      })
    }

    

    const hashpassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email: email.trim(),
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
         const isMatch = bcrypt.compareSync(password,user.password)
         if(!isMatch){
          res.status(400).json({
            message:"email and password is not matched",
            error:true,
            success:false
          })
         }


   

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({
        message: "email and password is not matched",
        error: true,
        success: false,
      });
    }

    const token = jwt.sign({ userId: user._id }, "fghjkl", { expiresIn: "7d" });

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


export const handleUserData = async (req, res, next) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({
        message: "userId is not found",
        error: true,
        success: false
      })
    }
    const user = await User.findById(userId)
    if (!user) {
      return res.status(400).json({
        message: "user not found",
        error: true,
        success: false
      })
    }

    console.log(user , "this is user details")
    return res.status(200).json({
      message: "this is user",
      error: false,
      success: true,
      user
    })
  } catch (error) {
    next(error)

  }
}

export const handleUpdatename = async (req, res) => {
  try {
    const { userId, name, phone } = req.body;
    console.log(userId, " this is user id")

    if (!userId) {
      return res.status(400).json({
        message: "userid is required",
        error: true,
        success: false
      })
    }

    const user = await User.findByIdAndUpdate(userId, {
      name: name,
      phone: phone
    }, { new: true })
    console.log(user, "this is user")

  } catch (error) {
    console.log(error)
  }
}

export const handlegetProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("name email phone");
    if (!user) {
      return res.status(400).json({
        message: "user not found",
        error: true,
        success: false
      })
    }

    return res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "server error",
      error: true,
      success: false
    });
  }
};

export const handleImageUpload = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded. Make sure you're sending form-data with the correct key",
        error: true,
        success: false,
      });
    }

    const { path } = req.file;
    console.log("File path:", path);

    return res.status(200).json({
      message: "File received",
      error: false,
      success: true,
      path,
    });
  } catch (error) {
    console.error("Error in handleImageUpload:", error);
    res.status(500).json({
      message: "Internal server error",
      error: true,
      success: false,
      next,
    });
  }
};

export const handleBooking = async (req, res) => {
  try {
    const { name, email, phone, gender, age } = req.body;

    if (!name || !email || !phone || !gender || !age) {
      return res.status(400).json({
        message: "fill all required field",
        error: true,
        success: false,
      })
    }

    let userId = req.userId || null;

    if (userId) {
      await User.findByIdAndUpdate(
        req.userId, {
        name, email, phone, gender, age
      },
        { new: true }
      )
    }



    const booking = await Booking.create({
      userId: req.userId,
      name, email, phone, gender, age,
      status: "confirmed"
    });
    return res.status(200).json({
      message: "Ticket Confirmed successfully",
      error: false,
      success: true,
      booking,
    })

  } catch (error) {
    console.log(error, "this is error")
    res.status(500).json({
      message: "ticket confirmation failed",
      success: false
    })
  }
}

export const handleDestopProfile = async (req, res) => {
  try {
   

    if (!req.body) {
      return res.status(400).json({
        message: "Request body missing",
        success: false,
      });
    }

    const { dob, nationality, passportNumber, Address, emergencyno , userId} = req.body;

    if (!dob || !nationality || !passportNumber || !Address || !emergencyno) {
      return res.status(400).json({
        message: "fill required field",
        success: false,
      });
    }

    console.log(req.body, "dgshgjdjgs")

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
        success: false,
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "user not found",
        success: false,
      });
    }
    user.dob = dob;
    user.nationality = nationality;
    user.passportNumber = passportNumber;
    user.Address = Address;
    user.emergencyno = emergencyno;

    await user.save();

    // 6️⃣ Success response
    return res.status(200).json({
      message: "Profile Saved Successfully 😊",
      success: true,
      user,
    });
  } catch (error) {
    console.log("SERVER ERROR:", error.message);
    return res.status(500).json({
      message: "server error",
      success: false,
    });
  }
};

export const handleEditProfile = async (req, res) => {
  try {
    const { dob, nationality, passportNumber, Address, emergencyno,userId } = req.body;
    console.log(req.body, "this is user id")
    
    

    if (!userId) {
      return res.status(400).json({
        message: "userId is required",
        error: true,
        success: false
      })
    }
    const user = await User.findByIdAndUpdate(userId,
      {
        dob,
        nationality,
        passportNumber,
        Address,
        emergencyno,
      },
      { new: true} )

    console.log(user, "this is user")

    return res.status(200).json({
      message: "updated",
      error: false,
      success: true,
      user
    })


  } catch (error) {
    console.log(error)
  }
}



