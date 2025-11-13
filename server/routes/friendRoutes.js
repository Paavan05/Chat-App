import express from "express";
import { protectRoute } from "../middleware/auth.js";
import { searchByEmail, sendInvite, listPending, respond, removeFriend } from "../controllers/friendController.js";

const router = express.Router();

router.get("/search", protectRoute, searchByEmail);
router.post("/invite", protectRoute, sendInvite);
router.get("/pending", protectRoute, listPending);
router.post("/respond", protectRoute, respond);
router.delete("/remove/:id", protectRoute, removeFriend);

export default router;