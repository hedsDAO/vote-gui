"use client";

import React, { Dispatch, createContext, useReducer } from "react";

type StateType = {
  likes: { [key: number]: number };
  vp: number;
};

type ActionType = {
  type: "ADD_LIKE";
  payload: number;
} | 
{
  type: "REMOVE_LIKE";
  payload: number;
} | 
{
  type: "INCREASE_SCORE";
  payload: number;
} | {
  type: "DECREASE_SCORE";
  payload: number;
} | {
  type: "SET_VOTES";
  payload: {[key: string]: number};
}


const initialState: StateType = {
  likes: {},
  vp: 0,
};

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "SET_VOTES": 
    return {
      ...state,
      likes: {...action.payload}
    };
    case "ADD_LIKE":
      return {
        ...state,
        likes: { ...state.likes, [action.payload]: 1 },
      };
    case "REMOVE_LIKE":
      const newLikes = { ...state.likes };
      delete newLikes[action.payload];
      return {
        ...state,
        likes: newLikes,
      };
    case "INCREASE_SCORE":
      return {
        ...state,
        likes: {
          ...state.likes,
          [action.payload]: state.likes?.[action.payload] ? state.likes[action.payload] += 1 : state.likes[action.payload] = 1,
        },
      };
    case "DECREASE_SCORE":
      if (state.likes[action.payload] === 1) {
        const newLikes = { ...state.likes };
        delete newLikes[action.payload];
        return {
          ...state,
          likes: newLikes,
        };
      } else {
        return {
          ...state,
          likes: {
            ...state.likes,
            [action.payload]: state.likes[action.payload] -= 1,
          },
        };
      }
    default:
      return state;
  }
};

export const ProposalContext = createContext<{
  state: StateType;
  dispatch: Dispatch<ActionType>;
}>({ state: initialState, dispatch: () => null });

export const ProposalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ProposalContext.Provider value={{ state, dispatch }}>
      {children}
    </ProposalContext.Provider>
  );
};
