import { Request, Response } from "express";

import id3 from "node-id3";
import { uploadFile } from "../service/storage.service.js";
import { songModel } from "../models/song.model.js";

export const createSong = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Audio file required" });
    }

    const songBuffer = req.file.buffer;
    const rawMood = req.body.mood;

    const mood = rawMood?.toLowerCase().trim();
    const tags = id3.read(songBuffer);

    const title = tags.title || "unknown";

    // upload song
    const songFile = await uploadFile({
      buffer: songBuffer,
      filename: `${title}.mp3`,
      folder: "/moodify/songs",
    });

    let posterUrl = "";

    let posterBuffer: Buffer | null = null;

    if (tags.image && typeof tags.image !== "string") {
      posterBuffer = tags.image.imageBuffer;
    }

    // upload poster ONLY if exists
    if (posterBuffer) {
      const posterFile = await uploadFile({
        buffer: posterBuffer,
        filename: `${title}.jpeg`,
      });

      posterUrl =
        posterFile.url ||
        "https://ik.imagekit.io/rk25/default-image.jpg?updatedAt=1776782878478";
    }

    const song = await songModel.create({
      title,
      url: songFile.url,
      posterUrl,
      mood,
    });

    res.status(201).json({
      message: "Song created successfully",
      song,
    });
  } catch (error) {
    console.error("Create Song Error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

export const getAllSongs = async (req: Request, res: Response) => {
  try {
    const { mood } = req.query;

    const song = await songModel.findOne({
      mood,
    });

    res.status(200).json({
      message: "song fetched successfully.",
      song,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};
