import mongoose from "mongoose";

const blacklistSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: [true, "token is required for blacklisting."],
    },
  },
  {
    timestamps: true,
  },
);

export const blacklistModel = mongoose.model("blacklist", blacklistSchema);
