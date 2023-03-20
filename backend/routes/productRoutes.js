import express from "express";
import {
  getProductById,
  getProducts,
  deleteProduct,
  updateProduct,
  createProduct,
  createProductReview,
  getTopProducts,
} from "../controllers/productController.js";
import { protect, admin } from "../middelware/authMiddleware.js";
const router = express.Router();

// router.route is a method that takes in a path and a callback function. The callback function is the actual route handler. The route handler is the function that is called when a request is made to the path. The route handler is responsible for handling the request and sending the response.
router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/:id/reviews").post(protect, createProductReview);
router.get("/top", getTopProducts);

router
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

// another simplified method to get all products
// router.get("/", getProducts);

// method to get a single product
// router.get("/:id", getProductById);

export default router;
