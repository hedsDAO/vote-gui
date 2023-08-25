"use client";
import { SortedChoice } from "@/common/types";
import { Proposal, QuadraticVote, SingleChoiceVote } from "hedsvote";
import ClosedImageCard from "./ClosedImageCard";
import OpenImageCard from "./OpenImageCard";
import { fetchAuthorByWallet } from "@/store/proposal";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from '@/store/hooks';

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
  const dispatch = useAppDispatch();
  const author = useAppSelector((state) => state.proposal.author);
  console.log(author)
 useEffect(() => {
  dispatch(fetchAuthorByWallet("0x6402fE3Af805FcEe00E9b4b635e689Dc0d1FFFbF"))
 }, [author])

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
