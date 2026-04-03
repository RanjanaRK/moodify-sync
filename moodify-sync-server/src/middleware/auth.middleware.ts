import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import redis from "../config/cache";
import env from "../config/env";

const authUser = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Token not provided",
    });
  }

  const isBlackListed = await redis.get(token);

  if (isBlackListed) {
    return res.status(401).json({ message: "invalid token" });
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);

    req.user = decoded;

    console.log("reqmiddleware", req.user, decoded);

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

export default authUser;
