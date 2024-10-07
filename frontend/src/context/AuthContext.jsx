import { createContext, useRef, useState } from "react";
import axios from "axios";
import { apiUri } from "../constants/apiRoutes";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../store/features/authSlice";
import { toast } from "sonner";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase/firebaseConfig";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const dispatch = useDispatch();
  // <------------------- Routes and Navigation ----------------->

  //<----------------------- States --------------------------->

  // <====== Authentication States ======>

  const [currentState, setCurrentState] = useState("Sign Up");
  const [showLogin, setShowLogin] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  // <------------------------------ useRef References ------------------------>

  // <====== Authentication useRef References ======>

  const nameRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();

  //   <------------------------ Methods & Functions ----------------------->

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
      }
    } catch (error) {
      console.log("Sorry ! Internal server error occured.", error);
    }
  };

  // <======== Authentication Methods and Functions ========>
  const onAuthSubmitHandler = async (event) => {
    event.preventDefault();
    let authUri = apiUri.usersUri;
    try {
      if (currentState === "Login") {
        authUri += "/login";
        setIsAuthLoading(true);
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
          setShowLogin(false);
          toast.success("Login successful !");
        }
      } else {
        authUri += "/register";
        isAuthLoading(true);
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
          setShowLogin(false);
          toast.success("Sign up successful !");
        }
      }
    } catch (error) {
      toast.error("Sorry ! Some internal server error occured. ", error);
    } finally {
      setIsAuthLoading(false);
    }
  };

  // <------------------- Page Rendering Methods and Hooks -------------------->

  //   <------------------------ Context Values -------------------------->

  const contextValue = {
    currentState,
    setCurrentState,
    showLogin,
    setShowLogin,
    onAuthSubmitHandler,
    nameRef,
    emailRef,
    passRef,
    isAuthLoading,
    googleSignInHandler,
  };

  //   <------------------------ Provider Wrapper ------------------------->

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
