import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  posterUrl: {
    type: String,
    required: false,
    default:
      "https://ik.imagekit.io/rk25/default-image.jpg?updatedAt=1776782878478",
  },
  title: {
    type: String,
    required: true,
  },
  mood: {
    type: String,
    enum: {
      values: ["sad", "happy", "surprised"],
      message: "Enum this is",
    },
  },
});

export const songModel = mongoose.model("songs", songSchema);
