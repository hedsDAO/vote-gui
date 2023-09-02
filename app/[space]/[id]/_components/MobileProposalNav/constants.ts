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
}

export const CHOICE_TEXT = 'CHOICES'
export const VOTERS_TEXT = 'VOTERS'