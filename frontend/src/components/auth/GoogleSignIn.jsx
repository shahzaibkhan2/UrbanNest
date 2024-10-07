import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase/firebaseConfig";
import axios from "axios";
import { setAuthUser } from "../../store/features/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const GoogleSignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // <======== Firebase Google Authentication Methods and Functions ========>

  const googleSignInHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const googleResponse = await signInWithPopup(auth, provider);

      const response = await axios.post(
        `${apiUri.baseUri}/${apiUri.usersUri}/google-signin`,
        {
          username: googleResponse.user.displayName,
          email: googleResponse.user.email,
          profilePicture: googleResponse.user.photoURL,
        }
      );

      if (response.data.success) {
        dispatch(setAuthUser(response.data.data));
        navigate("/");
      }
    } catch (error) {
      console.log("Sorry ! Internal server error occured.", error);
      navigate("/auth");
    }
  };
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
