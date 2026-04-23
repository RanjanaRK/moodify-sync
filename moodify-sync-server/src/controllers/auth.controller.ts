import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { userModel } from "../models/user.model.js";
import redis from "../config/cache.js";

export const registerController = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await userModel.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const newUser = await userModel.create({
      username,
      email,
      password,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering user" });
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const existingUser = await userModel.findOne({ email }).select("+password");

    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
        error: "User not found",
      });
    }

    const ispasswordCorrect = await existingUser.comparePassword(password);

    if (!ispasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
        error: "Incorrect password",
      });
    }

    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: {
        id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in user" });
  }
};

export const logoutContoller = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;

    res.clearCookie("token");

    await redis.set(token, Date.now().toString(), "EX", 60 * 60);

    res.status(200).json({
      message: "logout successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logout in user" });
  }
};
