import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdOutlineDelete } from "react-icons/md";
import { Heading } from "../components";
import { RiEditBoxLine, RiLogoutCircleRLine } from "react-icons/ri";
import { MdOutlineNoAccounts } from "react-icons/md";
import { IoListCircleOutline } from "react-icons/io5";
import { useProfileContext } from "../hooks/useProfileContext";

const Profile = () => {
  const {
    deleteProfileHandler,
    logoutProfileHandler,
    getAllUserListings,
    deleteUserListingHandler,
    showUserListings,
    setShowUserListings,
  } = useProfileContext();
  const { user } = useSelector((state) => state.auth);
  const { listingData } = useSelector((state) => state.listing);

  return (
    <main className="mt-20">
      <section className="px-7">
        <article className="h-full bg-gray-200 p-8">
          <div className="bg-white rounded-lg shadow-xl pb-8">
            <div className="w-full h-[250px]">
              <img
                src="https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg"
                className="w-full h-full rounded-tl-lg rounded-tr-lg"
              />
            </div>
            <div className="flex flex-col items-center -mt-20">
              <img
                src={user?.user?.avatar}
                alt="avatar"
                className="w-40 border-4 border-white rounded-full"
              />
              <div className="flex items-center space-x-2 mt-2">
                <p className="text-2xl capitalize">{user?.user?.username}</p>
                <span className="bg-blue-500 rounded-full p-1" title="Verified">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gray-100 h-2.5 w-2.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="4"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </span>
              </div>
              <p className="text-gray-700">{user?.user?.email}</p>
              <p className="text-sm text-gray-500">
                {user?.user?.city}, {user?.user?.state}
              </p>
            </div>
            <div className="flex-1 flex flex-col items-center lg:items-end justify-end px-8 mt-12">
              <div className="flex items-center flex-wrap space-x-4 space-y-3 mt-2">
                <Link to="/edit-profile" className="ml-4 mt-3">
                  <button className="flex gap-1 items-center bg-blue-900 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition transform hover:-translate-y-0.5 shadow-lg">
                    <RiEditBoxLine />
                    Edit Profile
                  </button>
                </Link>
                <button
                  onClick={logoutProfileHandler}
                  className="flex gap-1 items-center bg-blue-900 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition transform hover:-translate-y-0.5 shadow-lg"
                >
                  <RiLogoutCircleRLine />
                  Logout
                </button>
                <button
                  onClick={deleteProfileHandler}
                  className="flex gap-1 items-center bg-blue-900 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition transform hover:-translate-y-0.5 shadow-lg"
                >
                  <MdOutlineNoAccounts size={16} />
                  Delete Profile
                </button>
                <Link to="/create-listing">
                  <button className="flex gap-1 items-center bg-blue-900 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition transform hover:-translate-y-0.5 shadow-lg">
                    <IoListCircleOutline size={16} />
                    Create List
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
            <div className="w-full flex flex-col 2xl:w-1/3">
              <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
                <h4 className="text-xl text-gray-900 font-bold">
                  Personal Info
                </h4>
                <ul className="mt-2 text-gray-700">
                  <li className="flex border-y py-2">
                    <span className="font-bold w-24">Full name:</span>
                    <span className="text-gray-700 capitalize">
                      {user?.user?.username}
                    </span>
                  </li>
                  <li className="flex border-b py-2">
                    <span className="font-bold w-24">Joined:</span>
                    <span className="text-gray-700">
                      {new Date(user?.user?.createdAt).toLocaleDateString()}
                    </span>
                  </li>
                  <li className="flex border-b py-2">
                    <span className="font-bold w-24">Mobile:</span>
                    <span className="text-gray-700">(123) 123-1234</span>
                  </li>
                  <li className="flex border-b py-2">
                    <span className="font-bold w-24">Email:</span>
                    <span className="text-gray-700">{user?.user?.email}</span>
                  </li>
                  <li className="flex border-b py-2">
                    <span className="font-bold w-24">Location:</span>
                    <span className="text-gray-700">
                      {user?.user?.city}, {user?.user?.state}
                    </span>
                  </li>
                  <li className="flex border-b py-2">
                    <span className="font-bold w-24">Languages:</span>
                    <span className="text-gray-700">English, Spanish</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </article>
      </section>
      <section className="ml-16 md:mx-auto w-[12%] text-nowrap">
        <button
          onClick={() => {
            if (showUserListings === false) getAllUserListings();
            setShowUserListings((prev) => !prev);
          }}
          className="w-fit font-semibold text-xl text-blue-900 underline hover:text-blue-950 hover:no-underline duration-300 transition py-10"
        >
          {showUserListings ? "Hide House Listings" : "Show house listings"}
        </button>
      </section>
      {showUserListings && (
        <section className="w-full p-16">
          <Heading>Your Houses Listings</Heading>
          <article className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full">
            {listingData?.map((item) => (
              <div
                key={item?._id}
                className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              >
                <Link to="#">
                  <img
                    className="rounded-t-lg object-cover w-full"
                    src={item?.houseImages[0]}
                    alt="house-image"
                  />
                </Link>
                <div className="p-5">
                  <Link to="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {item?.title}
                    </h5>
                  </Link>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {item?.description}
                  </p>
                  <div className="flex-col gap-3 xvs:gap-2 xvs:flex-row flex items-center justify-between">
                    <Link to={`/edit-listing/${item?._id}`}>
                      <button className="flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Edit <RiEditBoxLine size={16} />
                      </button>
                    </Link>
                    <button
                      onClick={() => deleteUserListingHandler(item?._id)}
                      className="flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                    >
                      Delete <MdOutlineDelete size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </article>
        </section>
      )}
    </main>
  );
};

export default Profile;
