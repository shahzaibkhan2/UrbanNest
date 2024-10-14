import { createSlice } from "@reduxjs/toolkit";

const listingSlice = createSlice({
  name: "listing",
  initialState: {
    listingData: null,
  },
  reducers: {
    // setListingData: (state, action) => {
    //   state.listingData.push(action.payload);
    // },
    setListingData: (state, action) => {
      state.listingData = action.payload;
    },

    setFilterDeletedListings: (state, action) => {
      state.listingData = state.listingData.filter(
        (filtered) => filtered?.owner !== action.payload
      );
    },
  },
});

export const { setListingData, setFilterDeletedListings } =
  listingSlice.actions;
export default listingSlice.reducer;
