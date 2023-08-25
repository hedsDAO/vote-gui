import { configureStore } from "@reduxjs/toolkit";

import voteReducer from "./voteModel";
import {authorApi}from "./api/getAuthor";

export const store = configureStore({
  reducer: {
    vote: voteReducer,
    authorAPI: authorApi.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
