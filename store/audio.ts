import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ActiveSong {
  media: string;
  percentage: number;
  isPlaying: boolean;
}

export interface AudioState {
  currentSong: ActiveSong;
  isLoading: boolean;
}

const initialState: AudioState = {
  currentSong: {
    media: "",
    percentage: 0,
    isPlaying: false,
  },
  isLoading: false,
};

const audioSlice = createSlice({
  name: "audio",
  initialState,
  reducers: {
    playSong(state, action: PayloadAction<ActiveSong>) {
      state.currentSong = action.payload;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      if (state.currentSong) {
        state.isLoading = action.payload;
      }
    },
    togglePlayPause(state) {
      if (state.currentSong) {
        if (state.currentSong.isPlaying) {
          state.currentSong.isPlaying = false;
        } else {
          state.currentSong.isPlaying = true;
        }
      }
    },
    setSongPercentage(state, action: PayloadAction<number>) {
      if (state.currentSong) {
        state.currentSong.percentage = action.payload;
      }
    },
    reset: () => initialState,
  },
});

export const { togglePlayPause, playSong, setIsLoading, setSongPercentage, reset } = audioSlice.actions;
export default audioSlice.reducer;
