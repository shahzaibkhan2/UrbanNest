import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { apiUri } from "../constants/apiRoutes";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setAuthUser } from "../store/features/authSlice";
import { MdOutlineArrowBack } from "react-icons/md";

const EditProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const profilePicRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState({
    preview: null,
    imageUrl: null,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

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

  // Edit Profile
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

  return (
    <div className="w-full mt-32 px-10">
      <form
        onSubmit={handleSubmit(editProfileHandler)}
        className="w-full max-w-2xl mx-auto flex flex-col"
      >
        <input
          ref={profilePicRef}
          type="file"
          accept="image/*"
          hidden
          name="avatar"
          onChange={handleImageChange}
        />
        <Link to="/profile">
          <div className="flex flex-col text-blue-900 size-12 sm:size-14 rounded-full bg-yellow-300 items-center justify-center">
            <MdOutlineArrowBack className="size-8 sm:size-10" />
          </div>
        </Link>
        <div className="size-32 rounded-full mx-auto">
          <img
            onClick={() =>
              profilePicRef.current && profilePicRef.current.click()
            }
            src={
              selectedImage.preview ? selectedImage.preview : user?.user?.avatar
            }
            alt="profile-picture"
            className="size-full object-cover rounded-full cursor-pointer"
          />
        </div>
        <div className="flex flex-wrap -mx-3 mt-10 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-blue-900 text-xs font-bold mb-2"
              for="grid-name"
            >
              Name
            </label>
            <input
              className={`appearance-none block w-full bg-yellow-100 text-blue-900 border ${
                errors?.name?.message ? "border-red-500" : "border-yellow-100"
              } rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
              id="grid-username"
              type="text"
              placeholder={user?.user?.username || "Jhon"}
              name="username"
              {...register("username", {
                required: true,
                minLength: {
                  value: 3,
                  message:
                    "Name characters should be greater than or equal to 3.",
                },
                maxLength: {
                  value: 12,
                  message: "Name characters should not be more than 12.",
                },
              })}
            />
            <p className="text-red-500 text-xs italic">
              {errors && errors?.name?.message}
            </p>
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-blue-900 text-xs font-bold mb-2"
              for="grid-email"
            >
              Email
            </label>
            <input
              className={`appearance-none block w-full bg-yellow-100 text-blue-900 ${
                errors?.email?.message ? "border-red-500" : "border-yellow-100"
              } border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
              id="grid-email"
              type="email"
              name="email"
              placeholder={user?.user?.email || "Jhon@example.com"}
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^(?:(?:[\w`~!#$%^&*\-=+;:{}'|,?\/]+(?:(?:\.(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?\/\.()<>\[\] @]|\\"|\\\\)*"|[\w`~!#$%^&*\-=+;:{}'|,?\/]+))*\.[\w`~!#$%^&*\-=+;:{}'|,?\/]+)?)|(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?\/\.()<>\[\] @]|\\"|\\\\)+"))@(?:[a-zA-Z\d\-]+(?:\.[a-zA-Z\d\-]+)*|\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])$/.test(
                      value
                    ) || "Email must be a valid email.",
                },
              })}
            />
            <p className="text-red-500 text-xs italic">
              {errors && errors?.email?.message}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-blue-900 text-xs font-bold mb-2"
              for="grid-password"
            >
              Password
            </label>
            <input
              className={`appearance-none block w-full bg-yellow-100 text-blue-900 border ${
                errors?.password?.message
                  ? "border-red-500"
                  : "border-yellow-100"
              } rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
              id="grid-password"
              type="password"
              name="password"
              placeholder="******************"
              {...register("password", {
                required: true,
                minLength: {
                  value: 8,
                  message: "Password should be atleast 8 characters long.",
                },
                maxLength: {
                  value: 20,
                  message:
                    "Password should not exceed more than 20 characters.",
                },
              })}
            />
            <p className="text-gray-600 text-xs italic">
              {errors
                ? errors?.password?.message
                : "Please choose a strong combination with special letters."}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-blue-900 text-xs font-bold mb-2"
              for="grid-city"
            >
              City
            </label>
            <input
              className={`appearance-none block w-full bg-yellow-100 text-gray-700 border ${
                errors?.city?.message ? "border-red-500" : "border-yellow-100"
              } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
              id="grid-city"
              type="text"
              placeholder={user?.user?.city || "New York"}
              name="city"
              {...register("city", {
                minLength: {
                  value: 3,
                  message:
                    "City name characters should be greater than or equal to 3.",
                },
                maxLength: {
                  value: 12,
                  message: "City name characters should not be more than 12.",
                },
              })}
            />
            <p className="text-red-500 text-xs italic">
              {errors && errors?.city?.message}
            </p>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-blue-900 text-xs font-bold mb-2"
              for="grid-state"
            >
              State
            </label>
            <div className="relative">
              <select
                name="state"
                className={`block appearance-none w-full bg-yellow-100 border ${
                  errors?.state?.message
                    ? "border-red-500"
                    : "border-yellow-100"
                } text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                id="grid-state"
                {...register("state", {
                  minLength: {
                    value: 3,
                    message:
                      "State name characters should be greater than or equal to 3.",
                  },
                  maxLength: {
                    value: 12,
                    message:
                      "State name characters should not be more than 12.",
                  },
                })}
              >
                <p className="text-red-500 text-xs italic">
                  {errors && errors?.state?.message}
                </p>
                <option>{user?.user?.state || "New York"}</option>
                <option>California</option>
                <option>Mexico</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-blue-900 text-xs font-bold mb-2"
              for="grid-zip"
            >
              Zip
            </label>
            <input
              className={`appearance-none block w-full bg-yellow-100 text-gray-700 border ${
                errors?.zip?.message ? "border-red-500" : "border-yellow-100"
              } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
              id="grid-zip"
              type="number"
              placeholder={user?.user?.zip || "93102"}
              name="zip"
              {...register("zip", {
                minLength: {
                  value: 3,
                  message:
                    "Zip code digits should be greater than or equal to 3.",
                },
                maxLength: {
                  value: 12,
                  message: "Zip digits should not be more than 6.",
                },
              })}
            />
            <p className="text-red-500 text-xs italic">
              {errors && errors?.zip?.message}
            </p>
          </div>
        </div>
        <button
          className="bg-blue-900 w-full hover:bg-blue-950 transition duration-300 text-white px-9 py-2 my-4 mt-8 rounded-lg flex items-center justify-center gap-2 text-md md:text-lg uppercase tracking-wide font-semibold"
          type="submit"
        >
          {isSubmitting && <Loader2 className="animate-spin text-white" />}
          {isSubmitting ? "Editing" : "Edit now"}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
