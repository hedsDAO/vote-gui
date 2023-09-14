"use client";

import { useMemo } from "react";
import { useAppSelector } from "@/store/hooks";

import { Grid, GridItem } from "@/common";
import { VoterCard } from "@/components/cards";
import * as styles from "@/app/[space]/[id]/_components/ProposalVoters/styles";
import * as constants from "@/app/[space]/[id]/_components/ProposalVoters/constants";

/**
 * @const {JSX.Element} ProposalVoters
 * @description This component is responsible for rendering the proposal voter cards.
 * @returns {JSX.Element} The proposal voters component.
 */

const ProposalVoters = () => {
  const proposal = useAppSelector((store) => store.proposal?.proposal);
  const { isShowingVoters } = useAppSelector((store) => store.proposal);
  const stateVoterData = useAppSelector((store) => store.proposal?.voteParticipants);
  const sortedVotessByVp = useMemo(
    () => [...(proposal?.votes || [])].sort((a, b) => (b?.vp || 0) - (a?.vp || 0)),
    [proposal?.votes]
  );
  return (
    <GridItem {...styles.$proposalVotersGridItemStyles(isShowingVoters)}>
      <Grid {...styles.$proposalVotersGridStyles}>
        {sortedVotessByVp.map((vote) => (
          <VoterCard
            key={vote?.voter}
            vote={vote}
            image={stateVoterData?.[vote.voter?.toLowerCase()]?.profilePicture || constants.defaultImage}
          />
        ))}
      </Grid>
    </GridItem>
  );
};

export default ProposalVoters;
