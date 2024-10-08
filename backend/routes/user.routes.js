import { Router } from "express";
import {
  editProfile,
  googleSignIn,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middlewares.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/google-signin").post(googleSignIn);
router.route("/logout").post(verifyJWT, logoutUser);
router
  .route("/edit-profile")
  .post(verifyJWT, upload.single("avatar"), editProfile);

export default router;
