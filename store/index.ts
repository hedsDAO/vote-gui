import { configureStore } from "@reduxjs/toolkit";
import activeVoteReducer from "./activeVote";
import createProposalReducer from "./createProposal";
import proposal from "@/store/proposal";
import spaceReducer from "@/store/space";
import audioReducer from "@/store/audio";

export const store = configureStore({
  reducer: {
    audioReducer,
    activeVoteReducer,
    createProposalReducer,
    proposal,
    spaceReducer,
  },
  devTools: true,
  // middleware: (getDefaultMiddleware) => {
  //   getDefaultMiddleware({serializableCheck: false}).concat()
  // },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
