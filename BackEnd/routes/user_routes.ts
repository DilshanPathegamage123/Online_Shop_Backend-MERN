import express from "express";
import { protect, admin } from "../Middleware/auth_middleware";

import { getAllUsers, getUserById } from "../controllers/user_controller";

const router = express.Router();

router.get("/users", protect, getAllUsers);
router.get("/users/:id", protect, getUserById);

export default router;
