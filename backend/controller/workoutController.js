import asyncHandler from "express-async-handler";
import Workout from "../models/workoutModel.js";

// @description     Fetch all Workouts
// @route           GET /api/workouts
// @access          Public

const getWorkouts = asyncHandler(async (req, res) => {
  const workouts = await Workout.find({});

  res.json(workouts);
});

// @description     Fetch single Workout
// @route           GET /api/workouts/:id
// @access          Public

const getWorkoutById = asyncHandler(async (req, res) => {
  const workout = await Workout.findById(req.params.id);
  if (workout) {
    res.json(workout);
  } else {
    res.status(404);
    throw new Error("Workout not found");
  }
});

// @description delete single workout
// route DELETE /api/workouts/:ID
//access Admin

const deleteWorkout = asyncHandler(async (req, res) => {
  const workout = await Workout.findById(req.params.id);
  if (workout) {
    await workout.remove();
    res.json({ message: "workout removed" });
  } else {
    res.status(404);
    throw new Error("workout not found");
  }
});

// @description create single workout
// route POST /api/workouts/:ID
//access Admin

const updateWorkout = asyncHandler(async (req, res) => {
  const { name, price, description, image } = req.body;

  const workout = await Workout.findById(req.params.id);

  if (workout) {
    workout.name = name;
    workout.price = price;
    workout.description = description;
    workout.image = image;

    const updatedWorkout = await workout.save();
    res.json(updatedWorkout);
  } else {
    res.status(404);
    throw new Error("Workout not found");
  }

  const createdWorkout = await workout.save();
  res.status(201).json(createdWorkout);
});

// @description update a single workout
// route PUT /api/workouts/:ID
//access Admin

const createWorkout = asyncHandler(async (req, res) => {
  const workout = new Workout({
    name: "sample",
    price: 0,
    user: req.user._id,
    image: "",
    description: "sample description",
    countInStock: 0,
  });
  const createdWorkout = await workout.save();
  res.status(201).json(createdWorkout);
});
export {
  getWorkouts,
  getWorkoutById,
  deleteWorkout,
  createWorkout,
  updateWorkout,
};
