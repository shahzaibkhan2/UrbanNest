import { Router } from "express";
import {
  googleSignIn,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/google-signin").post(googleSignIn);
router.route("/logout").post(verifyJWT, logoutUser);

export default router;
