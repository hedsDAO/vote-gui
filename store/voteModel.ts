import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface VoteState {
  allSpaces: any[];
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
