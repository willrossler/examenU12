import express from "express";
const router = express.Router();
import {
  getWorkouts,
  getWorkoutById,
  deleteWorkout,
  updateWorkout,
  createWorkout,
} from "../controller/workoutController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getWorkouts).post(protect, admin, createWorkout);
router
  .route("/:id")
  .get(getWorkoutById)
  .delete(protect, admin, deleteWorkout)
  .put(protect, admin, updateWorkout);

export default router;
