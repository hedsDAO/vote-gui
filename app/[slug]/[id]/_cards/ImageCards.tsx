"use client";
import { SortedChoice } from "@/common/types";
import { Proposal, QuadraticVote, SingleChoiceVote } from "hedsvote";
import ClosedImageCard from "./ClosedImageCard";
import OpenImageCard from "./OpenImageCard";

const ImageCards = ({
  proposal,
  sortedChoicesWithScores,
  votingStatus,
  userVote
}: {
  userVote: any | null;
  proposal: Proposal;
  sortedChoicesWithScores?: SortedChoice[];
  votingStatus: string;
}) => {
  if (votingStatus === "closed") {

    return (
      <>
        {sortedChoicesWithScores?.map((choice) => {
          return <ClosedImageCard proposal={proposal} key={choice.id} userVote={userVote} choice={choice} />;
        })}
      </>
    );
  } else if (votingStatus === "open") {
    return (
      <>
        {proposal?.choices?.map((choice) => {
          return <OpenImageCard userVote={userVote} key={choice.id} choice={choice} />;
        })}
      </>
    );
  }
};

export default ImageCards;
