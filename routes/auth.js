  import express from "express";
  import bcrypt from "bcrypt";
  import jwt from "jsonwebtoken";
  import User from "../models/user.js"; 

  const router = express.Router();

  // Register
  router.post("/register", async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
      if (!name || !email || !password)     
        return res.status(400).json({ message: "Missing fields" });

      const existing = await User.findOne({ email });
      if (existing) return res.status(400).json({ message: "Email already in use" });

      const hashed = await bcrypt.hash(password, 10);
      const user = new User({ name, email, password: hashed, role });
      await user.save();
      res.status(201).json({ message: "User created" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Login
  router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password)
        return res.status(400).json({ message: "Missing fields" });

      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: "Invalid credentials" });

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) return res.status(400).json({ message: "Invalid credentials" });

      // Create JWT
      const token = jwt.sign(
        { id: user._id, role: user.name , email: email },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      // Set cookie with token + email
      res.cookie("auth", JSON.stringify({ token, email }), {
        httpOnly: true,   // JS can't read it
        secure: false,    // true if HTTPS
        sameSite: "lax",  // adjust if frontend on different domain
        maxAge: 24 * 60 * 60 * 1000 // 1 day
      });

      // Send response
      res.json({ message: "Logged in", role: user.role, name: user.name, userId: user._id });

    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  });

  export default router;
