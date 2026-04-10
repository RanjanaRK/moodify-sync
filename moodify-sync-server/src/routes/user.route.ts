import { Router } from "express";
import authUser from "../middleware/auth.middleware.js";
import { getMe } from "../controllers/user.controller.js";

const userRouter = Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 * @body { username, email, password }
 */
userRouter.get("/me", authUser, getMe);

export default userRouter;
