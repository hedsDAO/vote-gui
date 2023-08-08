"use client";

import React, { Dispatch, createContext, useReducer } from "react";

interface TapeDetails {
  title: string;
  description: string;
};

interface StateType {
  files: File[];
  tapeDetails: TapeDetails;
};

type ActionType =
  | { type: 'ADD_FILE'; payload: File }
  | { type: 'REMOVE_FILE'; payload: File }
  | { type: 'CLEAR_FILES' }
  | { type: 'SET_DETAILS'; payload: TapeDetails };

const initialState: StateType = {
  files: [],
  tapeDetails: {
    title: "",
    description: ""
  }
};

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "ADD_FILE":
      return {
        ...state,
        files: [...state.files, action.payload]
       };
    case "REMOVE_FILE":
      const fileToDelete = state.files.findIndex(file => file === action.payload);
      if (fileToDelete >= 0) {
        const newFiles = [...state.files];
        newFiles.splice(fileToDelete, 1);
        return {
          ...state,
          files: newFiles,
        };
      }
      return state; 
    case "CLEAR_FILES":
      return {
        ...state,
        files: []
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
