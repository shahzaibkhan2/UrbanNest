import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { apiUri } from "../constants/apiRoutes";
import { toast } from "sonner";
import { setAuthUser } from "../store/features/authSlice";
import house1 from "../assets/house1.jpg";
import { MdOutlineDelete } from "react-icons/md";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  return (
    <main>
      <section className="p-10 xs:p-16">
        <article className="p-8 bg-white shadow mt-24 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="relative">
              <div className="size-28 xss:size-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                <img
                  src={user?.user?.avatar}
                  alt="profile-picture"
                  className="rounded-full"
                />
              </div>
            </div>
            <div className="space-x-0 xss:space-x-8 flex flex-col xss:flex-row gap-6 xss:gap-0 xss:justify-between mt-32 md:mt-0 md:justify-center pl-0 md:pl-32 lg:pl-0">
              <Link to="/edit-profile">
                <button className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5 w-full xss:w-fit text-nowrap">
                  Edit Profile
                </button>
              </Link>
              <button
                onClick={logoutProfileHandler}
                className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5 w-full xss:w-fit text-nowrap"
              >
                Logout
              </button>
            </div>
          </div>
          <div className="mt-20 text-center border-b pb-12">
            <label className="font-semibold text-md text-blue-900">Name</label>
            <h1 className="text-4xl font-medium text-gray-700 capitalize">
              {user?.user?.username}
            </h1>
            <div className="mt-8">
              <label className="font-semibold text-md text-blue-900">
                Email
              </label>
              <p className="font-light text-gray-600">{user?.user?.email}</p>
            </div>
            <div className="mt-8">
              <label className="font-semibold text-md text-blue-900">
                City
              </label>
              <p className="font-light text-gray-600">{user?.user?.city}</p>
            </div>
            <div className="mt-8">
              <label className="font-semibold text-md text-blue-900">
                State
              </label>
              <p className="font-light text-gray-600">{user?.user?.state}</p>
            </div>
            <div className="mt-8">
              <label className="font-semibold text-md text-blue-900">Zip</label>
              <p className="font-light text-gray-600">{user?.user?.zip}</p>
            </div>
          </div>
          <div className="mt-12 w-full">
            <div className="flex flex-col gap-6 mt-12 md:mt-0 mx-auto items-center">
              <Link
                to="/create-house-listing"
                className="text-white py-2 px-4 uppercase rounded bg-green-400 hover:bg-green-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5 w-full sm:w-1/2 text-nowrap text-center text-xl"
              >
                <button>Create Post</button>
              </Link>

              <button
                onClick={deleteProfileHandler}
                className="text-white py-2 px-4 uppercase rounded bg-red-700 hover:bg-red-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5 w-full sm:w-1/2 text-nowrap"
              >
                Delete Account
              </button>
            </div>
          </div>
        </article>
      </section>
      <section className="w-full p-16">
        <article className="flex gap-x-6 gap-y-16 flex-wrap w-full items-center justify-between">
          {[1, 2, 3, 4, 5].map((item) => (
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <Link to="#">
                <img className="rounded-t-lg" src={house1} alt="house-image" />
              </Link>
              <div className="p-5">
                <Link to="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Noteworthy technology acquisitions 2021
                  </h5>
                </Link>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Here are the biggest enterprise technology acquisitions of
                  2021 so far, in reverse chronological order.
                </p>
                <button className="flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                  Delete <MdOutlineDelete size={18} />
                </button>
              </div>
            </div>
          ))}
        </article>
      </section>
    </main>
  );
};

export default Profile;
