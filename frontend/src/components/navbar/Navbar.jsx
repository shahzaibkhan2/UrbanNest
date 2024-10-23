import { IoSearchSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";
import { CiMenuFries } from "react-icons/ci";
import { useEffect, useRef, useState } from "react";
import { navTitles } from "../../data/navbarData";
import { useSelector } from "react-redux";
import { RiArrowDownSFill } from "react-icons/ri";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");

  const [toggleNavMenu, setToggleNavMenu] = useState(false);
  const NavItem = ({ title, classNameProps }) => {
    return <li className={`cursor-pointer mx-4 ${classNameProps}`}>{title}</li>;
  };

  const searchParamSubmitHandler = (event) => {
    event.preventDefault();
    const searchParamUrl = new URLSearchParams(window.location.search);
    if (!searchInput.trim()) return;
    searchParamUrl.set("searchParam", searchInput);
    const searchQuery = searchParamUrl.toString();
    if (searchQuery) {
      navigate(`/search?${searchQuery}`);
    }
  };

  useEffect(() => {
    const searchParamUrl = new URLSearchParams(location.search);
    const searchParamFromUrl = searchParamUrl.get("searchParam");
    if (searchParamFromUrl && searchParamFromUrl !== searchInput)
      setSearchInput(searchParamFromUrl);
  }, [location.search, searchInput]);

  return (
    <header className="fixed top-0 bg-yellow-300 shadow-md w-full z-[9999]">
      <nav className="max-w-[1536px] mx-auto flex justify-between items-center h-20 px-4 md:pl-22 lg:pl-28">
        <Link to="/">
          <h1 className="text-xl sm:text-2xl font-bold flex flex-nowrap">
            <span className="text-blue-700">Urban</span>
            <span className="text-blue-900">Nest</span>
          </h1>
        </Link>
        <form
          onSubmit={searchParamSubmitHandler}
          className="hidden xvs:flex items-center bg-yellow-200 rounded-lg p-3"
        >
          <input
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            type="text"
            placeholder="Search..."
            className="focus:outline-none bg-transparent text-blue-900 text-md md:text-lg w-24 xs:w-32 lg:w-64"
          />
          <button type="submit">
            <IoSearchSharp className="text-blue-900 size-6" />
          </button>
        </form>
        <ul className="hidden md:flex gap-10 text-md sm:text-lg text-blue-900 font-semibold">
          <Link to="/home">
            <li className="cursor-pointer">Home</li>
          </Link>
          <Link to="/about">
            <li className="cursor-pointer">About</li>
          </Link>

          <Link>
            <li className="cursor-pointer">Contact</li>
          </Link>
        </ul>
        {user?.user ? (
          <div className="hidden sm:flex gap-1 items-center cursor-pointer">
            <img src={user?.user?.avatar} className="size-10 rounded-full" />
            <h2 className="font-semibold text-lg text-blue-900 capitalize">
              {user?.user?.username}
            </h2>
            <RiArrowDownSFill className="size-6 text-blue-900" />
          </div>
        ) : (
          <button
            onClick={() => navigate("/auth")}
            className="hidden sm:block bg-blue-900 w-fit hover:bg-blue-950 transition duration-300 text-white px-9 py-3 rounded-lg"
          >
            Login
          </button>
        )}
        <div className="relative flex text-blue-900 font-bold">
          {toggleNavMenu ? (
            <IoCloseOutline
              fontSize={28}
              className="cursor-pointer md:hidden"
              onClick={() => setToggleNavMenu(false)}
            />
          ) : (
            <CiMenuFries
              fontSize={28}
              className="cursor-pointer md:hidden"
              onClick={() => setToggleNavMenu(true)}
            />
          )}
          {toggleNavMenu && (
            <ul className="fixed flex flex-col items-end justify-start gap-4 rounded-md animate-slide-in yellow-glassmorphism top-0 -right-2 z-10 px-6 py-3 w-[80vw] xvs:w-[70vw] sm:w-[60vw] md:hidden h-screen list-none shadow-2xl">
              <li className="w-full my-2 text-xl">
                <IoCloseOutline
                  onClick={() => setToggleNavMenu(false)}
                  className="cursor-pointer size-10 md:size-12"
                />
              </li>
              {user?.user ? (
                <div className="flex sm:hidden gap-1 items-center cursor-pointer">
                  <img
                    src={user?.user?.avatar}
                    className="size-10 rounded-full"
                  />
                  <h2 className="font-semibold text-lg text-blue-900 capitalize">
                    {user?.user?.username}
                  </h2>
                  <RiArrowDownSFill className="size-6 text-blue-900" />
                </div>
              ) : (
                <button
                  onClick={() => navigate("/auth")}
                  className="bg-blue-900 w-fit hover:bg-blue-950 transition duration-300 text-white px-9 py-3 my-4 rounded-lg sm:hidden"
                >
                  Login
                </button>
              )}
              {navTitles.map((title, index) => (
                <NavItem
                  title={title}
                  key={title + "#" + index}
                  classNameProps="text-lg md:text-xl my-2"
                />
              ))}
              <form className="flex xvs:hidden items-center bg-yellow-200 rounded-lg p-3 border-[1px] border-yellow-400">
                <input
                  type="text"
                  placeholder="Search..."
                  className="focus:outline-none bg-transparent text-blue-900 text-md md:text-lg w-24 xs:w-32 lg:w-64"
                />
                <IoSearchSharp className="text-blue-900 size-6" />
              </form>
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
