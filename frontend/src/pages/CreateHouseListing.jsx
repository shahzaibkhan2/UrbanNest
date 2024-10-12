import React, { useRef, useState } from "react";
import { BlueButton } from "../components";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { apiUri } from "../constants/apiRoutes";
import axios from "axios";
import { setListingData } from "../store/features/listingSlice";

const CreateHouseListing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  // States
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

  // Refs
  const coverImgRef = useRef(null);
  const imgOneRef = useRef(null);
  const imgTwoRef = useRef(null);
  const imgThreeRef = useRef(null);
  const imgFourRef = useRef(null);

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

  // Form Submission

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  // Submit Form Handler

  const submitFormHandler = async (data) => {
    // Images Array
    const images = [
      selectedImage.coverImageUrl,
      selectedImage.imageOneUrl,
      selectedImage.imageTwoUrl,
      selectedImage.imageThreeUrl,
      selectedImage.imageFourUrl,
    ];

    if (
      data.discountPrice &&
      parseFloat(data.discountPrice) > data.normalPrice &&
      parseFloat(data.normalPrice)
    ) {
      toast.error("Sorry ! Discount price should be lower than normal price");
    }

    // Making a Form of Data
    const formData = new FormData();
    images.forEach((image) => formData.append("houseImages[]", image));
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
    formData.append("owner", user?.user?._id);

    // API Call
    try {
      const response = await axios.post(
        `${apiUri.baseUri}/${apiUri.houseListingUri}/create-listing`,
        formData
      );
      console.log(response.data.data);

      if (response.data.success) {
        dispatch(setListingData(response.data.data));
        toast.success("House listing created successfully !");
        // navigate("/profile");
      } else {
        toast.error("Sorry ! There is some issue with the form submission.");
      }
    } catch (error) {
      toast.error("Sorry ! Some error occured.", error.message);
    }
  };

  // <====================================== JSX Section ======================================>

  return (
    <main className="mt-32 flex flex-col create-house-listing gap-16">
      <h1 className="text-center text-3xl font-semibold text-blue-900">
        Create a House List
      </h1>
      <form
        onSubmit={handleSubmit(submitFormHandler)}
        className="max-w-[1000px] lg:max-w-[1200px] flex flex-col lg:flex-row mx-auto gap-20 px-[5%]"
      >
        <section className="flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-3 mb-6">
            <div className="w-full">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="title"
              >
                Title
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                id="title"
                placeholder="Furnished lake side cottage"
                {...register("title", {
                  required: true,
                  minLength: {
                    value: 4,
                    message:
                      "Title characters should be greater than or equal to 4.",
                  },
                  maxLength: {
                    value: 100,
                    message: "Title characters should not be more than 20.",
                  },
                })}
              />
            </div>
            <div className="w-full">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                className="appearance-none block w-full  text-gray-700 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white resize-none"
                type="text"
                id="description"
                placeholder="Description about house..."
                rows="8"
                {...register("description", {
                  required: true,
                  minLength: {
                    value: 4,
                    message:
                      "Description characters should be greater than or equal to 4.",
                  },
                  maxLength: {
                    value: 400,
                    message:
                      "Description characters should not be more than 100.",
                  },
                })}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="address"
              >
                Address
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                id="address"
                placeholder="address"
                {...register("address", {
                  required: true,
                  minLength: {
                    value: 4,
                    message:
                      "Address characters should be greater than or equal to 4.",
                  },
                  maxLength: {
                    value: 200,
                    message: "Address characters should not be more than 80.",
                  },
                })}
              />
            </div>
          </div>
          <div className="pb-8 pt-2 flex justify-between text-nowrap flex-wrap gap-y-8 gap-x-2">
            <div className="flex gap-2">
              <input
                type="checkbox"
                className="size-5"
                {...register("furnished")}
              />
              <span className="text-md text-blue-900 font-semibold">
                Furnished
              </span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                className="size-5"
                {...register("parking")}
              />
              <span className="text-md text-blue-900 font-semibold">
                Parking Garrage
              </span>
            </div>
            <div className="flex gap-2">
              <input
                type="radio"
                value="sell"
                defaultChecked="sell"
                className="size-5"
                {...register("houseType")}
              />
              <span className="text-md text-blue-900 font-semibold">Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                type="radio"
                value="rent"
                className="size-5"
                {...register("houseType")}
              />
              <span className="text-md text-blue-900 font-semibold">Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                onClick={() => setShowDiscount((prev) => !prev)}
                type="checkbox"
                className="size-5"
                {...register("offer")}
              />
              <span className="text-md text-blue-900 font-semibold">Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6 mb-10">
            <div className="flex gap-3 items-center">
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="number"
                defaultValue="100"
                placeholder="$100"
                {...register("normalPrice", {
                  required: true,
                  min: 100,
                  max: 10000000,
                })}
                id="price"
              />
              <label
                htmlFor="price"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >
                Price
              </label>
            </div>
            <div className="flex gap-2 items-center">
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="number"
                defaultValue={1}
                placeholder="1"
                min="1"
                max="8"
                {...register("bathrooms", { required: true })}
                id="bathrooms"
              />
              <label
                htmlFor="bathrooms"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >
                Bathrooms
              </label>
            </div>
            <div className="flex gap-2 items-center">
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="number"
                defaultValue={1}
                placeholder="1"
                min="1"
                max="8"
                {...register("bedrooms", { required: true })}
                id="bedrooms"
              />
              <label
                htmlFor="bedrooms"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >
                Bedrooms
              </label>
            </div>

            {showDiscount && (
              <div className="flex gap-2 items-center">
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="number"
                  placeholder="$0"
                  {...register("discountPrice", {
                    required: true,
                    min: 100,
                    max: 10000000,
                  })}
                  id="discountPrice"
                />
                <label
                  htmlFor="discountPrice"
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                >
                  Discount Price
                </label>
              </div>
            )}
          </div>
        </section>
        <section className="flex flex-col flex-1 text-center">
          <h2 className="text-lg text-green-600 font-semibold mb-8">
            Upload your premises images here
          </h2>
          <div className="flex mb-4 text-md md:text-lg font-semibold text-blue-950 gap-2">
            <div
              onClick={() => handleClick("cover")}
              className="flex justify-center items-center w-2/3 bg-yellow-200 h-40 text-wrap cursor-pointer underline rounded-md shadow-lg"
            >
              {selectedImage?.coverImagePreview ? (
                <img
                  src={
                    selectedImage?.coverImagePreview
                      ? selectedImage?.coverImagePreview
                      : ""
                  }
                  alt="cover-image"
                  className="object-cover size-full overflow-hidden"
                />
              ) : (
                "Choose cover image"
              )}
            </div>
            <div
              onClick={() => handleClick("one")}
              className="flex justify-center items-center w-1/3 bg-yellow-100 h-40 text-wrap cursor-pointer underline rounded-md shadow-lg"
            >
              {selectedImage?.imageOnePreview ? (
                <img
                  src={
                    selectedImage?.imageOnePreview
                      ? selectedImage?.imageOnePreview
                      : ""
                  }
                  alt="image-one"
                  className="object-cover size-full overflow-hidden"
                />
              ) : (
                "Choose image 1"
              )}
            </div>
          </div>

          <div className="flex  mb-4 gap-6">
            <input
              ref={coverImgRef}
              onChange={(e) => handleImageChange(e, "cover")}
              type="file"
              accept="image/*"
              className="hidden"
            />

            <input
              ref={imgOneRef}
              onChange={(e) => handleImageChange(e, "one")}
              type="file"
              accept="image/*"
              className="hidden"
            />
          </div>

          <div className="flex text-md md:text-lg font-semibold text-blue-950 mb-6 gap-2">
            <div
              onClick={() => handleClick("two")}
              className="flex justify-center items-center w-1/2 bg-yellow-100 h-40 text-wrap cursor-pointer underline rounded-md shadow-lg"
            >
              {selectedImage?.imageTwoPreview ? (
                <img
                  src={
                    selectedImage?.imageTwoPreview
                      ? selectedImage?.imageTwoPreview
                      : ""
                  }
                  alt="image-two"
                  className="object-cover size-full overflow-hidden"
                />
              ) : (
                "Choose image 2"
              )}
            </div>
            <div
              onClick={() => handleClick("three")}
              className="flex justify-center items-center w-1/2 bg-yellow-100 h-40 text-wrap cursor-pointer underline rounded-md shadow-lg"
            >
              {selectedImage?.imageThreePreview ? (
                <img
                  src={
                    selectedImage?.imageThreePreview
                      ? selectedImage?.imageThreePreview
                      : ""
                  }
                  alt="image-three"
                  className="object-cover size-full overflow-hidden"
                />
              ) : (
                "Choose image 3"
              )}
            </div>
            <div
              onClick={() => handleClick("four")}
              className="flex justify-center items-center w-1/2 bg-yellow-100 h-40 text-wrap cursor-pointer underline rounded-md shadow-lg"
            >
              {selectedImage?.imageFourPreview ? (
                <img
                  src={
                    selectedImage?.imageFourPreview
                      ? selectedImage?.imageFourPreview
                      : ""
                  }
                  alt="image-four"
                  className="object-cover size-full overflow-hidden"
                />
              ) : (
                "Choose image 4"
              )}
            </div>
          </div>
          <div className="flex gap-6 mt-4">
            <input
              ref={imgTwoRef}
              onChange={(e) => handleImageChange(e, "two")}
              type="file"
              accept="image/*"
              className="hidden"
            />

            <input
              ref={imgThreeRef}
              onChange={(e) => handleImageChange(e, "three")}
              type="file"
              accept="image/*"
              className="hidden"
            />

            <input
              ref={imgFourRef}
              onChange={(e) => handleImageChange(e, "four")}
              type="file"
              accept="image/*"
              className="hidden"
            />
          </div>
          <BlueButton isSubmitting={isSubmitting} type="submit">
            {isSubmitting && <Loader2 className="animate-spin" />}
            {isSubmitting ? "Creating..." : "Create List"}
          </BlueButton>
        </section>
      </form>
    </main>
  );
};

export default CreateHouseListing;
