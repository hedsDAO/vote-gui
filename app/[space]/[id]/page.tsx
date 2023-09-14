"use client";

import dynamic from "next/dynamic";
import { Flex, Grid } from "@/common";
import { getHedsTapeTracks, getVoterData, getTapeData } from "@/_actions";

import SSRProposalNavbar from "@/app/[space]/[id]/_components/ProposalNavbar/SSRProposalNavbar";
import SSRProposalDetails from "@/app/[space]/[id]/_components/ProposalDetails/SSRProposalDetails";
import SSRProposalChoices from "@/app/[space]/[id]/_components/ProposalChoices/SSRProposalChoices";
import * as styles from "@/app/[space]/[id]/styles";

/**
 * @constant {JSX.Element} Proposal
 * @param {object} params - The params object contains the space and id of the proposal.
 * @description This component is responsible for dynamically rendering the proposal and associated SSR/non-SSR components.
 * @returns {JSX.Element} The proposal page.
 */

const Details = dynamic(() => import("./_components/ProposalDetails/ProposalDetails"), { loading: () => <SSRProposalDetails /> });
const Navbar = dynamic(() => import("./_components/ProposalNavbar/ProposalNavbar"), { loading: () => <SSRProposalNavbar /> });
const Choices = dynamic(() => import("./_components/ProposalChoices/ProposalChoices"), { loading: () => <SSRProposalChoices /> });
const Voters = dynamic(() => import("./_components/ProposalVoters/ProposalVoters"), { ssr: false });
const StateHydration = dynamic(() => import("./_components/StateHydration/StateHydration"), { ssr: false });
const StrategiesModal = dynamic(() => import("@/components/modals/VotingStrategiesModal/VotingStrategiesModal"), { ssr: false });
const VoteModal = dynamic(() => import("@/components/modals/CastVoteModal/CastVoteModal"), { ssr: false });

const Proposal = ({ params }: { params: { space: string; id: string } }) => {
  return (
    <Flex {...styles.$proposalParentFlexStyles}>
      <StateHydration getTapeData={getTapeData} getVoterData={getVoterData} getHedsTapeTracks={getHedsTapeTracks} params={params} />
      <Details />
      <Navbar />
      <Grid {...styles.$proposalGridStyles}>
        <Choices />
        <Voters />
      </Grid>
      <StrategiesModal />
      <VoteModal />
    </Flex>
  );
};

export default Proposal;
