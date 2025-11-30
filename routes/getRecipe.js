// routes/getRecipe.js
import express from "express";
import  Recipe from "../models/recipe.js";

const router = express.Router();

// ===================== GET ALL RECIPES =====================
const getRecipe = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    return res.json({ success: true, data: recipes });
  } catch (err) {
    console.error("ERROR OCCURRED IN RETRIEVING RECIPES:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ===================== GET RECIPE BY ID =====================
const getRecipeId = async (req, res) => {
  try {
    const id = req.query.id;
    const recipe = await Recipe.findById(id);
    if (!recipe) return res.status(404).json({ success: false, message: "Recipe not found" });
    return res.json({ success: true, data: recipe });
  } catch (err) {
    console.error("ERROR FETCHING RECIPE BY ID:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ===================== DELETE RECIPE =====================
const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRecipe = await Recipe.findByIdAndDelete(id);
    if (!deletedRecipe) return res.status(404).json({ success: false, message: "Recipe not found" });
    return res.json({ success: true, message: "Recipe deleted successfully" });
  } catch (err) {
    console.error("ERROR DELETING RECIPE:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ===================== UPDATE RECIPE =====================
const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedRecipe = await Recipe.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedRecipe) return res.status(404).json({ success: false, message: "Recipe not found" });

    return res.json({ success: true, data: updatedRecipe });
  } catch (err) {
    console.error("ERROR UPDATING RECIPE:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export { getRecipe, getRecipeId, deleteRecipe, updateRecipe };
