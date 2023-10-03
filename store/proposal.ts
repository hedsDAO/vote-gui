import { HedsVoteChoice } from "@/components/cards/ChoiceCard/constants";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Choice, Proposal, SpaceData, QuadraticVoting } from "@heds-dev/hedsvote";
import { VoteSelections } from "./activeVote";
import _ from "lodash";

export type VoteParticipantsProps = {
  voterData: {
    [userId: string]: {
      display_name: string;
      profile_picture: string;
    };
  };
  proposal: Proposal;
};

export type VoteParticipants = {
  [voter: string]: {
    displayName: string;
    profilePicture: string;
  };
};

export interface HedsVoteProposal extends Proposal {
  choices: HedsVoteChoice[] | Choice[];
}

export interface PublicStatus {
  [key: string]: boolean;
}

export interface ScoreData {
  [key: string]: {
    percentage: number;
    totalScore: number;
    score: number;
  };
}

export interface HoveringChoiceData {
  [id: number]: string;
}

export interface CanShowResultsData {
  spaceAuthors: number[];
  userId: number;
  proposal: Proposal;
}

export interface CanShowResultsDefault {
  proposal: Proposal;
  show: boolean;
}

export interface ProposalState {
  proposal: Proposal | null;
  author: number;
  voteParticipants?: VoteParticipants | undefined;
  spaceData: SpaceData;
  publicStatus: PublicStatus | null;
  scoreData?: ScoreData | null;
  isShowingResults: boolean;
  isShowingVoters: boolean;
  isShowingStrategies: boolean;
  isCastingVote: boolean;
  isVoteOpen: boolean;
  hoveringVote: HoveringChoiceData | null;
  chosenTracks: string[] | null;
  previousVote: VoteSelections | null;
  votingPower: number;
  canShowResults: boolean;
  hasCheckedPublicStatus: boolean;
  currentView: "grid" | "list";
}

const initialState: ProposalState = {
  proposal: null,
  author: 0,
  voteParticipants: {},
  spaceData: {
    id: 0,
    description: "",
    name: "",
    authors: [],
    image: "",
  },
  scoreData: null,
  publicStatus: null,
  isShowingResults: false,
  isShowingVoters: false,
  isShowingStrategies: false,
  isCastingVote: false,
  isVoteOpen: false,
  hoveringVote: null,
  chosenTracks: null,
  previousVote: null,
  votingPower: 0,
  canShowResults: false,
  hasCheckedPublicStatus: false,
  currentView: "grid",
};

