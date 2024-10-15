import { createContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { apiUri } from "../constants/apiRoutes";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "../store/features/authSlice";
import {
  setFilterDeletedListings,
  setListingData,
} from "../store/features/listingSlice";

export const ProfileContext = createContext(null);

const ProfileContextProvider = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // <========================== States ===========================>

  const [showUserListings, setShowUserListings] = useState(false);
  const [selectedImage, setSelectedImage] = useState({
    preview: null,
    imageUrl: null,
  });

  // <===================================== Refs =======================================>

  const profilePicRef = useRef(null);
  // <============================= Custom Variables and Logics =========================>

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  // <============================= Handlers and Methods/Functions =========================>

  // Delete Profile
  const deleteProfileHandler = async () => {
    try {
      const response = await axios.delete(
        `${apiUri.baseUri}/${apiUri.usersUri}/delete-profile/${user?.user?._id}`,
        { withCredentials: true }
      );

      if (response.data.success) {
        dispatch(setAuthUser(null));
        toast.success("Profile Deleted successfully !");
        navigate("/auth");
      } else {
        toast.error(
          "Sorry ! There is some issue and profile could not be deleted."
        );
      }
    } catch (error) {
      toast.error("Sorry !", error.message);
    }
  };

  // Logout
  const logoutProfileHandler = async () => {
    try {
      const response = await axios.get(
        `${apiUri.baseUri}/${apiUri.usersUri}/logout`,
        { withCredentials: true }
      );

      if (response.data.success) {
        dispatch(setAuthUser(null));
        toast.success("Profile logged out successfully !");
        navigate("/auth");
      } else {
        toast.error(
          "Sorry ! There is some issue and profile could not be logged out."
        );
      }
    } catch (error) {
      toast.error("Sorry !", error.message);
    }
  };

  //   Get All User Listings
  const getAllUserListings = async () => {
    try {
      const response = await axios.get(
        `${apiUri.baseUri}/${apiUri.usersUri}/get-listings/${user?.user?._id}`,
        { withCredentials: true }
      );

      if (response.data.success) {
        dispatch(setListingData(response.data.data));
      } else {
        toast.error(
          "Sorry ! There is some issue and house listings could not be fetched."
        );
      }
    } catch (error) {
      toast.error("Sorry !", error.message);
    }
  };

  //   Delete User Listing
  const deleteUserListingHandler = async (listingId) => {
    try {
      const response = await axios.delete(
        `${apiUri.baseUri}/${apiUri.usersUri}/delete-listing/${listingId}`,
        { withCredentials: true }
      );

      if (response.data.success) {
        dispatch(setFilterDeletedListings(user?.user?._id));
        setShowUserListings(true);
        toast.success("House listing deleted successfully !");
      } else {
        toast.error(
          "Sorry ! There is some issue and house listing could not be deleted."
        );
      }
    } catch (error) {
      toast.error("Sorry !", error.message);
    }
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage({ imageUrl: file, preview: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Edit Profile Handler
  const editProfileHandler = async (data) => {
    const formData = new FormData();
    formData.append("avatar", selectedImage.imageUrl);
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("city", data.city);
    formData.append("state", data.state);
    formData.append("zip", data.zip);

    try {
      const response = await axios.post(
        `${apiUri.baseUri}/${apiUri.usersUri}/edit-profile/${user?.user?._id}`,
        formData,
        { withCredentials: true }
      );

      if (response.data.success) {
        dispatch(setAuthUser(response.data.data));
        toast.success("Profile updated successfully !");
        navigate("/profile");
      } else {
        toast.error("Sorry ! There is some issue with the form submission.");
      }
    } catch (error) {
      toast.error("Sorry !", error.message);
    }
  };

  // Endpoint

  // API Call

  const profileContextValues = {
    deleteProfileHandler,
    logoutProfileHandler,
    getAllUserListings,
    deleteUserListingHandler,
    showUserListings,
    setShowUserListings,
    selectedImage,
    setSelectedImage,
    profilePicRef,
    register,
    handleSubmit,
    isSubmitting,
    errors,
    handleImageChange,
    editProfileHandler,
  };

  return (
    <ProfileContext.Provider value={profileContextValues}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContextProvider;
