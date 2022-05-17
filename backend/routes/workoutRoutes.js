import express from "express";
import asyncHandler from "express-async-handler";
const router = express.Router();
import Workout from "../models/workoutModel.js";

// @description     Fetch all Workouts
// @route           GET /api/workouts
// @access          Public
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const workouts = await Workout.find({});

    res.json(workouts);
  })
);

// @description     Fetch single Workout
// @route           GET /api/workouts/:id
// @access          Public

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const workout = await Workout.findById(req.params.id);
    if (workout) {
      res.json(workout);
    } else {
      res.status(404);
      throw new Error("Workout not found");
    }
  })
);

export default router;
