import express from "express";
import {
  register,
  login,
  logout,
  getMe,
} from "../controllers/authControllers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/me", authMiddleware, getMe);
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export default router;
