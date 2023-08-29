import { configureStore } from "@reduxjs/toolkit";
import activeVote from "./activeVote";
import createProposal from "./createProposal";
import proposal from "@/store/proposal";

export const store = configureStore({
  reducer: {
    activeVote,
    createProposal,
    proposal
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
