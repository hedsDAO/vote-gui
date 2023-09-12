import { VoteSelections } from "./../../../store/activeVote";
import { Proposal, Vote } from "hedsvote";

export const HEADING_TEXT = "Submit your vote";
export const SUBHEADING_TEXT = "Confirm your choices and cast your vote.";
export const BUTTON_TEXT = "CAST VOTE";

export interface VoteArgumentProps {
  proposal: Proposal;
  address: `0x${string}` | string;
  votingPower: number;
  voteSelections: VoteSelections;
}

export const formatVoteArguments = ({
  proposal_id,
  voter,
  vp,
  voteSelections,
}: {
  proposal_id: string;
  voter: string;
  vp: number;
  voteSelections: VoteSelections;
}): Vote | undefined => {
  if (voteSelections)
    return {
      proposal_id,
      voter,
      vp,
      vote_choices: Object.entries(voteSelections)?.map((vote) => ({
        proposal_id,
        choice_id: +vote[0],
        amount: vote[1],
      })),
    };
};
