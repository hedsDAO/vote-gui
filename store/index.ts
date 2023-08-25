import { configureStore } from "@reduxjs/toolkit";
import spaces from "@/store/spaces";

export const store = configureStore({
  reducer: {
    spaces: spaces,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
