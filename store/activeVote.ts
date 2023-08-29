import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type VoteSelections  = {
    [key: string]: number
} | undefined;


export interface ActiveVoteState {
    voteSelections: VoteSelections;
}

const initialState: ActiveVoteState = {
    voteSelections: {}
};


const activeVoteSlice = createSlice({
  name: "activeVote",
  initialState,
  reducers: {
    setVoteSelections(state, action: PayloadAction<VoteSelections>) {
      return {
        ...state,
        voteSelections: {...action.payload}
      }
    },
    setIncreaseScore(state, action: PayloadAction<number>) {
        if (!state.voteSelections) {
            state.voteSelections = {}
          }
        
          if (action.payload in state.voteSelections) {
            state.voteSelections[action.payload] += 1
          } else {
            state.voteSelections[action.payload] = 1
          }
        
          return {...state}
    },
    setDecreaseScore(state, action: PayloadAction<number>) {
        if (!state.voteSelections) {
            return state;
        }

        if (state.voteSelections[action.payload] === 1) {
            const newLikes = { ...state.voteSelections };
            delete newLikes[action.payload];
            return {
              ...state,
              likes: newLikes,
            };
          } else {
            return {
              ...state,
              likes: {
                ...state.voteSelections,
                [action.payload]: state.voteSelections[action.payload] -= 1,
              },
            };
          }
    }
  }
});



export const { setDecreaseScore, setIncreaseScore, setVoteSelections } = activeVoteSlice.actions;
export default activeVoteSlice.reducer;
