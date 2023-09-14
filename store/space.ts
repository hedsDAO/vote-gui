import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { SpaceData } from "hedsvote";

export interface SpaceState {
  spaceData: SpaceData;
}

const initialState: SpaceState = {
  spaceData: {
    name: "",
    authors: [],
    image: "",
  },
};

const spaceSlice = createSlice({
  name: "space",
  initialState,
  reducers: {
    setSpaceData(state, action: PayloadAction<SpaceData>) {
      state.spaceData = action.payload;
    },
    reset(state) {
      state.spaceData = initialState.spaceData;
    },
  },
});

export const { setSpaceData, reset } = spaceSlice.actions;
export default spaceSlice.reducer;
