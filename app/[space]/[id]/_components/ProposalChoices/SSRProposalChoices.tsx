"use client";
import { Flex, Grid } from "@/common";
import SSRChoiceCard from "@/components/cards/ChoiceCard/SSRChoiceCard";
import * as styles from "@/app/[space]/[id]/_components/ProposalChoices/styles";

const SSRProposalChoices = () => {
  let choices = new Array(9).fill("ssr-choices");
  return (
    <Flex {...styles.$proposalChoicesParentFlexStyles} minW='100vw'>
      <Grid {...styles.$ssrProposalNavbarCardsGridStyles}>
        {choices?.map((_, idx) => (
          <SSRChoiceCard key={_ + idx} />
        ))}
      </Grid>
    </Flex>
  );
};

export default SSRProposalChoices;
