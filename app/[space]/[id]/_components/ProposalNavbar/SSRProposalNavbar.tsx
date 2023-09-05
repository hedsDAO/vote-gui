"use client";
import { Box, Flex, Grid, Skeleton } from "@/common";
import * as styles from "@/app/[space]/[id]/_components/ProposalNavbar/styles";
import SSRChoiceCard from "@/components/cards/ChoiceCard/SSRChoiceCard";

const SSRProposalNavbar = () => {
  let choices = new Array(9).fill("ssr-choices");
  return (
    <Flex {...styles.$proposalNavbarParentFlexStyles}>
      <Box {...styles.$proposalNavbarBoxStyles} />
      <Flex pr={{ lg: 4 }} justifyContent={"space-between"}>
        <Skeleton minW="12ch" minH="25px" />
        <Flex gap={2}>
          <Skeleton minW="30px" minH="25px" />
          <Skeleton minW="30px" minH="25px" />
        </Flex>
      </Flex>
      <Grid {...styles.$ssrProposalNavbarCardsGridStyles}>
        {choices?.map((_, idx) => (
          <SSRChoiceCard key={_ + idx} />
        ))}
      </Grid>
    </Flex>
  );
};

export default SSRProposalNavbar;
