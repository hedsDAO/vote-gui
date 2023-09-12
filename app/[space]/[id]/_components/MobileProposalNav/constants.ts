import { Proposal } from "hedsvote";

export type GridListChoice = "grid" | "list";

export interface MobileProposalNavProps {
  proposal: Proposal;
  isShowingVoters: boolean;
  setIsShowingVoters: (value: boolean) => void;
  isShowingResults: boolean;
  setIsShowingResults: (value: boolean) => void;
  currentView: GridListChoice;
  setCurrentView: (value: GridListChoice) => void;
  canShowResults: boolean;
  isShowingStrategies: boolean;
  setIsShowingStrategies: (value: boolean) => void;
  isCastingVote: boolean;
  setIsCastingVote: (value: boolean) => void;
}

export const CHOICE_TEXT = 'CHOICES'
export const VOTERS_TEXT = 'VOTERS'
export const VOTE_TEXT = 'VOTE'