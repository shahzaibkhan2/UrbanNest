import React, { useRef, useState } from "react";
import { BlueButton } from "../components";
import { Loader2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const CreateHouseListing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

    // Making a Form of Data
    const formData = new FormData();
    formData.append("houseImages", images);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("address", data.address);
    formData.append("normalPrice", data.normalPrice);
    formData.append("discountPrice", data.discountPrice);
    formData.append("bedrooms", data.bedrooms);
    formData.append("bathrooms", data.bathrooms);
    formData.append("parking", data.parking);
    formData.append("furnished", data.furnished);
    formData.append("offer", data.offer);
    formData.append("houseType", data.houseType);
    formData.append("owner", data.owner);

    // API Call
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
                    value: 20,
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
                    value: 100,
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
                placeholder="Address"
                {...register("Address", {
                  required: true,
                  minLength: {
                    value: 4,
                    message:
                      "Address characters should be greater than or equal to 4.",
                  },
                  maxLength: {
                    value: 80,
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
                {...register("furnished", { required: true })}
              />
              <span className="text-md text-blue-900 font-semibold">
                Furnished
              </span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                className="size-5"
                {...register("parking", { required: true })}
              />
              <span className="text-md text-blue-900 font-semibold">
                Parking Garrage
              </span>
            </div>
            <div className="flex gap-2">
              <input
                type="radio"
                value="sell"
                className="size-5"
                {...register("houseType", { required: true })}
              />
              <span className="text-md text-blue-900 font-semibold">Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                type="radio"
                value="rent"
                className="size-5"
                {...register("houseType", { required: true })}
              />
              <span className="text-md text-blue-900 font-semibold">Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                className="size-5"
                {...register("offer", { required: true })}
              />
              <span className="text-md text-blue-900 font-semibold">Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6 mb-10">
            <div className="flex gap-3 items-center">
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="number"
                placeholder="$100"
                min="1"
                {...register("price", { required: true, min: 1 })}
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

            <div className="flex gap-2 items-center">
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="number"
                placeholder="$100"
                min="1"
                {...register("discountPrice", { required: true })}
                id="discountPrice"
              />
              <label
                htmlFor="discountPrice"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >
                Discount Price
              </label>
            </div>
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
          <BlueButton type="submit">
            <Loader2 className="animate-spin" />
            Create List
          </BlueButton>
        </section>
      </form>
    </main>
  );
};

export default CreateHouseListing;
