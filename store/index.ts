import { configureStore } from "@reduxjs/toolkit";
import proposal from "@/store/proposal";
import activeVote from "./activeVote";

export const store = configureStore({
  reducer: {
    activeVote,
    proposal
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