const proposalSlice = createSlice({
  name: "proposal",
  initialState,
  reducers: {
    setProposal(state, action: PayloadAction<Proposal>) {
      state.proposal = action.payload;
    },
    setAuthor(state, action: PayloadAction<number>) {
      state.author = action.payload;
    },
    setVoteParticipants(state, action: PayloadAction<VoteParticipantsProps>) {
      if (!action.payload.proposal || !action.payload.voterData) return;
      const { proposal, voterData } = action.payload;
      const voteParticipants: VoteParticipants = {};
      proposal.votes?.forEach((vote) => {
        const voter = vote.voter;
        const displayName = voterData[voter]?.display_name;
        const profilePicture = voterData[voter]?.profile_picture;
        voteParticipants[voter] = { displayName, profilePicture };
      });
      state.voteParticipants = voteParticipants;
    },
    setSpaceData(state, action: PayloadAction<SpaceData>) {
      state.spaceData = action.payload;
    },
    setIsShowingResults(state, action: PayloadAction<boolean>) {
      state.isShowingResults = action.payload;
    },
    setIsShowingVoters(state, action: PayloadAction<boolean>) {
      state.isShowingVoters = action.payload;
    },
    setIsShowingStrategies(state, action: PayloadAction<boolean>) {
      state.isShowingStrategies = action.payload;
    },
    setIsCastingVote(state, action: PayloadAction<boolean>) {
      state.isCastingVote = action.payload;
    },
    setCurrentView(state, action: PayloadAction<"grid" | "list">) {
      state.currentView = action.payload;
    },
    setHasCheckedPublicStatus(state, action: PayloadAction<boolean>) {
      state.hasCheckedPublicStatus = action.payload;
    },
    setScoreData(state, action: PayloadAction<Proposal>) {
      const proposal = action.payload;
      if (!proposal.votes) return;
      const { getScores } = QuadraticVoting({
        votes: proposal.votes,
        choices: proposal.choices,
      });
      const scores = getScores();
      let scoreData: ScoreData = {};
      const totalScore = Object.values(scores).reduce((acc: number, val: any) => acc + val, 0);
      Object.entries(scores).forEach(([key, score]) => {
        const scorePercentage = (score / totalScore) * 100;
        const percentage = Math.round((scorePercentage + Number.EPSILON) * 100) / 100;
        scoreData[key] = { percentage, totalScore, score };
      });
      state.scoreData = scoreData;
    },
    setIsVoteOpen(state, action: PayloadAction<{ proposal: Proposal }>) {
      const proposal = action.payload.proposal;
      if (!proposal) return;
      const currentTimeMS = new Date().getTime();
      const starTimeMS = new Date(Number(proposal?.start_time)).getTime();
      const endTimeMS = new Date(Number(proposal?.end_time)).getTime();
      const proposalIsOpen = currentTimeMS < endTimeMS && currentTimeMS > starTimeMS;
      const proposalIsClosed = currentTimeMS > endTimeMS;
      if (proposalIsOpen) state.isVoteOpen = true;
      else if (proposalIsClosed) state.isVoteOpen = false;
    },
    setCanShowResults(state, action: PayloadAction<CanShowResultsData>) {
      if (!action.payload.userId || !action.payload.proposal || !action.payload.spaceAuthors?.length) return;
      const { spaceAuthors, userId, proposal } = action.payload;
      const currentTimeMS = new Date().getTime();
      const starTimeMS = new Date(Number(proposal?.start_time)).getTime();
      const endTimeMS = new Date(Number(proposal?.end_time)).getTime();
      const proposalIsOpen = currentTimeMS < endTimeMS && currentTimeMS > starTimeMS;
      const proposalIsClosed = currentTimeMS > endTimeMS;
      const proposalHasVotes = proposal?.votes?.length;
      const isShowingResults = proposal?.show_results;
      const isAdmin = spaceAuthors?.find((author) => author === userId ? true : false);
      const isAuthor = userId === proposal.author;
      if (proposalHasVotes) {
        if (proposalIsOpen && (isAdmin || isAuthor)) state.canShowResults = true;
        else if (proposalIsClosed && isShowingResults) state.canShowResults = true;
        else if (proposalIsClosed && !isShowingResults && (isAdmin || isAuthor)) state.canShowResults = false;
      } else {
        state.canShowResults = false;
      }
    },
    setCanShowResultsDefault(state, action: PayloadAction<CanShowResultsDefault>) {
      if (!action.payload.proposal) state.canShowResults = false;
      const proposal = action.payload.proposal;
      const currentTimeMS = new Date().getTime();
      const starTimeMS = new Date(Number(proposal?.start_time)).getTime();
      const endTimeMS = new Date(Number(proposal?.end_time)).getTime();
      const proposalIsOpen = currentTimeMS < endTimeMS && currentTimeMS > starTimeMS;
      if (!proposalIsOpen) state.canShowResults = true;
    },
    setPublicStatus(state, action: PayloadAction<PublicStatus>) {
      state.publicStatus = action.payload;
    },
    setVotingPower: (state, action: PayloadAction<number>) => {
      state.votingPower = action.payload;
    },
    setHoveringVote: (state, action: PayloadAction<HoveringChoiceData | null>) => {
      state.hoveringVote = action.payload;
    },
    setChosenTracks: (state, action: PayloadAction<string[] | null>) => {
      state.chosenTracks = action.payload;
    },
    setPreviousVote: (state, action: PayloadAction<VoteSelections>) => {
      if (!_.isEmpty(action?.payload)) state.previousVote = action.payload;
    },
    reset: () => initialState,
  },
});

export const {
  setAuthor,
  setProposal,
  setVoteParticipants,
  setSpaceData,
  setScoreData,
  setIsCastingVote,
  setIsShowingResults,
  setIsShowingStrategies,
  setIsShowingVoters,
  setCanShowResults,
  setCanShowResultsDefault,
  setCurrentView,
  setHasCheckedPublicStatus,
  setIsVoteOpen,
  setVotingPower,
  setPublicStatus,
  setHoveringVote,
  setChosenTracks,
  setPreviousVote,
  reset,
} = proposalSlice.actions;
export default proposalSlice.reducer;
