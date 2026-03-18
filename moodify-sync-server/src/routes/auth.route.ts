import { Router } from "express";
import { registerValidator } from "../validators/auth.validator";
import { registerController } from "../controllers/auth.contoller";

const authRouter = Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 * @body { username, email, password }
 */
authRouter.post("/register", registerValidator, registerController);

export default authRouter;
