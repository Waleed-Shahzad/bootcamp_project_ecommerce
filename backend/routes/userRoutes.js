import express from "express";
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/userController.js";
import { protect, admin } from "../middelware/authMiddleware.js";

const router = express.Router();

// router.route is a method that takes in a path and a callback function. The callback function is the actual route handler. The route handler is the function that is called when a request is made to the path. The route handler is responsible for handling the request and sending the response.

// @desc Get Users Admin Only
router.route("/").get(protect, admin, getUsers);

// @desc    Register a user
router.route("/register").post(registerUser);

// @desc    Login a user and return a token.
router.route("/login").post(authUser);
// another way to write the above code is as follows :
// router.post("/login", authUser);

// @desc    Get user profile
// @desc    Update user profile
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

export default router;
