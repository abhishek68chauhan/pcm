import express from "express";

import {
  addStudy,
  getStudies,
} from "../controllers/studyController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  addStudy
);

router.get(
  "/",
  authMiddleware,
  getStudies
);

export default router;
