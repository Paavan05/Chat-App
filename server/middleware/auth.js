import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Middleware to protect routes
export const protectRoute = async (req, res, next) => {
  try {
    // Accept token from header, cookie, or Authorization Bearer
    const headerToken = req.headers?.token || req.headers?.authorization;
    const cookieToken = req.cookies?.token;
    let token = null;

    if (headerToken) {
      // headerToken might be "Bearer <token>" or just "<token>"
      if (headerToken.startsWith?.("Bearer ")) {
        token = headerToken.split(" ")[1];
      } else {
        token = headerToken;
      }
    } else if (cookieToken) {
      token = cookieToken;
    }

    if (!token) {
      return res.status(401).json({ success: false, message: "jwt must be provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // our token payload uses { userId } (see utils.generateToken), so use decoded.userId
    const userId = decoded.userId || decoded.id || decoded?.id; // fallback if you changed payload

    const user = await User.findById(userId).select("-password");// it removes password from the data
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    console.log("protectRoute error:", error.message);
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};
