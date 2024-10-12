import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { createListing } from "../controllers/listing.controller.js";

const router = Router();

router
  .route("/create-listing")
  .post(upload.array("houseImages[]", 5), createListing);

export default router;
