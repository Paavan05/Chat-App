import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";
import { googleOAuth, arcticLib } from "../lib/arctic.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { fullName, email, password, bio } = req.body;

  try {
    if (!fullName || !email || !password || !bio) {
      return res.json({ success: false, message: "Missing Details" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.json({ success: false, message: "Account Already Exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      bio,
    });

    const token = generateToken(newUser._id);

     res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      success: true,
      user: newUser,
      token,
      message: "Account created Successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await User.findOne({ email });

    if (!userData) return res.status(400).json({ success: false, message: "User not found" });

    // Skip password check for Google users
    if (userData.oauthProvider === "google") {
      return res.status(400).json({
        success: false,
        message: "Please log in using Google OAuth",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, userData.password);

    if (!isPasswordCorrect) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }

    const token = generateToken(userData._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      success: true,
      user: userData,
      token,
      message: "Login Successful",
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//check if user is authenticated
// export const checkAuth = (req, res) => {
//   res.json({ success: true, user: req.user });
// };

//Update User Profile Details
export const updateProfile = async (req, res) => {
  try {
    const { profilePic, bio, fullName } = req.body;

    const userId = req.user._id;

    let updatedUser;

    if (!profilePic) {
      updatedUser = await User.findByIdAndUpdate(
        userId,
        { bio, fullName },
        { new: true }
      );
    } else {
      const upload = await cloudinary.uploader.upload(profilePic);

      updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          profilePic: upload.secure_url,
          bio,
          fullName,
        },
        { new: true }
      );
    }
    res.json({ success: true, user: updatedUser });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

const { JWT_SECRET, FRONTEND_URL, PRODUCTION_FRONTEND_URL } = process.env;
const FRONTEND_ORIGIN = process.env.NODE_ENV === "production" ? PRODUCTION_FRONTEND_URL : FRONTEND_URL;

export const googleAuthRedirect = async (req, res) => {
  try {
    const state = arcticLib.generateState();
    const codeVerifier = arcticLib.generateCodeVerifier();

    res.cookie("oauth_state", state, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 10 * 60 * 1000,
    });
    res.cookie("oauth_code_verifier", codeVerifier, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 10 * 60 * 1000,
    });

    const scopes = ["openid", "profile", "email"];
    const url = googleOAuth.createAuthorizationURL(state, codeVerifier, scopes);
    return res.redirect(url);
  } catch (err) {
    console.error("OAuth redirect error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// --- STEP 2: Google Callback ---
export const googleCallback = async (req, res) => {
  try {
    const { code, state } = req.query;
    const storedState = req.cookies?.oauth_state;
    const codeVerifier = req.cookies?.oauth_code_verifier;

    if (!code || !state || !storedState || state !== storedState) {
      return res.status(400).json({ success: false, message: "Invalid OAuth state" });
    }

    const tokens = await googleOAuth.validateAuthorizationCode(code,codeVerifier);
    const accessToken = tokens.accessToken();

    const response = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const profile = await response.json();

    const googleId = profile.id;
    const email = profile.email;
    const fullName = profile.name || "No Name";
    const profilePic = profile.picture || "";

    let user = await User.findOne({ $or: [{ googleId }, { email }] });

    if (user) {
      if (user.googleId === googleId) {
        // User Already linked
      } else if (!user.googleId && user.email === email) {
        // Link Google to existing user
        user.googleId = googleId;
        user.oauthProvider = "google";
        if (!user.profilePic && profilePic) user.profilePic = profilePic;
        await user.save();
      }
    } else {
      // Create new user
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(Math.random().toString(36), salt);
      user = await User.create({
        email,
        fullName,
        password: hashed,
        profilePic,
        bio: "",
        googleId,
        oauthProvider: "google",
      });
    }

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.clearCookie("oauth_state");
    res.clearCookie("oauth_code_verifier");

    return res.redirect(FRONTEND_ORIGIN + "/oauth-redirect");
  } catch (err) {
    console.error("Google callback error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// --- STEP 3: Check Auth (using cookie token) ---
export const checkAuth = async (req, res) => {
  try {
    let token = req.cookies.token || req.headers.token || req.headers.authorization; // check cookie first, then header
    if (!token) return res.json({ success: false, message: "Not authenticated. jwt must be provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) return res.json({ success: false, message: "User not found" });

    return res.json({ success: true, user });
  } catch (err) {
    console.error("Check auth error:", err.message);
    return res.json({ success: false, message: "Invalid token" });
  }
};