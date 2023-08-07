"use client";

import React, { Dispatch, createContext, useReducer } from "react";

type StateType = {
  files: File[];
};

type ActionType = {
  type: string;
  payload: File;
};

const initialState: StateType = {
  files: [],
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
