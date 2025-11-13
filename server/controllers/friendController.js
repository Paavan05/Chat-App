import User from "../models/User.js";
import { io, userSocketMap } from "../server.js";

// Search user by email (exact match)
export const searchByEmail = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.json({ success: false, message: "Email is required" });

    const meId = req.user._id;
    const user = await User.findOne({ email: email.toLowerCase() }).select("_id fullName email profilePic");
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (String(user._id) === String(meId)) {
      return res.json({ success: false, message: "You cannot add yourself" });
    }
    res.json({ success: true, user });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// Send friend invite to a user id
export const sendInvite = async (req, res) => {
  try {
    const meId = req.user._id;
    const { toUserId } = req.body;
    if (!toUserId) return res.json({ success: false, message: "toUserId is required" });

    if (String(meId) === String(toUserId)) return res.json({ success: false, message: "Cannot add yourself" });

    const me = await User.findById(meId);
    const target = await User.findById(toUserId);
    if (!target) return res.json({ success: false, message: "User not found" });

    // Already friends
    if (me.friends?.some((f) => String(f) === String(toUserId))) {
      return res.json({ success: false, message: "Already friends" });
    }

    // Existing pending request from me
    const exists = target.friendRequests?.some((r) => String(r.from) === String(meId));
    if (exists) return res.json({ success: false, message: "Invite already sent" });

    // If target has sent me a request, auto-accept
    const reciprocal = me.friendRequests?.some((r) => String(r.from) === String(toUserId));
    if (reciprocal) {
      me.friends.push(toUserId);
      target.friends.push(meId);
      me.friendRequests = me.friendRequests.filter((r) => String(r.from) !== String(toUserId));
      await me.save();
      await target.save();
      return res.json({ success: true, autoAccepted: true, message: "Friend request accepted" });
    }

    target.friendRequests.push({ from: meId });
    await target.save();

    // notify target to refresh pending/friends sidebar
    const targetSocketId = userSocketMap[toUserId];
    if (targetSocketId) io.to(targetSocketId).emit("friendsUpdated");

    return res.json({ success: true, message: "Invite sent" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// List pending requests for me (incoming)
export const listPending = async (req, res) => {
  try {
    const meId = req.user._id;
    const me = await User.findById(meId).populate("friendRequests.from", "_id fullName email profilePic");
    const pending = (me.friendRequests || []).map((r) => ({
      from: r.from,
      createdAt: r.createdAt,
    }));
    res.json({ success: true, pending });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// Accept or reject a request
export const respond = async (req, res) => {
  try {
    const meId = req.user._id;
    const { fromUserId, accept } = req.body;
    if (!fromUserId || typeof accept === "undefined") {
      return res.json({ success: false, message: "fromUserId and accept required" });
    }

    const me = await User.findById(meId);
    const other = await User.findById(fromUserId);
    if (!other) return res.json({ success: false, message: "User not found" });

    // Remove pending
    me.friendRequests = (me.friendRequests || []).filter((r) => String(r.from) !== String(fromUserId));

    if (accept) {
      if (!me.friends.some((f) => String(f) === String(fromUserId))) me.friends.push(fromUserId);
      if (!other.friends.some((f) => String(f) === String(meId))) other.friends.push(meId);
      await other.save();
    }
    await me.save();

    // notify both users to refresh sidebar lists
    const meSocketId = userSocketMap[meId];
    const otherSocketId = userSocketMap[fromUserId];
    if (meSocketId) io.to(meSocketId).emit("friendsUpdated");
    if (otherSocketId) io.to(otherSocketId).emit("friendsUpdated");

    res.json({ success: true, accepted: !!accept });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// Remove friend (unfriend)
export const removeFriend = async (req, res) => {
  try {
    const meId = req.user._id;
    const { id: otherId } = req.params;
    const me = await User.findById(meId);
    const other = await User.findById(otherId);
    if (!other) return res.json({ success: false, message: "User not found" });

    me.friends = (me.friends || []).filter((f) => String(f) !== String(otherId));
    other.friends = (other.friends || []).filter((f) => String(f) !== String(meId));
    await me.save();
    await other.save();

    // notify both users to refresh lists
    const meSocketId = userSocketMap[meId];
    const otherSocketId = userSocketMap[otherId];
    if (meSocketId) io.to(meSocketId).emit("friendsUpdated");
    if (otherSocketId) io.to(otherSocketId).emit("friendsUpdated");

    res.json({ success: true });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};


