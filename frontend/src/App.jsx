import { Route, Routes } from "react-router-dom";
import {
  About,
  CreateHouseListing,
  EditHouseListing,
  Home,
  Login,
  Profile,
  Search,
  SingleListing,
} from "./pages";
import { Navbar, PrivateProfileRoute } from "./components";
import EditProfile from "./pages/EditProfile";
import MainContextProvider from "./context/MainContext";
import ProfileContextProvider from "./context/ProfileContext";
const App = () => {
  return (
    <>
      <MainContextProvider>
        <ProfileContextProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Login />} />
            <Route
              path="/single-listing/:listingId"
              element={<SingleListing />}
            />
            <Route path="/search" element={<Search />} />
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
        </ProfileContextProvider>
      </MainContextProvider>
    </>
  );
};

export default App;
