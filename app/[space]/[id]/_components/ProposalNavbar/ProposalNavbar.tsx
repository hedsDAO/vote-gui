"use client";
import { Box, Flex, Grid } from "@/common";
import { useAppSelector } from "@/store/hooks";
import { useState } from "react";
import DesktopProposalNav from "../DesktopProposalNav/DesktopProposalNav";
import MobileProposalNav from "../MobileProposalNav/MobileProposalNav";
import ProposalChoices from "../ProposalChoices/ProposalChoices";
import ProposalVoters from "../ProposalVoters/ProposalVoters";
import * as styles from "@/app/[space]/[id]/_components/ProposalNavbar/styles";

const ProposalNavbar = () => {
  const [isShowingResults, setIsShowingResults] = useState(false);
  const [isShowingVoters, setIsShowingVoters] = useState(false);
  const [currentView, setCurrentView] = useState<"grid" | "list">("grid");
  const proposal = useAppSelector((state) => state.proposal?.proposal);

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
