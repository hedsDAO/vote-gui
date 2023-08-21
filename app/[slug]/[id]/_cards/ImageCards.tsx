import { SortedChoice } from "@/common/types";
import { Proposal } from "hedsvote";
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
  if (votingStatus === "closed") {
    return (
      <>
        {sortedChoicesWithScores?.map((choice) => {
          return <ClosedImageCard choice={choice} />;
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
