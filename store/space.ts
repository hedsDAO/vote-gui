import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SpaceData } from "hedsvote";

export interface SpaceState {
  spaceData: SpaceData;
}

const initialState: SpaceState = {
  spaceData: {
    name: "",
    authors: [],
    image: ""
  }
};


const spaceSlice = createSlice({
  name: "space",
  initialState,
  reducers: {
    setSpaceData( state, action: PayloadAction<SpaceData>) {
      state.spaceData = action.payload;
    }
  },
  // extraReducers: (builder) => {
  //   // Add reducers for additional action types here, and handle loading state as needed
  //   builder.addCase(fetchAuthorByWallet.fulfilled, (state, action) => {
  //     // Add user to the state array
  //     state.author = action.payload
  //   })
  // },
});

export const { setSpaceData } = spaceSlice.actions;
export default spaceSlice.reducer;
