import express from "express";
import {
  checkAuth,
  login,
  signup,
  updateProfile,
  googleAuthRedirect,
  googleCallback,
} from "../controllers/userController.js";
import { protectRoute } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.put("/update-profile", protectRoute, updateProfile);
userRouter.get("/check", checkAuth);

userRouter.get("/google", googleAuthRedirect);
userRouter.get("/google/callback", googleCallback);

export default userRouter;
