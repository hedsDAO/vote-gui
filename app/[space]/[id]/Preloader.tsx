"use client";

import { useRef } from "react";
import { store } from "@/store";
import { setAuthor, setProposal, setVoteParticipants, VoteParticipants, setSpaceData, ScoreData, setScoreData } from "@/store/proposal";
import { Proposal, SpaceData } from "hedsvote";
// import { Pokemon } from "@/types";

function Preloader({ proposal, author, voteParticipants, spaceData, scoreData }: { proposal: Proposal, author: string, voteParticipants: VoteParticipants, spaceData: SpaceData, scoreData: ScoreData }) {
  const loaded = useRef(false);
  if (!loaded.current) {
    store.dispatch(setProposal(proposal));
    store.dispatch(setAuthor(author));
    store.dispatch(setVoteParticipants(voteParticipants));
    store.dispatch(setSpaceData(spaceData));
    store.dispatch(setScoreData(scoreData));
    loaded.current = true;
  }

  return null;
}

export default Preloader;