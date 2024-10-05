import { RxCross2 } from "react-icons/rx";
import { useAuthContext } from "../../hooks/UseAuth";

const Login = () => {
  const {
    currentState,
    setCurrentState,
    setShowLogin,
    nameRef,
    emailRef,
    passRef,
  } = useAuthContext();
  return (
    <main className="h-screen w-screen absolute top-0 bg-black bg-opacity-80 grid place-content-center z-50">
      <form className="w-96 px-8 py-6 bg-yellow-300 bg-opacity-90 text-blue-950 h-max rounded-2xl">
        <div className="flex justify-between mb-6">
          <h2 className="font-bold text-3xl">{currentState}</h2>
          <div className="flex gap-1">
            <span className="text-lg">Close</span>
            <RxCross2
              onClick={() => setShowLogin(false)}
              className="w-6 h-7 cursor-pointer"
            />
          </div>
        </div>
        <form className="flex flex-col gap-10">
          {currentState === "Sign Up" && (
            <input
              className="rounded-lg focus:outline-none bg-yellow-200 p-3 text-blue-900"
              name="name"
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
        </form>
        <button
          className="bg-blue-900 w-full hover:bg-blue-950 transition duration-300 text-white px-9 py-2 my-4 rounded-lg"
          type="submit"
        >
          {currentState === "Sign Up" ? "Sign Up" : "Login"}
        </button>
        <div className="flex gap-2">
          <input
            className="mt-[-22px] cursor-pointer"
            type="checkbox"
            required
          />
          <p className="text-blue-950">
            By proceeding, I agree to the terms of use and privacy policy.{" "}
          </p>
        </div>
        {currentState === "Sign Up" ? (
          <p className="text-blue-950">
            Already have an account?{" "}
            <span
              className="cursor-pointer text-blue-800"
              onClick={() => setCurrentState("Login")}
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="text-blue-950">
            Create a new account?{" "}
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
