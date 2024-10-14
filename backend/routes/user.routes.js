import { Router } from "express";
import {
  deleteProfile,
  deleteUserHouseListing,
  editProfile,
  getAllUserHouseListings,
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
router.route("/get-listings/:id").get(verifyJWT, getAllUserHouseListings);
router.route("/delete-listing/:id").delete(verifyJWT, deleteUserHouseListing);

export default router;
