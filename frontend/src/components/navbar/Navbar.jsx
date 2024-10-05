import { IoSearchSharp } from "react-icons/io5";

const Navbar = () => {
  return (
    <header className="fixed top-0 bg-yellow-300 shadow-md w-full">
      <div className="max-w-[1336px] mx-auto flex justify-between items-center h-20 px-4">
        <h1 className="text-xl sm:text-2xl font-bold flex flex-nowrap">
          <span className="text-blue-700">Urban</span>
          <span className="text-blue-900">Nest</span>
        </h1>
        <form className="flex items-center bg-yellow-200 rounded-lg p-3">
          <input
            type="text"
            placeholder="Search..."
            className="focus:outline-none bg-transparent text-blue-900 text-md md:text-lg w-24 sm:w-64"
          />
          <IoSearchSharp className="text-blue-900 size-6" />
        </form>
      </div>
    </header>
  );
};

export default Navbar;
