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
import MainContextProvider from "./context/MainContext";
const App = () => {
  return (
    <>
      <MainContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Login />} />
          <Route element={<PrivateProfileRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/create-listing" element={<CreateHouseListing />} />
            <Route
              path="/edit-listing/:listingId"
              element={<EditHouseListing />}
            />
          </Route>
          <Route path="/about" element={<About />} />
        </Routes>
      </MainContextProvider>
    </>
  );
};

export default App;
