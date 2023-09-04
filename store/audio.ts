import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Howl } from 'howler';

export interface AudioState {
  currentSong: {
    media: string;
    percentage: number;
    isLoading: boolean;
    isPlaying: boolean;
  } | null;
}

const initialState: AudioState = {
  currentSong: null,
};

const audioSlice = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    setCurrentSong(state, action: PayloadAction<AudioState['currentSong']>) {
      console.log("before",state.currentSong)
      state.currentSong = action.payload;
      console.log("after",state.currentSong)
    },
    setCurrentSongIsPlaying(state, action: PayloadAction<boolean>) {
        if (state.currentSong) {
          state.currentSong.isPlaying = action.payload;
        }
      },
    updateCurrentSongPercentage(state, action: PayloadAction<number>) {
      if (state.currentSong) {
        state.currentSong.percentage = action.payload;
      }
    },
  },
});

export const { setCurrentSong, setCurrentSongIsPlaying, updateCurrentSongPercentage } = audioSlice.actions;
export default audioSlice.reducer;
