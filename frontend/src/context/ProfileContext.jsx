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

  // <===================================== Refs =======================================>

  // <============================= Custom Variables and Logics =========================>

  // React Hook Form

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

  // Handle Click on div to recieve input

  // Handle image upload

  // Endpoint

  // API Call

  const profileContextValues = {
    deleteProfileHandler,
    logoutProfileHandler,
    getAllUserListings,
    deleteUserListingHandler,
    showUserListings,
    setShowUserListings,
  };

  return (
    <ProfileContext.Provider value={profileContextValues}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContextProvider;
