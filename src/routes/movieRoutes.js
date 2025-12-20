import express from "express";
import {
  deleteMovie,
  getAllMovies,
  postMovie,
  putMovie,
} from "../controllers/movieControllers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
const router = express.Router();
router.use(authMiddleware);

router.post("/create", postMovie);
router.get("/", getAllMovies);
router.put("/:id", putMovie);
router.delete("/:id", deleteMovie);

export default router;
