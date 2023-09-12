import { HedsVoteChoice } from "@/components/cards/ChoiceCard/constants";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Choice, Proposal, QuadraticVote, SpaceData, quadratic } from "hedsvote";

export type VoteParticipantsProps = {
  voterData: {
    [wallet: string]: {
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

export interface CanShowResultsData {
  spaceAuthors: string[];
  address: string;
  proposal: Proposal;
}

export interface ProposalState {
  proposal: Proposal | null;
  author: string;
  voteParticipants?: VoteParticipants | undefined;
  spaceData: SpaceData;
  publicStatus: PublicStatus | null;
  scoreData?: ScoreData | null;
  isShowingResults: boolean;
  isShowingVoters: boolean;
  isShowingStrategies: boolean;
  isCastingVote: boolean;
  isVoteOpen: boolean;
  votingPower: number;
  canShowResults: boolean;
  hasCheckedPublicStatus: boolean;
  currentView: "grid" | "list";
}

const initialState: ProposalState = {
  proposal: null,
  author: "",
  voteParticipants: {},
  spaceData: {
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
    setAuthor(state, action: PayloadAction<string>) {
      state.author = action.payload;
    },
    setVoteParticipants(state, action: PayloadAction<VoteParticipantsProps>) {
      if (!action.payload.proposal || !action.payload.voterData) return;
      const { proposal, voterData } = action.payload;
      console.log(voterData, 'voterData')
      const voteParticipants: VoteParticipants = {};
      proposal.votes?.forEach((vote) => {
        const voter = vote.voter?.toLowerCase();
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
      const { getScores } = quadratic({
        votes: proposal.votes as QuadraticVote[],
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
      const starTimeMS = new Date(proposal?.start_time).getTime();
      const endTimeMS = new Date(proposal?.end_time).getTime();
      const proposalIsOpen = currentTimeMS < endTimeMS && currentTimeMS > starTimeMS;
      const proposalIsClosed = currentTimeMS > endTimeMS;
      if (proposalIsOpen) state.isVoteOpen = true;
      else if (proposalIsClosed) state.isVoteOpen = false;
    },
    setCanShowResults(state, action: PayloadAction<CanShowResultsData>) {
      if (!action.payload.address || !action.payload.proposal || !action.payload.spaceAuthors?.length) return;
      const { spaceAuthors, address, proposal } = action.payload;
      const currentTimeMS = new Date().getTime();
      const starTimeMS = new Date(proposal?.start_time).getTime();
      const endTimeMS = new Date(proposal?.end_time).getTime();
      const proposalIsOpen = currentTimeMS < endTimeMS && currentTimeMS > starTimeMS;
      const proposalIsClosed = currentTimeMS > endTimeMS;
      const proposalHasVotes = proposal?.votes?.length;
      const isShowingResults = proposal?.show_results;
      const isAdmin = spaceAuthors?.find((author) => author?.toLowerCase() === address?.toLowerCase()) ? true : false;
      const isAuthor = address?.toLowerCase() === proposal?.author?.toLowerCase();
      if (proposalHasVotes) {
        if (proposalIsOpen && (isAdmin || isAuthor)) state.canShowResults = true;
        else if (proposalIsClosed && isShowingResults) state.canShowResults = true;
        else if (proposalIsClosed && !isShowingResults && (isAdmin || isAuthor)) state.canShowResults = false;
      } else {
        state.canShowResults = false;
      }
    },
    setPublicStatus(state, action: PayloadAction<PublicStatus>) {
      state.publicStatus = action.payload;
    },
    setVotingPower: (state, action: PayloadAction<number>) => {
      state.votingPower = action.payload;
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
  setCurrentView,
  setHasCheckedPublicStatus,
  setIsVoteOpen,
  setVotingPower,
  setPublicStatus,
  reset,
} = proposalSlice.actions;
export default proposalSlice.reducer;
