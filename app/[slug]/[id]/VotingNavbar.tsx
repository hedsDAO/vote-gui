"use client";

import { QuadraticVote, SingleChoiceVote, quadratic } from "hedsvote";
import { useState, useEffect } from "react";
import Ballot from "./Ballot";
import { SortedChoice, VoterUserData } from "@/common/types";
import AudioCards from "./_cards/AudioCards";
import ImageCards from "./_cards/ImageCards";
import Results from "./Results";
import { useAccount } from "wagmi";

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
  const [scores, setScores] = useState<any>();
  useEffect(() => {
    if (votingStatus === "closed" && !proposal?.scores) {
      const { getScores } = quadratic({
        votes: proposal?.votes,
        choices: proposal?.choices,
      });
      setScores(getScores());
    }
  }, [proposal]);

  const getUserVotePercentages = () => {
    let userVP;
    const userVote = proposal?.votes?.filter((vote: any) => {
      if (vote?.voter?.toLowerCase() === address?.toLowerCase()) {
        userVP = vote?.vp;
        return vote?.vote_choices;
      }
    });
    console.log(userVP, userVote[0]);
  };
  const userVote =
    proposal?.votes?.filter(
      (vote: QuadraticVote | SingleChoiceVote) =>
        vote?.voter?.toLowerCase() === address?.toLowerCase()
    ) || null;
  getUserVotePercentages();
  return (
    <>
      {votingStatus === "open" ? (
        <div className="mt-10 flex items-end justify-between">
          <p className="font-inter text-base font-semibold tracking-wide text-black">
            CHOICES
          </p>
          <Ballot
            strategies={proposal?.strategies}
            proposalId={proposal?.ipfs_hash}
            choices={proposal?.choices}
          />
        </div>
      ) : proposal?.showResults ? (
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
        </div>
      ) : (
        <></>
      )}
      {currentTab === 0 ? (
        <div className="mb-10 flex max-w-5xl text-black">
          <div className="mt-5 flex w-full flex-col gap-5">
            {proposal?.choiceType === "audio" ? (
              <div className="grid w-full grid-cols-1 gap-2 lg:grid-cols-2">
                <AudioCards
                  userVote={userVote?.[0] || null}
                  votingStatus={votingStatus}
                  sortedChoicesWithScores={sortedChoicesWithScores}
                  proposal={proposal}
                />
              </div>
            ) : proposal?.choiceType === "image" ? (
              <div className="grid w-full grid-cols-1 gap-2 lg:grid-cols-2">
                <ImageCards
                  userVote={userVote?.[0] || null}
                  votingStatus={votingStatus}
                  sortedChoicesWithScores={sortedChoicesWithScores}
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
          {sortedChoicesWithScores && (
            <Results
              sortedChoicesWithScores={sortedChoicesWithScores}
              voterUserData={voterUserData}
              proposal={proposal}
            />
          )}
        </>
      )}
    </>
  );
};

export default VotingNavbar;
