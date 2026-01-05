import express from "express";
import {
  addFeedback,
  getAllFeedback,
  getFeedbackById,
  deleteFeedback,
} from "../models/feedback.model.js";

const router = express.Router();

// POST feedback
router.post("/", async (req, res, next) => {
  try {
    const feedback = await addFeedback(req.body);
    res.status(201).json({ success: true, data: feedback });
  } catch (err) {
    next(err);
  }
});

// GET feedback
router.get("/", async (req, res, next) => {
  try {
    const feedback = await getAllFeedback();
    res.json({ success: true, data: feedback });
  } catch (err) {
    next(err);
  }
});

// GET feedback by id
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const feedback = await getFeedbackById(id);

    if (!feedback) {
      const error = new Error("Feedback not found");
      error.status = 404;
      throw error;
    }

    res.json({ success: true, data: feedback });
  } catch (err) {
    next(err);
  }
});

// DELETE feedback
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await deleteFeedback(id);

    if (!deleted) {
      const error = new Error("Feedback not found");
      error.status = 404;
      throw error;
    }

    res.json({ success: true, data: deleted });
  } catch (err) {
    next(err);
  }
});

export default router;
