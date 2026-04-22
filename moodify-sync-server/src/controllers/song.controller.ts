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

    console.log(tags, "tagggsssss of song");

    const title =
      tags.title?.trim() ||
      req.file.originalname.replace(".mp3", "") ||
      "untitled";

    // upload song
    const songFile = await uploadFile({
      buffer: songBuffer,
      filename: `${title}.mp3`,
      folder: "songs",
    });

    let posterUrl = "https://ik.imagekit.io/rk25/default-image.jpg";

    let posterBuffer: Buffer | null = null;

    if (tags.image && typeof tags.image !== "string") {
      posterBuffer = tags.image.imageBuffer;
    }

    // upload poster ONLY if exists
    if (posterBuffer) {
      const posterFile = await uploadFile({
        buffer: posterBuffer,
        filename: `${title}.jpeg`,
        folder: "posters",
      });

      posterUrl = posterFile.url || "";
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

// export const createSong = async (req: Request, res: Response) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "Audio file required" });
//     }

//     // ----------------------------
//     // 1. Validate mood
//     // ----------------------------
//     const rawMood = req.body.mood;

//     if (!rawMood || typeof rawMood !== "string") {
//       return res.status(400).json({ message: "Mood is required" });
//     }

//     const mood = rawMood.toLowerCase().trim();

//     // ----------------------------
//     // 2. Read MP3 metadata safely
//     // ----------------------------
//     const tags = id3.read(req.file.buffer);

//     console.log(tags, "taggsss of song");

//     const title =
//       tags.title?.trim() ||
//       req.file.originalname.replace(".mp3", "") ||
//       "untitled";

//     // ----------------------------
//     // 3. Upload song (required)
//     // ----------------------------
//     const songFile = await uploadFile({
//       buffer: req.file.buffer,
//       filename: `${title}.mp3`,
//       folder: "songs",
//     });

//     // ----------------------------
//     // 4. Upload poster (optional)
//     // ----------------------------
//     let posterUrl = "https://ik.imagekit.io/rk25/default-image.jpg";

//     const hasImage =
//       tags.image &&
//       typeof tags.image !== "string" &&
//       Buffer.isBuffer(tags.image.imageBuffer);

//     if (hasImage) {
//       const posterFile = await uploadFile({
//         buffer: tags.image.imageBuffer as Buffer,
//         filename: `${title}.jpg`,
//         folder: "posters",
//       });

//       posterUrl = posterFile.url;
//     }

//     // ----------------------------
//     // 5. Save to DB
//     // ----------------------------
//     const song = await songModel.create({
//       title,
//       url: songFile.url,
//       posterUrl,
//       mood,
//     });

//     return res.status(201).json({
//       message: "Song created successfully",
//       song,
//     });
//   } catch (error) {
//     console.error("Create Song Error:", error);

//     return res.status(500).json({
//       message: "Server error",
//     });
//   }
// };

export const getAllSongs = async (req: Request, res: Response) => {
  try {
    const { mood } = req.query;

    const song = await songModel.findOne({ mood: mood });

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
