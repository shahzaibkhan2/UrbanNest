import { createContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { apiUri } from "../constants/apiRoutes";
import { toast } from "sonner";
import axios from "axios";

export const MainContext = createContext(null);

const MainContextProvider = ({ children }) => {
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
  const [showDiscount, setShowDiscount] = useState(false);
  const [listingParam, setListingParam] = useState(null);

  // <===================================== Refs =======================================>

  const coverImgRef = useRef(null);
  const imgOneRef = useRef(null);
  const imgTwoRef = useRef(null);
  const imgThreeRef = useRef(null);
  const imgFourRef = useRef(null);

  // <============================= Custom Variables and Logics =========================>

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  // Images Array
  const images = [
    selectedImage.coverImageUrl,
    selectedImage.imageOneUrl,
    selectedImage.imageTwoUrl,
    selectedImage.imageThreeUrl,
    selectedImage.imageFourUrl,
  ];

  // <============================= Handlers and Methods/Functions =========================>

  // Handle Click on div to recieve input
  const handleClick = (imgNum) => {
    if (coverImgRef.current && imgNum === "cover") {
      coverImgRef.current.click();
    } else if (imgOneRef.current && imgNum === "one") {
      imgOneRef.current.click();
    } else if (imgTwoRef.current && imgNum === "two") {
      imgTwoRef.current.click();
    } else if (imgThreeRef.current && imgNum === "three") {
      imgThreeRef.current.click();
    } else if (imgFourRef.current && imgNum === "four") {
      imgFourRef.current.click();
    }
  };

  // Handle image upload
  const handleImageChange = (e, imgNum) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (imgNum === "cover") {
          setSelectedImage((prev) => ({
            ...prev,
            coverImageUrl: file,
            coverImagePreview: reader.result,
          }));
        } else if (imgNum === "one") {
          setSelectedImage((prev) => ({
            ...prev,
            imageOneUrl: file,
            imageOnePreview: reader.result,
          }));
        } else if (imgNum === "two") {
          setSelectedImage((prev) => ({
            ...prev,
            imageTwoUrl: file,
            imageTwoPreview: reader.result,
          }));
        } else if (imgNum === "three") {
          setSelectedImage((prev) => ({
            ...prev,
            imageThreeUrl: file,
            imageThreePreview: reader.result,
          }));
        } else if (imgNum === "four") {
          setSelectedImage((prev) => ({
            ...prev,
            imageFourUrl: file,
            imageFourPreview: reader.result,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const submitFormHandler = async (data) => {
    if (
      data.discountPrice &&
      parseFloat(data.discountPrice) > data.normalPrice &&
      parseFloat(data.normalPrice)
    ) {
      toast.error("Sorry ! Discount price should be lower than normal price");
    }

    // Making a Form of Data
    const formData = new FormData();
    if (images.length > 0) {
      images.forEach((image) => formData.append("houseImages[]", image));
    } else {
      toast.error("Please upload images.");
    }
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("address", data.address);
    formData.append("normalPrice", data.normalPrice);
    formData.append("discountPrice", data.discountPrice || 0);
    formData.append("bedrooms", data.bedrooms);
    formData.append("bathrooms", data.bathrooms);
    formData.append("parking", data.parking);
    formData.append("furnished", data.furnished);
    formData.append("offer", data.offer);
    formData.append("houseType", data.houseType);

    // Endpoint

    const endPoint = listingParam
      ? `edit-listing/${listingParam.storedListingParam}`
      : "create-listing";

    // API Call
    try {
      const response = await axios.post(
        `${apiUri.baseUri}/${apiUri.houseListingUri}/${endPoint}`,
        formData,
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success(
          listingParam
            ? "House listing updated successfully !"
            : "House listing created successfully !"
        );
        navigate("/profile");
      } else {
        toast.error("Sorry ! There is some issue with the form submission.");
      }
    } catch (error) {
      toast.error("Sorry ! Some error occured.", error.message);
    }
  };

  const mainContextValues = {
    selectedImage,
    showDiscount,
    setShowDiscount,
    handleClick,
    handleImageChange,
    register,
    handleSubmit,
    isSubmitting,
    submitFormHandler,
    coverImgRef,
    imgOneRef,
    imgTwoRef,
    imgThreeRef,
    imgFourRef,
    setListingParam,
  };

  return (
    <MainContext.Provider value={mainContextValues}>
      {children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;
