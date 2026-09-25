import express from "express";

import {
  addQuestion,
  getQuestions,
  submitAnswer,
} from "../controllers/questionController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


// Add question
router.post(
  "/",
  authMiddleware,
  addQuestion
);


// Get all questions
router.get(
  "/",
  authMiddleware,
  getQuestions
);


// Submit answer
router.post(
  "/:id/answer",
  authMiddleware,
  submitAnswer
);

export default router;