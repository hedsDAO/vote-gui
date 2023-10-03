import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Strategy } from "@heds-dev/hedsvote";

export interface TapeDetails {
    title: string;
    description: string;
    choiceType: string;
    showResults: boolean;
}

export interface ChoiceOption {
    title: string;
    imageFile: File | null;
    audioFile: File | null;
  }

export interface CreateProposalState {
    coverFile: File | null;
    choiceOptions: ChoiceOption[];
    tapeDetails: TapeDetails;
    voteStart?: Date;
    voteDuration: string;
    strategy: Strategy[];
}

const initialState: CreateProposalState = {
    coverFile: null,
    choiceOptions: [
      {
        title: "",
        imageFile: null,
        audioFile: null,
      },
      {
        title: "",
        imageFile: null,
        audioFile: null,
      },
    ],
    tapeDetails: {
      title: "",
      description: "",
      choiceType: "image",
      showResults: true
    },
    voteDuration: "86400000",
    strategy: [],
  };


const createProposalSlice = createSlice({
  name: "activeVote",
  initialState,
  reducers: {
    setCoverFile(state, action: PayloadAction<File | null>) {
      return {
        ...state,
        coverFile: action.payload
      }
    },
    addChoiceOption(state, action: PayloadAction<ChoiceOption>) {
        return {
            ...state,
            choiceOptions: [...state.choiceOptions, action.payload],
        }
    },
    updateChoiceOption(state, action: PayloadAction<{ idx: number; option: ChoiceOption }>) {
        const updatedOptions = [...state.choiceOptions];
        updatedOptions[action.payload.idx] = action.payload.option;
        return {
          ...state,
          choiceOptions: updatedOptions,
        };
    },
    deleteChoiceOption(state, action: PayloadAction<number>) {
        return {
            ...state,
            choiceOptions: state.choiceOptions.filter(
              (_, idx) => idx !== action.payload
            ),
          };
    },
    setTapeDetails(state, action: PayloadAction<TapeDetails>) {
        return {
            ...state,
            tapeDetails: {
              ...action.payload,
            },
        };
    },
    setVoteStart(state, action: PayloadAction<Date>) {
        return { ...state, voteStart: action.payload };
    },
    setVoteDuration(state, action: PayloadAction<string>) {
        return { ...state, voteDuration: action.payload };
    },
    addStrategy(state, action: PayloadAction<Strategy>) {
        return {
            ...state,
            strategy: [...state.strategy, action.payload],
          };
    },
    updateStrategy(state, action: PayloadAction<{ idx: number; strategy: Strategy }>) {
        const updatedStrategies = [...state.strategy];
        updatedStrategies[action.payload.idx] = action.payload.strategy;
        return {
          ...state,
          strategy: updatedStrategies
        };   
    },
    removeStrategy(state, action: PayloadAction<number>) {
        return {
            ...state,
            strategy: state.strategy.filter((_, idx) => idx !== action.payload),
          };
    },
  }
});



export const {
    setCoverFile,
    addChoiceOption, 
    updateChoiceOption, 
    deleteChoiceOption, 
    setTapeDetails,
    setVoteStart,
    setVoteDuration,
    addStrategy,
    updateStrategy,
    removeStrategy
    } 
    = createProposalSlice.actions;
export default createProposalSlice.reducer;
