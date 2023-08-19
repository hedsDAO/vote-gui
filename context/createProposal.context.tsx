"use client";

import React, { Dispatch, createContext, useReducer } from "react";
import { Strategy } from "hedsvote";

interface TapeDetails {
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

interface StateType {
  coverFile: File | null;
  choiceOptions: ChoiceOption[];
  tapeDetails: TapeDetails;
  voteStart: Date;
  voteDuration: string;
  strategy: Strategy[];
}

type ActionType =
  | { type: "ADD_COVER_FILE"; payload: File | null }
  | { type: "ADD_OPTION"; payload: ChoiceOption }
  | { type: "UPDATE_OPTION"; payload: { idx: number; option: ChoiceOption } }
  | { type: "DELETE_OPTION"; payload: number }
  | { type: "SET_DETAILS"; payload: TapeDetails }
  | { type: "SET_VOTE_START"; payload: Date }
  | { type: "SET_VOTE_DURATION"; payload: string }
  | { type: "ADD_STRATEGY"; payload: Strategy }
  | { type: "UPDATE_STRATEGY"; payload: { idx: number; strategy: Strategy } }
  | { type: "REMOVE_STRATEGY"; payload: number };

const initialState: StateType = {
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
    choiceType: "audio",
    showResults: true
  },
  voteStart: new Date(),
  voteDuration: "86400000",
  strategy: [],
};

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "ADD_COVER_FILE":
      return {
        ...state,
        coverFile: action.payload,
      };
    case "ADD_OPTION":
      return {
        ...state,
        choiceOptions: [...state.choiceOptions, action.payload],
      };
    case "UPDATE_OPTION":
      const updatedOptions = [...state.choiceOptions];
      updatedOptions[action.payload.idx] = action.payload.option;
      return {
        ...state,
        choiceOptions: updatedOptions,
      };
    case "DELETE_OPTION":
      return {
        ...state,
        choiceOptions: state.choiceOptions.filter(
          (_, idx) => idx !== action.payload
        ),
      };
    case "SET_DETAILS":
      return {
        ...state,
        tapeDetails: {
          ...action.payload,
        },
      };
    case "SET_VOTE_START":
      return { ...state, voteStart: action.payload };
    case "SET_VOTE_DURATION":
      return { ...state, voteDuration: action.payload };
    case "ADD_STRATEGY":
      return {
        ...state,
        strategy: [...state.strategy, action.payload],
      };
    case "UPDATE_STRATEGY":
      const updatedStrategies = [...state.strategy];
      updatedStrategies[action.payload.idx] = action.payload.strategy;
      return {
        ...state,
        strategy: updatedStrategies
      };      
    case "REMOVE_STRATEGY":
      return {
        ...state,
        strategy: state.strategy.filter((_, idx) => idx !== action.payload),
      };
    default:
      return state;
  }
};

export const CreateProposalContext = createContext<{
  state: StateType;
  dispatch: Dispatch<ActionType>;
}>({ state: initialState, dispatch: () => null });

export const CreateProposalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CreateProposalContext.Provider value={{ state, dispatch }}>
      {children}
    </CreateProposalContext.Provider>
  );
};
