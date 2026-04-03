import { Request, Response } from "express";
import { userModel } from "../models/user.model";

export const getMe = async (req: Request, res: Response) => {
  const userId = req.user;

  if (!userId) {
    return;
  }

  try {
    const user = await userModel.findById(userId);

    res.status(200).json({
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};
