import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: "Please login", success: false });

    const decoded = jwt.verify(token, "fghjkl");
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log("Auth error:", error.message);
    return res.status(401).json({ message: "Invalid token", success: false });
  }
};
