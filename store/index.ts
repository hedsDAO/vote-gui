import { configureStore } from "@reduxjs/toolkit";
import proposal from "@/store/proposal";

export const store = configureStore({
  reducer: {
    proposal,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
