import { Router } from "express";
import {
  registerController,
  loginController,
  logoutContoller,
} from "../controllers/auth.contoller.js";
import authUser from "../middleware/auth.middleware.js";
import {
  registerValidator,
  loginValidator,
} from "../validators/auth.validator.js";

const authRouter = Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 * @body { username, email, password }
 */
authRouter.post("/register", registerValidator, registerController);
authRouter.post("/login", loginValidator, loginController);
authRouter.post("/logout", authUser, logoutContoller);

export default authRouter;
