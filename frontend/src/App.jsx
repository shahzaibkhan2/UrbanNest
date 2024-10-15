import { Route, Routes } from "react-router-dom";
import {
  About,
  CreateHouseListing,
  EditHouseListing,
  Home,
  Login,
  Profile,
} from "./pages";
import { Navbar, PrivateProfileRoute } from "./components";
import EditProfile from "./pages/EditProfile";
const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Login />} />
        <Route element={<PrivateProfileRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/create-listing" element={<CreateHouseListing />} />
          <Route path="/edit-listing" element={<EditHouseListing />} />
        </Route>
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
};

export default App;
