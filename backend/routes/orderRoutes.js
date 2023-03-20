import express from "express";
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
} from "../controllers/orderController.js";
import { protect, admin } from "../middelware/authMiddleware.js";

const router = express.Router();

// router.route is a method that takes in a path and a callback function. The callback function is the actual route handler. The route handler is the function that is called when a request is made to the path. The route handler is responsible for handling the request and sending the response.

// @desc    create new order
router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);

export default router;
