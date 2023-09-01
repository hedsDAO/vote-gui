import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Proposal, Space_Data } from "hedsvote";

export type VoteParticipants  = {
    [voter: string]: {
      displayName: string;
      profilePicture: string;
  };
} | undefined;

export type ScoreData = {
  totalScore: number;
  sortedChoicesWithScores: any;
} | undefined;

export interface ProposalState {
  proposal: Proposal | null;
  author: string;
  voteParticipants?: VoteParticipants;
  spaceData: Space_Data;
  scoreData?: any;
}

const initialState: ProposalState = {
  proposal: null,
  author: "",
  voteParticipants: {},
  spaceData: {
    name: "",
    authors: [],
    image: ""
  },
  scoreData : {}
};


const proposalSlice = createSlice({
  name: "proposal",
  initialState,
  reducers: {
    setProposal(state, action: PayloadAction<Proposal>) {
      state.proposal = action.payload;
    },
    setAuthor(state, action: PayloadAction<string>) {
      state.author = action.payload;
    },
    setVoteParticipants(state, action: PayloadAction<VoteParticipants>) {
      if (!action.payload) return;
      state.voteParticipants = action.payload;
    },
    setSpaceData( state, action: PayloadAction<Space_Data>) {
      state.spaceData = action.payload;
    },
    setScoreData( state, action: PayloadAction<ScoreData>) {
      state.scoreData = action.payload;
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

// "use server"
// export const fetchAuthorByWallet = createAsyncThunk(
//   'proposals/fetchAuthorByWallet',
//   async (_wallet: string) => {
//     const wallet = _wallet.toLowerCase()
//     const response = await fetch(`https://us-central1-heds-104d8.cloudfunctions.net/api/users/${wallet}`);
//     const res =  await response.json();
//     const displayName = res.display_name;
//     proposalSlice.actions.setAuthor(displayName);

//     return displayName;
//   }
// )


export const { setAuthor, setProposal, setVoteParticipants, setSpaceData, setScoreData } = proposalSlice.actions;
export default proposalSlice.reducer;
