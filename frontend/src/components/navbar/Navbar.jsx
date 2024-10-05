import { IoSearchSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="fixed top-0 bg-yellow-300 shadow-md w-full">
      <nav className="max-w-[1336px] mx-auto flex justify-between items-center h-20 px-4">
        <Link to="/">
          <h1 className="text-xl sm:text-2xl font-bold flex flex-nowrap">
            <span className="text-blue-700">Urban</span>
            <span className="text-blue-900">Nest</span>
          </h1>
        </Link>
        <form className="flex items-center bg-yellow-200 rounded-lg p-3">
          <input
            type="text"
            placeholder="Search..."
            className="focus:outline-none bg-transparent text-blue-900 text-md md:text-lg w-24 sm:w-64"
          />
          <IoSearchSharp className="text-blue-900 size-6" />
        </form>
        <ul className="flex gap-3 text-md sm:text-lg text-blue-900 font-semibold">
          <Link to="/home">
            <li className="hidden sm:inline cursor-pointer">Home</li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline cursor-pointer">About</li>
          </Link>
          <Link to="/login">
            <li className="cursor-pointer">Login</li>
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
