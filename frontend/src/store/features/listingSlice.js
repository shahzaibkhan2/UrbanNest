import { createSlice } from "@reduxjs/toolkit";

const listingSlice = createSlice({
  name: "listing",
  initialState: {
    listingData: [],
  },
  reducers: {
    // setListingData: (state, action) => {
    //   state.listingData.push(action.payload);
    // },
    setListingData: (state, action) => {
      state.listingData = [state.listingData, action.payload];
    },
  },
});

export const { setListingData } = listingSlice.actions;
export default listingSlice.reducer;
