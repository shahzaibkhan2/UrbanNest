import { Route, Routes } from "react-router-dom";
import { About, Home, Login, Profile } from "./pages";
import { Navbar } from "./components";
import { useAuthContext } from "./hooks/UseAuth";
const App = () => {
  const { showLogin } = useAuthContext();
  return (
    <>
      {showLogin && <Login />}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
};

export default App;
