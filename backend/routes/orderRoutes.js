import express from "express";
const router = express.Router();

import {
  addOrderItems,
  getOrderById,
  getOrders,
} from "../controller/orderController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
router.route("/:id").get(protect, getOrderById);

export default router;
