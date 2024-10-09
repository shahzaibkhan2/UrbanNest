import { Router } from "express";
import {
  deleteProfile,
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
router.route("/logout").get(verifyJWT, logoutUser);
router
  .route("/edit-profile/:id")
  .post(verifyJWT, upload.single("avatar"), editProfile);
router.route("/delete-profile/:id").delete(verifyJWT, deleteProfile);

export default router;
