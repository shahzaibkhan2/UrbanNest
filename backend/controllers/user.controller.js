import { httpOptions } from "../constants.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Generate Access Token
const generateAccessToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = user.generateAccessToken();

    return { accessToken };
  } catch (error) {
    throw new ApiError(
      500,
      error.message ||
        "Something went wrong while generating access and refresh token !"
    );
  }
};

// Register User
const registerUser = asyncHandler(async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    throw new ApiError(
      401,
      "Some fields are missing. All fields are required."
    );
  }

  const isUser = await User.findOne({ email });

  if (isUser) {
    throw new ApiError(
      401,
      "User with this email address already exists. Please try other email address."
    );
  }

  const createdUser = await User.create({
    username,
    email,
    password,
  });

  if (!createdUser) {
    throw new ApiError(500, "Internal server error and registeration failed.");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, "Registeration successful !"));
});

// Login User

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!password || !email) {
    throw new ApiError(
      401,
      "Some fields are missing. All fields are required."
    );
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(401, "Invalid email or password.");
  }

  const isPasswordChecked = await user.isPasswordCorrect(password);

  if (!isPasswordChecked) {
    throw new ApiError(
      401,
      "Invalid password. Please provide a correct password."
    );
  }

  const { accessToken } = await generateAccessToken(user._id);

  if (!accessToken) {
    throw new ApiError(
      500,
      "Access token could not be created due to internal server error."
    );
  }

  const filteredUser = await User.findById(user?._id).select("-password");

  return res
    .status(200)
    .cookie("accessToken", accessToken, httpOptions)
    .json(new ApiResponse(200, { user: filteredUser }, "Login successful !"));
});

// Logout User
const logoutUser = asyncHandler(async (req, res) => {
  const userId = req?.user?._id;
  if (!userId) {
    throw new ApiError(401, "Access token is expired or missing.");
  }

  const verifiedUser = await User.findById(userId);
  if (!verifiedUser) {
    throw new ApiError(401, "Invalid user credentials !");
  }
  const options = {
    httpOnly: true,
    secure: true,
    maxAge: 0,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, "Logged out successfully !"));
});

// Get Profile

const getUserProfile = asyncHandler(async (req, res) => {
  const userId = req?.user?._id;
  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new ApiError(401, "Invalid id. Please provide a valid id.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Successfully got the user."));
});

export { registerUser, loginUser, logoutUser, getUserProfile };