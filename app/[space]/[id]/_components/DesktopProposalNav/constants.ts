import { Proposal } from "hedsvote";

export const CHOICE_TITLE_TEXT = "CHOICES";
export const RESULTS_TITLE_TEXT = "RESULTS";
export const SHOW_VOTERS_TEXT = "SHOW VOTERS";
export const VOTERS_TITLE_TEXT = "VOTERS";
export const LIST_BUTTON_ARG = "list";
export const GRID_BUTTON_ARG = "grid";
export type GridListChoice = "grid" | "list";

export interface DesktopProposalNavProps {
  proposal: Proposal;
  isShowingVoters: boolean;
  setIsShowingVoters: (value: boolean) => void;
  isShowingResults: boolean;
  setIsShowingResults: (value: boolean) => void;
  currentView: GridListChoice;
  setCurrentView: (value: GridListChoice) => void;
}
