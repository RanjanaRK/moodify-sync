import { Router } from "express";
import upload from "../middleware/upload.middleware.js";
import {
  createSong,
  getAllSongs,
  getSong,
} from "../controllers/song.controller.js";

const songRouter = Router();

songRouter.post("/", upload.single("song"), createSong);

songRouter.get("/", getSong);

songRouter.get("/all", getAllSongs);

export default songRouter;
