import { Router } from "express";
import {
  loginController,
  registerController,
} from "../controllers/auth.contoller";
import {
  loginValidator,
  registerValidator,
} from "../validators/auth.validator";

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
