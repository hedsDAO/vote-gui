"use client";

import React, { Dispatch, createContext, useReducer } from "react";

interface TapeDetails {
  title: string;
  description: string;
};

interface StateType {
  coverFile: File;
  choiceFiles: File[];
  tapeDetails: TapeDetails;
};

type ActionType =
  | { type: 'ADD_COVER_FILE'; payload: File }
  | { type: 'ADD_CHOICE_FILE'; payload: File }
  | { type: 'REMOVE_CHOICE_FILE'; payload: File }
  | { type: 'CLEAR_FILES' }
  | { type: 'SET_DETAILS'; payload: TapeDetails };

const initialState: StateType = {
  coverFile: new File([],""),
  choiceFiles: [],
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
    case "ADD_CHOICE_FILE":
      return {
        ...state,
        choiceFiles: [...state.choiceFiles, action.payload]
      };
    case "REMOVE_CHOICE_FILE":
      const fileToDelete = state.choiceFiles.findIndex(file => file === action.payload);
      if (fileToDelete >= 0) {
        const newFiles = [...state.choiceFiles];
        newFiles.splice(fileToDelete, 1);
        return {
          ...state,
          choiceFiles: newFiles,
        };
      }
      return state; 
    case "CLEAR_FILES":
      return {
        ...state,
        choiceFiles: []
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
