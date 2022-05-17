import mongoose from "mongoose";
import users from "./data/users.js";
import dotenv from "dotenv";
import workouts from "./data/workouts.js";
import User from "./models/userModel.js";
import Workout from "./models/workoutModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Workout.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleWorkouts = workouts.map((workout) => {
      return { ...workout, user: adminUser };
    });
    console.log(sampleWorkouts[0]);

    await Workout.insertMany(sampleWorkouts);
    console.log("data imported");
    process.exit();
  } catch (error) {
    console.log(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Workout.deleteMany();
    await User.deleteMany();

    console.log("data deleted");
    process.exit();
  } catch (error) {
    console.log(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
