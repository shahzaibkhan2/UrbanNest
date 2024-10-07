import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { Loader2 } from "lucide-react";
import GoogleSignIn from "./GoogleSignIn";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiUri } from "../../constants/apiRoutes";
import { toast } from "sonner";
import { useRef, useState } from "react";
import { setAuthUser } from "../../store/features/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //<----------------------- States --------------------------->

  // <====== Authentication States ======>

  const [currentState, setCurrentState] = useState("Login");
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  // <------------------------------ useRef References ------------------------>

  // <====== Authentication useRef References ======>

  const nameRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();

  // <======== Authentication Methods and Functions ========>
  const onAuthSubmitHandler = async (event) => {
    event.preventDefault();
    let authUri = apiUri.usersUri;
    setIsAuthLoading(true);
    try {
      if (currentState === "Login") {
        authUri += "/login";
        const response = await axios.post(
          `${apiUri.baseUri}/${authUri}`,
          {
            password: passRef.current.value,
            email: emailRef.current.value,
          },
          { withCredentials: true }
        );

        if (response.data.success) {
          dispatch(setAuthUser(response.data.data));
          toast.success("Login successful !");
          navigate("/");
        }
      } else {
        authUri += "/register";
        setIsAuthLoading(true);
        const response = await axios.post(
          `${apiUri.baseUri}/${authUri}`,
          {
            username: nameRef.current.value,
            password: passRef.current.value,
            email: emailRef.current.value,
          },
          { withCredentials: true }
        );

        if (response.data.success) {
          toast.success("Sign up successful !");
          setCurrentState("Login");
        }
      }
    } catch (error) {
      toast.error("Sorry ! Some internal server error occured. ", error);
    } finally {
      setIsAuthLoading(false);
    }
  };

  return (
    <main className="h-screen w-screen absolute top-0 bg-black bg-opacity-80 grid place-content-center z-50">
      <form
        onSubmit={onAuthSubmitHandler}
        className="w-64 xvs:w-80 sm:w-96 px-8 py-6 bg-yellow-300 bg-opacity-90 text-blue-950 h-max rounded-2xl"
      >
        <div className="flex justify-between mb-6">
          <h2 className="font-bold text-2xl sm:text-3xl">{currentState}</h2>
          <div className="flex gap-1">
            <span className="text-md sm:text-lg">Close</span>
            <RxCross2
              onClick={() => navigate("/")}
              className="w-5 h-6 sm:w-6 sm:h-7 cursor-pointer"
            />
          </div>
        </div>
        <div className="flex flex-col gap-10">
          {currentState === "Sign Up" && (
            <input
              className="rounded-lg focus:outline-none bg-yellow-200 p-3 text-blue-900"
              name="username"
              ref={nameRef}
              type="text"
              placeholder="Your Name..."
              required
            />
          )}
          <input
            className="rounded-lg focus:outline-none bg-yellow-200 p-3 text-blue-900"
            name="email"
            ref={emailRef}
            type="email"
            placeholder="Your Email..."
            required
          />
          <input
            className="rounded-lg focus:outline-none bg-yellow-200 p-3 text-blue-900"
            name="password"
            ref={passRef}
            type="password"
            placeholder="Your Password..."
            required
          />
        </div>
        <button
          className="bg-blue-900 w-full hover:bg-blue-950 transition duration-300 text-white px-9 py-2 my-4 rounded-lg flex items-center justify-center gap-2 text-md md:text-lg"
          type="submit"
        >
          {isAuthLoading && (
            <Loader2 className="animate-spin text-yellow-200" />
          )}
          {currentState === "Sign Up"
            ? isAuthLoading
              ? "Signing up"
              : "Sign Up"
            : isAuthLoading
            ? "Logging in"
            : "Login"}
        </button>
        <GoogleSignIn />
        <div className="flex gap-2">
          <input
            className="mt-[-22px] cursor-pointer"
            type="checkbox"
            required
          />
          <p className="text-blue-950">
            By proceeding, I agree to the terms of use and privacy policy.
          </p>
        </div>
        {currentState === "Sign Up" ? (
          <p className="text-blue-950">
            Already have an account?
            <span
              className="cursor-pointer text-blue-800"
              onClick={() => setCurrentState("Login")}
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="text-blue-950">
            Create a new account?
            <span
              className="cursor-pointer text-blue-800"
              onClick={() => setCurrentState("Sign Up")}
            >
              Create here
            </span>
          </p>
        )}
      </form>
    </main>
  );
};

export default Login;
