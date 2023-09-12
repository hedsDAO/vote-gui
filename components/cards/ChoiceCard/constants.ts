import { Choice } from "hedsvote";

export type GridListChoice = "grid" | "list";
export interface ScoreDataProps {
  totalScore: any;
  sortedChoicesWithScores: any;
  sortedScores: {
    [key: string]: any;
  };
}
export interface AudioChoiceCardProps {
  choiceType: string;
  choice: HedsVoteChoice | Choice;
  isShowingResults: boolean;
}

export interface HedsVoteChoice extends Choice {
  isPublic: boolean;
}