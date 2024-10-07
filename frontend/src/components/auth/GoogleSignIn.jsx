import { FcGoogle } from "react-icons/fc";
import { useAuthContext } from "../../hooks/UseAuth";

const GoogleSignIn = () => {
  const { googleSignInHandler } = useAuthContext();
  return (
    <button
      onClick={googleSignInHandler}
      className="bg-green-800 w-full hover:bg-green-950 transition duration-300 text-white font-bold px-9 py-2 my-4 rounded-lg flex items-center justify-center gap-2 text-lg"
      type="button"
    >
      <FcGoogle size={20} />
      Google
    </button>
  );
};

export default GoogleSignIn;
