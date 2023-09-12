"use client";
import { Flex, Grid } from "@/common";
import SSRChoiceCard from "@/components/cards/ChoiceCard/SSRChoiceCard";
import * as styles from "@/app/[space]/[id]/_components/ProposalChoices/styles";
import { GridItem } from "@chakra-ui/react";

const SSRProposalChoices = () => {
  let choices = new Array(9).fill("ssr-choices");
  return (
    <GridItem colSpan={{ lg: 5 }}>
      <Grid {...styles.$ssrProposalNavbarCardsGridStyles}>
        {choices?.map((_, idx) => (
          <SSRChoiceCard key={_ + idx} />
        ))}
      </Grid>
    </GridItem>
  );
};

export default SSRProposalChoices;
