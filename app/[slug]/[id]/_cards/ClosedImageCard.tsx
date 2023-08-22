"use client";

import { SortedChoice } from "@/common/types";
import { ProposalContext } from "@/context/proposal.context";
import { Proposal } from "hedsvote";
import Image from "next/image";
import { useContext } from "react";

const ClosedImageCard = ({
  proposal,
  userVote,
  choice,
}: {
  proposal: Proposal,
  userVote: any | null;
  choice: SortedChoice;
}) => {
  const getUserVotePercentage = () => {
    const votePercentage = userVote?.find(
      (vote: any) => vote?.choice_id === choice?.id
    )?.percentage;
    if (votePercentage) return Math.round(votePercentage * 100);
    else return 0;
  };
  return (
    <div
      className={
        "col-span-1 flex gap-1 rounded-lg bg-heds-bg-dark p-1 shadow-sm"
      }
    >
      <div className="p-2.5">
        <Image
          className="rounded-lg min-h-[45px] max-h-[45px] min-w-[45px] max-w-[45px]"
          src={choice?.image}
          alt={choice.name}
          width={45}
          height={45}
        />
      </div>
      <div className="flex flex-col justify-center gap-2">
        <p
          className={
            "truncate text-ellipsis font-space-grotesk text-sm text-white lg:max-w-[23ch]"
          }
        >
          {choice?.name}
        </p>
      </div>
      {proposal?.showResults && <div className="ml-auto flex gap-2 pr-2.5">
        <div className="flex flex-col items-center justify-center">
          <div className="rounded-sm bg-heds-bg-light px-2 py-1">
            <h1 className="text-center text-xs text-white min-w-[7ch] max-w-[7ch]">
              {Math.round(choice?.score * 10) / 10 || 0} %
            </h1>
          </div>
          {userVote && <div className="rounded-sm bg-h-red-dark px-2 py-1">
            <h1 className="text-center text-xs text-white min-w-[7ch] max-w-[7ch]">
              {getUserVotePercentage()} %
            </h1>
          </div>}
        </div>
      </div>}
    </div>
  );
};

export default ClosedImageCard;
