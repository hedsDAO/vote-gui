"use client";

import React, { Dispatch, createContext, useReducer } from "react";

interface TapeDetails {
  title: string;
  description: string;
};

interface ChoiceOption {
  title: string;
  imageFile: File | null;
  audioFile: File | null;
}

interface StateType {
  coverFile: File | null;
  choiceOptions: ChoiceOption[];
  tapeDetails: TapeDetails;
};

type ActionType =
  | { type: 'ADD_COVER_FILE'; payload: File }
  | { type: 'ADD_OPTION'; payload: ChoiceOption }
  | { type: 'UPDATE_OPTION'; payload: { idx: number, option: ChoiceOption } }
  | { type: 'SET_DETAILS'; payload: TapeDetails };

const initialState: StateType = {
  coverFile: null,
  choiceOptions: [{
    title: "",
    imageFile: null,
    audioFile: null
  }],
  tapeDetails: {
    title: "",
    description: ""
  }
};

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "ADD_COVER_FILE":
      return {
        ...state,
        coverFile: action.payload
       };
    case "ADD_OPTION":
      return {
        ...state,
        choiceOptions: [...state.choiceOptions, action.payload]
      };
    case "UPDATE_OPTION":
      const updatedOptions = [...state.choiceOptions];
      updatedOptions[action.payload.idx] = action.payload.option;
      return {
        ...state,
        choiceOptions: updatedOptions
      };
    case "SET_DETAILS":
      return {
        ...state,
        tapeDetails: {
          ...action.payload
        }
      }
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
