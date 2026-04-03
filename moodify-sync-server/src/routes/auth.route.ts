import { Router } from "express";
import {
  loginController,
  logoutContoller,
  registerController,
} from "../controllers/auth.contoller";
import {
  loginValidator,
  registerValidator,
} from "../validators/auth.validator";
import authUser from "../middleware/auth.middleware";

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
