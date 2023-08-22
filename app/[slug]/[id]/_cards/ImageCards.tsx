"use client";
import { SortedChoice } from "@/common/types";
import { Proposal } from "hedsvote";
import { useAccount } from "wagmi";
import ClosedImageCard from "./ClosedImageCard";
import OpenImageCard from "./OpenImageCard";

const ImageCards = ({
  proposal,
  sortedChoicesWithScores,
  votingStatus,
}: {
  proposal: Proposal;
  sortedChoicesWithScores?: SortedChoice[];
  votingStatus: string;
}) => {
  const { address } = useAccount();
  const userVote = (proposal?.votes || []).filter(
    (vote) => vote.voter?.toLowerCase() === address?.toLowerCase()
  );
  if (votingStatus === "closed") {
    console.log('closed image')
    return (
      <>
        {sortedChoicesWithScores?.map((choice) => {
          return <ClosedImageCard userVote={userVote} choice={choice} />;
        })}
      </>
    );
  } else if (votingStatus === "open") {
    return (
      <>
        {proposal?.choices?.map((choice) => {
          return <OpenImageCard choice={choice} />;
        })}
      </>
    );
  }
};

export default ImageCards;
