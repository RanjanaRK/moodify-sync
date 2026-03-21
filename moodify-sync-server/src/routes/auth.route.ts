import { Router } from "express";
import {
  loginValidator,
  registerValidator,
} from "../validators/auth.validator";
import {
  loginController,
  registerController,
} from "../controllers/auth.contoller";

const authRouter = Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 * @body { username, email, password }
 */
authRouter.post("/register", registerValidator, registerController);
authRouter.post("/login", loginValidator, loginController);

export default authRouter;
