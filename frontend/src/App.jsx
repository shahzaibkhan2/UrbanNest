import { Route, Routes } from "react-router-dom";
import { About, Home, Login, Profile } from "./pages";
import { Navbar, PrivateProfileRoute } from "./components";
const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Login />} />
        <Route element={<PrivateProfileRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
};

export default App;
