import { HedsVoteChoice } from "@/components/cards/ChoiceCard/constants";
import { Choice, QuadraticVote, SingleChoiceVote, Vote } from "hedsvote";

export interface GetHedsTapeTracks {
  (choices: HedsVoteChoice[] | Choice[]): Promise<HedsVoteChoice[] | undefined>;
}

export interface StateHydrationProps {
  getHedsTapeTracks: GetHedsTapeTracks;
  getVoterData: GetVoterData;
  params: { space: string; id: string };
}

export interface GetVoterData {
  (votes: SingleChoiceVote[] | QuadraticVote[]): Promise<any>;
}
