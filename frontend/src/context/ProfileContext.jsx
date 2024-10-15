import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ProfileContext = createContext(null);

const ProfileContextProvider = ({ children }) => {
  const navigate = useNavigate();

  // <========================== States ===========================>
  const [selectedImage, setSelectedImage] = useState({
    coverImageUrl: null,
    coverImagePreview: null,
    imageOneUrl: null,
    imageOnePreview: null,
    imageTwoUrl: null,
    imageTwoPreview: null,
    imageThreeUrl: null,
    imageThreePreview: null,
    imageFourUrl: null,
    imageFourPreview: null,
  });
  const tempPush = () => {
    console.log("I am dummy !");
    navigate("/auth");
  };
  const profileContextValues = { tempPush, selectedImage, setSelectedImage };
  return (
    <ProfileContext.Provider value={profileContextValues}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContextProvider;
