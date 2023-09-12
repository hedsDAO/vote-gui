import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type VoteSelections =
  | {
      [key: string]: number;
    }
  | undefined;

export interface ActiveVoteState {
  voteSelections: VoteSelections;
}

const initialState: ActiveVoteState = {
  voteSelections: undefined,
};

const activeVoteSlice = createSlice({
  name: "activeVote",
  initialState,
  reducers: {
    setVoteSelections: (state, action: PayloadAction<VoteSelections>) => {
      const newState = { ...state };
      const payload = action.payload;
      newState.voteSelections = payload;
      return newState;
    },
    setIncreaseScore: (state, action: PayloadAction<number>) => {
      const newState = { ...state };
      const payload = action.payload;

      if (!newState.voteSelections) newState.voteSelections = {};

      if (payload in newState.voteSelections) {
        const prev = newState.voteSelections[payload];
        newState.voteSelections = {
          ...newState.voteSelections,
          [payload]: prev + 1,
        };
      } else {
        newState.voteSelections = {
          ...newState.voteSelections,
          [payload]: 1,
        };
      }
      return newState;
    },
    setDecreaseScore: (state, action: PayloadAction<number>) => {
      const newState = { ...state };
      const payload = action.payload;
      if (!newState.voteSelections) {
        return newState;
      }
      if (newState.voteSelections[payload] === 1) {
        let newVoteSelections: VoteSelections = {};
        for (let key in newState.voteSelections) {
          if (key !== payload.toString()) newVoteSelections[key] = newState.voteSelections[key];
        }
        newState.voteSelections = newVoteSelections;
        return newState;
      } else {
        newState.voteSelections = {
          ...newState.voteSelections,
          [payload]: newState.voteSelections[payload] - 1,
        };
        return newState;
      }
    },
  },
});

export const { setDecreaseScore, setIncreaseScore, setVoteSelections } = activeVoteSlice.actions;
export default activeVoteSlice.reducer;
