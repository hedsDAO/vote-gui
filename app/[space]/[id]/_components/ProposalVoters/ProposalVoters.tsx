import { useMemo } from "react";
import { Proposal } from "hedsvote";
import { Grid, GridItem } from "@/common";
import VoterCard from "@/components/cards/VoterCard/VoterCard";
import { store } from "@/store";
import * as styles from "@/app/[space]/[id]/_components/ProposalVoters/styles";

const ProposalVoters = ({ proposal, isShowingVoters }: { proposal: Proposal; isShowingVoters: boolean }) => {
  const stateVoterData = store.getState().proposal?.voteParticipants;
  const sortedVotessByVp = useMemo(
    () => [...(proposal?.votes || [])].sort((a, b) => (b?.vp || 0) - (a?.vp || 0)),
    proposal?.votes
  );
  return (
    <GridItem {...styles.$proposalVotersGridItemStyles(isShowingVoters)}>
      <Grid {...styles.$proposalVotersGridStyles}>
        {sortedVotessByVp.map((vote) => (
          <VoterCard key={vote?.voter} vote={vote} image={stateVoterData?.[vote.voter]?.profilePicture} />
        ))}
      </Grid>
    </GridItem>
  );
};

export default ProposalVoters;
