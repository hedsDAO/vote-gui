"use client";
import { ProposalContext } from "@/context/proposal.context";
import { useAccount, useWalletClient } from "wagmi";
import { useContext } from "react";
import { Choice, calculateUserVotingPower } from "hedsvote";
import { Web3Button } from "@web3modal/react";
import { castVote, getProposalById } from "@/app/_actions";

const LikedSubmissions = ({ params }: { params: { id: string } }) => {
  const { state, dispatch } = useContext(ProposalContext);
  const { data: walletClient, isError, isLoading } = useWalletClient();
  const { address, isConnected } = useAccount();

  const handleVote = async (choice: Choice) => {
    try {
      const proposal = await getProposalById(params.id);
      const vp = calculateUserVotingPower(address, proposal.strategies);
      const { id } = params;
      const vote = {
        proposalId: id,
        signature: "",
        vp,
        voter: "",
        voteChoices: state.likes,
      };
      castVote({ vote, walletClient });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex h-72 w-72 flex-col justify-items-center gap-y-1.5 overflow-y-scroll rounded-md border bg-[#EAEAEA] px-4 py-6 drop-shadow-lg">
      <div className="mx-auto">
        {isConnected ? "connected" : <Web3Button />}
      </div>
      {state.likes &&
        Object.entries(state.likes).map(([id, score]) => (
          <div
            className="flex flex-row items-center justify-between rounded-lg border bg-[#2D2934] px-4 py-2 text-white"
            key={id}>
            {id}
            <div className="flex flex-row items-center gap-x-3">
              <svg
                className="cursor-pointer"
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
                className="cursor-pointer"
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
      <button className="mx-auto rounded-md bg-[#2D2934] px-4 py-2 text-white">
        submit
      </button>
    </div>
  );
};

export default LikedSubmissions;
