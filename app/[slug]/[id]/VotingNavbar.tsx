"use client";

import { quadratic } from "hedsvote";
import { useState, useEffect } from "react";
import Ballot from "./Ballot";
import { SortedChoice, VoterUserData } from "@/common/types";
import AudioCards from "./_cards/AudioCards";
import ImageCards from "./_cards/ImageCards";
import Results from "./Results";
import { useAccount } from "wagmi";
import { getUserVotePercentages } from "@/utils/getUserVotePercentages";
import { getScoreData } from "@/utils/getScoreData";

const VotingNavbar = ({
  proposal,
  votingStatus,
  sortedChoicesWithScores,
  voterUserData,
}: {
  proposal: any;
  votingStatus: string;
  sortedChoicesWithScores?: SortedChoice[];
  voterUserData: VoterUserData | undefined;
}) => {
  const { address } = useAccount();
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [choicesWithScores, setChoicesWithScores] = useState<any>();

  useEffect(() => {
    if (votingStatus === "closed" && !proposal?.scores) {
      const { getScores } = quadratic({
        votes: proposal?.votes,
        choices: proposal?.choices,
      });
      const scores = getScores();
      const newProposal = { ...proposal, scores };
      const { sortedChoicesWithScores: updatedChoicesWithScores } =
        getScoreData(newProposal);
      setChoicesWithScores(updatedChoicesWithScores);
    }
  }, [proposal]);

  return (
    <>
      {votingStatus === "open" ? (
        <div className="mt-10 flex items-end justify-between">
          <p className="font-inter text-base font-semibold tracking-wide text-black">
            CHOICES
          </p>
          <Ballot
           userVote={getUserVotePercentages(proposal, address)}
            strategies={proposal?.strategies}
            proposal={proposal}
            choices={proposal?.choices}
          />
        </div>
      ) : (
        <div className="mt-10 flex items-end gap-2">
          <p
            role="button"
            onClick={() => setCurrentTab(0)}
            className={
              `${
                currentTab === 0
                  ? "text-black"
                  : "text-black/40 hover:text-black"
              } ` +
              "font-inter text-base font-semibold tracking-wide transition-all ease-in-out"
            }
          >
            CHOICES
          </p>
          {proposal?.showResults && (
            <p
              role="button"
              onClick={() => setCurrentTab(1)}
              className={
                `${
                  currentTab === 1
                    ? "text-black"
                    : "text-black/40 hover:text-black"
                } ` +
                "font-inter text-base font-semibold tracking-wide transition-all ease-in-out"
              }
            >
              RESULTS
            </p>
          )}
        </div>
      )}
      {currentTab === 0 ? (
        <div className="mb-10 flex max-w-5xl text-black">
          <div className="mt-5 flex w-full flex-col gap-5">
            {proposal?.choiceType === "audio" ? (
              <div className="grid w-full grid-cols-1 gap-2 lg:grid-cols-2">
                <AudioCards
                  userVote={getUserVotePercentages(proposal, address)}
                  votingStatus={votingStatus}
                  sortedChoicesWithScores={
                    sortedChoicesWithScores?.length
                      ? sortedChoicesWithScores
                      : choicesWithScores
                  }
                  proposal={proposal}
                />
              </div>
            ) : proposal?.choiceType === "image" ? (
              <div className="grid w-full grid-cols-1 gap-2 lg:grid-cols-2">
                <ImageCards
                  userVote={getUserVotePercentages(proposal, address)}
                  votingStatus={votingStatus}
                  sortedChoicesWithScores={
                    sortedChoicesWithScores?.length
                      ? sortedChoicesWithScores
                      : choicesWithScores
                  }
                  proposal={proposal}
                />
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <>
          {
            <Results
              sortedChoicesWithScores={
                sortedChoicesWithScores?.length
                  ? sortedChoicesWithScores
                  : choicesWithScores
              }
              voterUserData={voterUserData}
              proposal={proposal}
            />
          }
        </>
      )}
    </>
  );
};

export default VotingNavbar;
