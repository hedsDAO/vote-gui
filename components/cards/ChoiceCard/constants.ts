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
  currentView: GridListChoice;
  choice: Choice;
  isShowingResults: boolean;
  scoreData: ScoreDataProps | any;
}
