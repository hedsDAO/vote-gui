"use client";

import { useAppSelector } from "@/store/hooks";

import { Box, Flex, Grid } from "@/common";
import DesktopProposalNav from "@/app/[space]/[id]/_components/DesktopProposalNav/DesktopProposalNav";
import MobileProposalNav from "@/app/[space]/[id]/_components/MobileProposalNav/MobileProposalNav";
import * as styles from "@/app/[space]/[id]/_components/ProposalNavbar/styles";

/**
 * @const {JSX.Element} ProposalNavbar
 * @description This component is responsible for rendering the mobile and desktop proposal navbars.
 * @returns {JSX.Element} The proposal navbar component.
 */

const ProposalNavbar = () => {
  const proposal = useAppSelector((store) => store.proposal?.proposal);
  return (
    <Flex {...styles.$proposalNavbarParentFlexStyles}>
      <Box {...styles.$proposalNavbarBoxStyles} />
      {proposal && (
        <Grid {...styles.$navbarGridStyles}>
          <DesktopProposalNav />
          <MobileProposalNav />
        </Grid>
      )}
    </Flex>
  );
};

export default ProposalNavbar;
