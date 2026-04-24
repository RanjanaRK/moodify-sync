import { Router } from "express";
import upload from "../middleware/upload.middleware.js";
import {
  createSong,
  getAllSongs,
  getSong,
} from "../controllers/song.controller.js";
import authUser from "../middleware/auth.middleware.js";

const songRouter = Router();

songRouter.post("/", upload.single("song"), authUser, createSong);

songRouter.get("/", authUser, getSong);

songRouter.get("/all", authUser, getAllSongs);

export default songRouter;
