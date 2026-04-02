import { NextFunction, Request, Response } from "express";

const authUser = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Token not provided",
    });
  }
  try {
  } catch (error) {}
};

export default authUser;
