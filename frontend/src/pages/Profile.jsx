import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div class="p-10 xs:p-16">
      <div class="p-8 bg-white shadow mt-24">
        <div class="grid grid-cols-1 md:grid-cols-3">
          <div class="relative">
            <div class="size-28 xss:size-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
              <img
                src={user?.user?.profilePicture}
                alt="profile-picture"
                className="rounded-full"
              />
            </div>
          </div>
          <div class="space-x-0 xss:space-x-8 flex flex-col xss:flex-row gap-6 xss:gap-0 xss:justify-between mt-32 md:mt-0 md:justify-center pl-0 md:pl-32 lg:pl-0">
            <button class="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5 w-full xss:w-fit text-nowrap">
              Edit Profile
            </button>
            <button class="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5 w-full xss:w-fit text-nowrap">
              Logout
            </button>
          </div>
        </div>
        <div class="mt-20 text-center border-b pb-12">
          <label className="font-semibold text-md text-blue-900">Name</label>
          <h1 class="text-4xl font-medium text-gray-700">
            {user?.user?.username
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </h1>
          <div className="mt-8">
            <label className="font-semibold text-md text-blue-900">Email</label>
            <p class="font-light text-gray-600">{user?.user?.email}</p>
          </div>
        </div>
        <div class="mt-12 flex flex-col justify-center">
          <div class="flex flex-col gap-6 mt-12 md:mt-0 justify-center items-center">
            <button class="text-white py-2 px-4 uppercase rounded bg-green-400 hover:bg-green-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5 w-full sm:w-1/2 text-nowrap">
              Edit Profile
            </button>
            <button class="text-white py-2 px-4 uppercase rounded bg-red-700 hover:bg-red-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5 w-full sm:w-1/2 text-nowrap">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
