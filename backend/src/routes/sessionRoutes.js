import express from "express";
import {
  createSession,
  getActiveSessions,
  getCompletedSessions,
  getSessionById,
  joinSession,
  endSession,
} from "../controllers/sessionController.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/", protectRoute, createSession);
router.get("/active", protectRoute, getActiveSessions);
router.get("/completed", protectRoute, getCompletedSessions);

router.get("/:id", protectRoute, getSessionById);
router.get("/:id/join", protectRoute, joinSession);
router.get("/:id/end", protectRoute, endSession);

export default router;
