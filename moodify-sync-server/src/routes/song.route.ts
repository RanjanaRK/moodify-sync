import { Router } from "express";
import upload from "../middleware/upload.middleware.js";
import { createSong, getAllSongs } from "../controllers/song.controller.js";

const songRouter = Router();

songRouter.post("/", upload.single("song"), createSong);

songRouter.get("/", getAllSongs);

export default songRouter;
