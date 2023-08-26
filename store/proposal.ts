import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Proposal, SpaceData } from "hedsvote";

export type VoteParticipants  = {
    [voter: string]: {
      displayName: string;
      profilePicture: string;
  };
} | undefined

export interface ProposalState {
  proposal: Proposal | null;
  author: string;
  voteParticipants?: VoteParticipants
  spaceData: SpaceData
}

const initialState: ProposalState = {
  proposal: null,
  author: "",
  voteParticipants: {},
  spaceData: {
    name: "",
    authors: [],
    image: ""
  }
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


export const { setAuthor, setProposal, setVoteParticipants, setSpaceData } = proposalSlice.actions;
export default proposalSlice.reducer;
