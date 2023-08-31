import { configureStore } from "@reduxjs/toolkit";
import activeVoteReducer from "./activeVote";
import createProposalReducer from "./createProposal";
import proposal from "@/store/proposal";
import spaceReducer from "@/store/space";

export const store = configureStore({
  reducer: {
    activeVoteReducer,
    createProposalReducer,
    proposal,
    spaceReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
