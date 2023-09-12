"use client";
import { useAppSelector } from "@/store/hooks";
import { Choice } from "hedsvote";

import ChoiceCard from "@/components/cards/ChoiceCard/ChoiceCard";
import { Grid, GridItem } from "@/common";
import { sortChoices } from "@/utils/sortChoices";
import * as styles from "@/app/[space]/[id]/_components/ProposalChoices/styles";
import SSRProposalChoices from "./SSRProposalChoices";

/**
 * @const {JSX.Element} ProposalChoices
 * @description This component is responsible for rendering the proposal choices and sorting them when showing results.
 * @returns {JSX.Element} The proposal choices component.
 */

const ProposalChoices = () => {
  const { currentView, isShowingVoters, proposal, scoreData, isShowingResults } = useAppSelector((state) => state.proposal);
  return (
    <>
      {proposal ? (
        <GridItem {...styles.$proposalChoicesGridItemStyles(isShowingVoters)}>
          <Grid {...styles.$proposalContentGridStyles(currentView)}>
            {isShowingResults && scoreData
              ? sortChoices(proposal, scoreData)?.map((choice) => <ChoiceCard choice={choice} key={choice?.id} />)
              : proposal?.choices?.map((choice: Choice) => {
                  return <ChoiceCard choice={choice} key={choice.id} />;
                })}
          </Grid>
        </GridItem>
      ) : (
        <SSRProposalChoices />
      )}
    </>
  );
};

export default ProposalChoices;
