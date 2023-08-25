import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SpaceData } from "hedsvote";

export interface VoteState {
  allSpaces: SpaceData[];
}

const initialState: VoteState = {
  allSpaces: [],
};


const spacesSlice = createSlice({
  name: "allSpaces",
  initialState,
  reducers: {
    setAllSpaces(state, action: PayloadAction<any[]>) {
      state.allSpaces = action.payload;
    },
  },
});

export const { setAllSpaces } = spacesSlice.actions;
export default spacesSlice.reducer;
