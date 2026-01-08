import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  try {
    console.log(req.headers , "this is headers")
    let token = req?.headers?.authorization
    console.log(token , "this is token")
    if (!token) return res.status(401).json({ message: "Please login", success: false });
     
    const decoded = jwt.verify(token, "fghjkl");
    req.body = {...req.body  , userId : decoded.userId}
    // req.userId = decoded.userId;
    next();
   
  } catch (error) {
    console.log("Auth error:", error.message);
    return res.status(401).json({ message: "Invalid token", success: false });
  }
};
