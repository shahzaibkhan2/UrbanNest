import { useContext } from "react";
import { ProfileContext } from "../context/ProfileContext";

export const useProfileContext = () => {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error("Profile context is missing !");
  }
  return context;
};
