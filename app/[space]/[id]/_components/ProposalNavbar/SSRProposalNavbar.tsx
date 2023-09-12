"use client";
import { Box, Flex, Skeleton } from "@/common";
import * as styles from "@/app/[space]/[id]/_components/ProposalNavbar/styles";

const SSRProposalNavbar = () => {
  return (
    <Flex {...styles.$proposalNavbarParentFlexStyles}>
      <Box {...styles.$proposalNavbarBoxStyles} />
      <Flex {...styles.$ssrProposalNavbarFlexStyles}>
        <Skeleton {...styles.$proposalNavbarSkeleton1Styles} />
        <Flex gap={2}>
          <Skeleton {...styles.$proposalNavbarSkeleton2Styles} />
          <Skeleton {...styles.$proposalNavbarSkeleton2Styles} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SSRProposalNavbar;
