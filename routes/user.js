import express from "express";
import User from "../models/user.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Example: Add to user history
router.post("/history", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.history.push({ ...req.body, createdAt: new Date() });
    await user.save();
    res.json({ history: user.history });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
