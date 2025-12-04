import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import recipeRoute from "./routes/recipe.js";
import { getRecipe, getRecipeId, updateRecipe, deleteRecipe } from "./routes/getRecipe.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// ----------------- Middleware -----------------
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://recipe-frontend-bay.vercel.app"   // <-- Vercel frontend allow
    ],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// IMPORTANT — allow OPTIONS requests explicitly
app.options("*", cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// ----------------- Routes -----------------
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/recipe", recipeRoute);

app.get("/recipe/api/getRecipe", getRecipe);
app.get("/recipe/api/getRecipeId", getRecipeId);
app.put("/recipe/api/updateRecipe/:id", updateRecipe);
app.delete("/recipe/api/deleteRecipe/:id", deleteRecipe);

// ----------------- MongoDB Connection -----------------
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// ----------------- Start Server -----------------
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
