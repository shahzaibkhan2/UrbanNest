import { FcGoogle } from "react-icons/fc";

const GoogleSignIn = () => {
  return (
    <button
      className="bg-green-300 w-full hover:bg-green-400 transition duration-300 text-blue-900 font-bold px-9 py-2 my-4 rounded-lg flex items-center justify-center gap-2 text-lg"
      type="button"
    >
      <FcGoogle size={20} />
      Google
    </button>
  );
};

export default GoogleSignIn;
