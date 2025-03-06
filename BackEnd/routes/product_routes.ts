import express from "express";
import { protect, admin } from "../Middleware/auth_middleware";
import {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/product_controller";

const router = express.Router();

//public route
router.get("/products", getAllProducts);
router.get("/products/:id", getProductById);

//protected route
router.post("/products", protect, admin, createProduct);
router.delete("/products/:id", protect, admin, deleteProduct);
router.put("/products/:id", protect, admin, updateProduct);

export default router;
