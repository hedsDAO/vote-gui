"use client";
import { ProposalContext } from "@/context/proposal.context";
import { useContext } from "react";
import { Choice } from "hedsvote";

const LikedSubmissions = () => {
  const { state, dispatch } = useContext(ProposalContext);

  return (
    <div className="rounded-md border bg-[#EAEAEA] px-4 py-6">
      {state.likes &&
        Object.entries(state.likes).map(([id, score]) => (
          <div
            className="flex flex-row items-center justify-between rounded-lg border bg-[#2D2934] px-4 py-2 text-white"
            key={id}>
            {id}
            <div className="flex flex-row items-center gap-x-3">
              <svg
                onClick={() =>
                  dispatch({ type: "DECREASE_SCORE", payload: Number(id) })
                }
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                fill="#FFFFFF"
                viewBox="0 0 256 256">
                <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128Z"></path>
              </svg>
              {score}
              <svg
                onClick={() =>
                  dispatch({ type: "INCREASE_SCORE", payload: Number(id) })
                }
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                fill="#FFFFFF"
                viewBox="0 0 256 256">
                <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path>
              </svg>
            </div>
          </div>
        ))}
    </div>
  );
};

export default LikedSubmissions;
