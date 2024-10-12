import { HouseListing } from "../models/houseListing.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import getDataUri from "../utils/dataUri.js";

// Register User
const createListing = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    address,
    normalPrice,
    discountPrice,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    offer,
    houseType,
    owner,
  } = req.body;

  const imageFiles = req.files;

  if (
    !title ||
    !description ||
    !address ||
    !normalPrice ||
    !bedrooms ||
    !bathrooms ||
    !parking ||
    !furnished ||
    !offer ||
    !houseType ||
    !owner
  ) {
    throw new ApiError(
      401,
      "Some fields are missing. All fields are required."
    );
  }

  const uploadPromises = await imageFiles?.map(async (file) => {
    const fileUri = getDataUri(file);
    return await uploadOnCloudinary(fileUri);
  });

  const uploadResponses = await Promise.all(uploadPromises);

  const uploadImages = uploadResponses.map((res) => res.secure_url);

  const createdListing = await HouseListing.create({
    title,
    description,
    address,
    normalPrice,
    discountPrice: discountPrice || 0,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    offer,
    houseType,
    owner,
    houseImages: uploadImages,
  });

  if (!createdListing) {
    throw new ApiError(
      401,
      "Sorry ! Listing could not be created due to some internal server error."
    );
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        createdListing,
        "House listing created successfully !"
      )
    );
});

export { createListing };
