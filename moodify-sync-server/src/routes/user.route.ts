import { Router } from "express";
import { getMe } from "../controllers/user.controller";
import authUser from "../middleware/auth.middleware";

const userRouter = Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 * @body { username, email, password }
 */
userRouter.get("/me", authUser, getMe);

export default userRouter;
