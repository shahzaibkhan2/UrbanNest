import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middlewares.js";
import {
  createListing,
  editUserHouseListing,
} from "../controllers/listing.controller.js";

const router = Router();

router
  .route("/create-listing")
  .post(upload.array("houseImages[]", 5), verifyJWT, createListing);
router
  .route("/edit-listing")
  .post(upload.array("houseImages[]", 5), verifyJWT, editUserHouseListing);

export default router;
