import express from "express";
const router = express.Router();
import {
  getWorkouts,
  getWorkoutById,
} from "../controller/workoutController.js";

router.route("/").get(getWorkouts);
router.route("/:id").get(getWorkoutById);

export default router;
