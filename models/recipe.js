// models/recipe.js
import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ingredients: { type: [String], required: true },
  steps: { type: [String], required: true },
  desc: { type: String, required: true },
  rating: { type: Number, required: true },
  category: { type: String, required: true },
  difficulty: { type: String, required: true },
  cookingTime: { type: String, required: true },
  servings: { type: Number, required: true },
  username: { type: String }, // optional if you track user
});

export default mongoose.model("Recipe", RecipeSchema);
