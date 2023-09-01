"use client";
import { SortedChoice } from "@/common/types";
import { useAppSelector } from "@/store/hooks";
import { getUserVotePercentages } from "@/utils/getUserVotePercentages";
import { Proposal } from "hedsvote";
import { useAccount } from "wagmi";
import ClosedImageCard from "./ClosedImageCard";
import OpenImageCard from "./OpenImageCard";

const ImageCards = ({
  sortedChoicesWithScores,
  votingStatus,
}: {
  sortedChoicesWithScores?: SortedChoice[];
  votingStatus: string;
}) => {
  const { address } = useAccount();
  const proposal = useAppSelector((state) => state.proposal.proposal);
  const userVote = getUserVotePercentages(proposal,address);

  if (votingStatus === "closed") {

    return (
      <>
        {proposal && sortedChoicesWithScores?.map((choice) => {
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
  } else {
    return null
  }
};

export default ImageCards;
