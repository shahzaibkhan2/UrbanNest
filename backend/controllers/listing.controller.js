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
    !houseType
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
    owner: req?.user?._id,
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

// Update User House Listing
const editUserHouseListing = asyncHandler(async (req, res) => {
  const userId = req?.user?._id;
  const id = req?.params?.listingId;
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
    !houseType
  ) {
    throw new ApiError(
      401,
      "Some fields are missing. All fields are required."
    );
  }

  const isUser = await HouseListing.findById(id);

  if (!userId.equals(isUser?.owner)) {
    throw new ApiError(401, "Sorry ! Invalid profile ID.");
  }

  const uploadPromises = await imageFiles?.map(async (file) => {
    const fileUri = getDataUri(file);
    return await uploadOnCloudinary(fileUri);
  });

  const uploadResponses = await Promise.all(uploadPromises);

  const uploadImages = uploadResponses.map((res) => res.secure_url);

  const houseListing = await HouseListing.findByIdAndUpdate(
    id,
    {
      $set: {
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
        houseImages: uploadImages,
      },
    },
    { new: true }
  );

  if (!houseListing) {
    throw new ApiError(
      500,
      "Sorry ! House listing could not be updated due to some internal server error."
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "House listing updated successfully !"));
});

const getSingleListing = asyncHandler(async (req, res) => {
  const userId = req?.user?._id;
  const { listingId } = req?.params;

  // if (!userId)
  //   throw new ApiError("Sorry ! Sign in first to contact with the user.");
  const isListing = await HouseListing.findById(listingId)
    .populate("owner", "username")
    .select("-password");
  if (!isListing)
    throw new ApiError("Sorry ! Listing with this ID does not exists.");

  return res
    .status(200)
    .json(new ApiResponse(200, isListing, "Listing fetched successfully !"));
});
const getAllListings = asyncHandler(async (req, res) => {
  const limit = parseInt(req?.query?.limit) || 9;
  const skip = parseInt(req?.query?.skip) || 0;

  let furnished = req?.query?.furnished;
  if (furnished === undefined || furnished === "false")
    furnished = { $in: [false, true] };

  let offer = req?.query?.offer;
  if (offer === undefined || offer === "false") offer = { $in: [false, true] };

  let houseType = req?.query?.houseType;
  if (houseType === undefined || houseType === "all")
    houseType = { $in: ["sell", "rent"] };

  let parking = req?.query?.parking;
  if (parking === undefined || parking === "false")
    parking = { $in: [false, true] };

  const sort = req?.query?.sort || "createdAt";
  const order = req?.query?.order || "desc";
  const searchParam = req?.query?.searchParam || "";

  const allListings = await HouseListing.find({
    title: { $regex: searchParam, $options: "i" },
    furnished,
    offer,
    houseType,
    parking,
  })
    .sort({ [sort]: order })
    .skip(skip)
    .limit(limit);

  return res
    .status(200)
    .json(new ApiResponse(200, allListings, "Listings fetched successfully !"));
});

export {
  createListing,
  editUserHouseListing,
  getSingleListing,
  getAllListings,
};
