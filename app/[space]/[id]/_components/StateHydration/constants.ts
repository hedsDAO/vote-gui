import { HedsVoteChoice } from "@/components/cards/ChoiceCard/constants";
import { Choice, QuadraticVote, SingleChoiceVote, Vote } from "hedsvote";

export interface GetHedsTapeTracks {
  (choices: HedsVoteChoice[] | Choice[]): Promise<HedsVoteChoice[] | undefined>;
}

export interface StateHydrationProps {
  getHedsTapeTracks: GetHedsTapeTracks;
  getVoterData: GetVoterData;
  getTapeData: GetTapeData;
  params: { space: string; id: string };
}

export interface GetTapeData {
  (proposal_image: string): Promise<any>;
}
export interface GetVoterData {
  (votes: SingleChoiceVote[] | QuadraticVote[]): Promise<any>;
}
