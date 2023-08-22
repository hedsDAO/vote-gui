"use client";

import { SortedChoice, VoterUserData } from "@/common/types";
import { Proposal, QuadraticVote, SingleChoiceVote } from "hedsvote";
import Image from "next/image";
import { useState } from "react";
import ResultsModal from "./ResultsModal";

const Results = ({
  proposal,
  voterUserData,
  sortedChoicesWithScores,
}: {
  proposal: Proposal;
  sortedChoicesWithScores: any;
  voterUserData: VoterUserData | undefined;
}) => {
  const [currentVote, setCurrentVote] = useState<any>();
  const [isResultsModalOpen, setIsResultsModalOpen] = useState(false);
  console.log(
    proposal.votes?.sort((a, b) => b?.vp - a?.vp),
    voterUserData
  );
  return (
    <div className="mb-4 mt-4 flex flex-col gap-1">
      {proposal.votes
        ?.sort((a, b) => b?.vp - a?.vp)
        ?.map((vote: QuadraticVote | SingleChoiceVote) => {
          return (
            <div
              role="button"
              key={vote.voter}
              onClick={() => {
                setCurrentVote(vote);
                setIsResultsModalOpen(true);
              }}
              className="flex items-center justify-between rounded-lg bg-heds-bg px-2 py-2"
            >
              <div className="flex items-center gap-2">
                {voterUserData?.[vote?.voter?.toLowerCase()]
                  ?.profilePicture && (
                  <Image
                    src={
                      voterUserData?.[vote?.voter?.toLowerCase()].profilePicture
                    }
                    height={25}
                    width={25}
                    alt={
                      voterUserData?.[vote?.voter?.toLowerCase()]?.displayName
                    }
                    className="max-h-[25px] min-h-[25px] min-w-[25px] max-w-[25px] rounded-full object-cover"
                  />
                )}
                <p className="text-sm text-white">
                  {voterUserData?.[vote?.voter?.toLowerCase()]?.displayName ||
                    vote?.voter?.slice(0, 6) + "..."}
                </p>
              </div>
              <p className="pr-2 text-sm text-white">{vote?.vp}</p>
            </div>
          );
        })}
      <ResultsModal
        proposal={proposal}
        vote={currentVote}
        isOpen={isResultsModalOpen}
        setIsOpen={(bool: boolean) => setIsResultsModalOpen(bool)}
      />
    </div>
  );
};

export default Results;
