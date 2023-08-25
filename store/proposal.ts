import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Proposal } from "hedsvote";

export interface VoteState {
  proposal: Proposal | null;
  author: string;
}

const initialState: VoteState = {
  proposal: null,
  author: "",
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
  },
});

// "use server"
export const fetchAuthorByWallet = createAsyncThunk(
  'proposals/fetchAuthorByWallet',
  async (_wallet: string) => {
    const wallet = _wallet.toLowerCase()
    const response = await fetch(`https://us-central1-heds-104d8.cloudfunctions.net/api/users/${wallet}`);
    const res =  await response.json();
    const displayName = res.display_name;
    proposalSlice.actions.setAuthor(displayName);

    console.log({res, displayName});
  }
)


export const { setProposal } = proposalSlice.actions;
export default proposalSlice.reducer;
