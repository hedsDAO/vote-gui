"use client";
import { Box, Flex, Grid } from "@/common";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { useEffect, useState } from "react";
import DesktopProposalNav from "../DesktopProposalNav/DesktopProposalNav";
import MobileProposalNav from "../MobileProposalNav/MobileProposalNav";
import ProposalChoices from "../ProposalChoices/ProposalChoices";
import ProposalVoters from "../ProposalVoters/ProposalVoters";
import * as styles from "@/app/[space]/[id]/_components/ProposalNavbar/styles";
import { getHedsTapeTracks } from "@/_actions";
import { setProposal } from "@/store/proposal";

const ProposalNavbar = () => {
  const [isShowingResults, setIsShowingResults] = useState(false);
  const [isShowingVoters, setIsShowingVoters] = useState(false);
  const [currentView, setCurrentView] = useState<"grid" | "list">("grid");
  const dispatch = useAppDispatch()
  const proposal = useAppSelector((state) => state.proposal?.proposal);
  const isHedstape = proposal?.choice_type === "audio" && proposal.space_name === "heds";

  const checkIfChoiceIsPublic = async() => {
    if (!proposal) return;
    const updatedChoices = await getHedsTapeTracks(proposal?.choices);
    if (!updatedChoices) return;
    console.log("updated choices", updatedChoices)
    const updatedProposal = {...proposal, choices: updatedChoices}
    dispatch(setProposal(updatedProposal));
  }

  useEffect(() => {
    checkIfChoiceIsPublic()
  },[isHedstape])

  return (
    <Flex {...styles.$proposalNavbarParentFlexStyles}>
      <Box {...styles.$proposalNavbarBoxStyles} />
      {proposal && <Grid {...styles.$navbarGridStyles}>
        <DesktopProposalNav
          proposal={proposal}
          isShowingVoters={isShowingVoters}
          setIsShowingVoters={setIsShowingVoters}
          isShowingResults={isShowingResults}
          setIsShowingResults={setIsShowingResults}
          currentView={currentView}
          setCurrentView={setCurrentView}
        />
        <MobileProposalNav
          proposal={proposal}
          isShowingVoters={isShowingVoters}
          setIsShowingVoters={setIsShowingVoters}
          isShowingResults={isShowingResults}
          setIsShowingResults={setIsShowingResults}
          currentView={currentView}
          setCurrentView={setCurrentView}
        />
      </Grid>}
      <Grid {...styles.$proposalNavbarCardsGridStyles}>
        {proposal && (
          <ProposalChoices
            proposal={proposal}
            isShowingResults={isShowingResults}
            isShowingVoters={isShowingVoters}
            currentView={currentView}
          />
        )}
        {proposal && <ProposalVoters proposal={proposal} isShowingVoters={isShowingVoters} />}
      </Grid>
    </Flex>
  );
};

export default ProposalNavbar;
