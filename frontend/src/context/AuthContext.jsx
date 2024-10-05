import { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { apiUri } from "../constants/apiRoutes";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  // <------------------- Routes and Navigation ----------------->

  //<----------------------- States --------------------------->

  // <====== Authentication States ======>
  const [accessToken, setAccessToken] = useState(null);
  const [currentState, setCurrentState] = useState("Sign Up");
  const [showLogin, setShowLogin] = useState(false);

  // <------------------------------ useRef References ------------------------>

  // <====== Authentication useRef References ======>

  const nameRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();

  //   <------------------------ Methods & Functions ----------------------->

  // <======== Authentication Methods and Functions ========>
  const onLogin = async (event) => {
    event.preventDefault();
    let authUri = apiUri.usersUri;
    if (currentState === "Login") {
      authUri += "/login";
      const response = await axios.post(`${apiUri.baseUri}/${authUri}`, {
        password: passRef.current.value,
        email: emailRef.current.value,
      });

      if (response.data.success) {
        setAccessToken(response.data.data.accessToken);
        setShowLogin(false);
      }
    } else {
      authUri += "/register";
      const response = await axios.post(`${apiUri.baseUri}/${authUri}`, {
        name: nameRef.current.value,
        password: passRef.current.value,
        email: emailRef.current.value,
      });

      if (response.data.success) {
        setShowLogin(false);
        console.log("Sign up successful !");
      }
    }
  };

  // <------------------- Page Rendering Methods and Hooks -------------------->

  //   <------------------------ Context Values -------------------------->

  const contextValue = {
    currentState,
    setCurrentState,
    accessToken,
    showLogin,
    setShowLogin,
    onLogin,
    nameRef,
    emailRef,
    passRef,
  };

  //   <------------------------ Provider Wrapper ------------------------->

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
