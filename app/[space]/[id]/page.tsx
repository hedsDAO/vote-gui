"use client";

import { Flex } from "@/common";
import dynamic from "next/dynamic";
import * as styles from "@/app/[space]/[id]/styles";
import SSRProposalDetails from "./_components/ProposalDetails/SSRProposalDetails";
import SSRProposalNavbar from "./_components/ProposalNavbar/SSRProposalNavbar";

const ProposalDetails = dynamic(() => import("./_components/ProposalDetails/ProposalDetails"), {
  loading: () => <SSRProposalDetails />,
});

const ProposalNavbar = dynamic(() => import("./_components/ProposalNavbar/ProposalNavbar"), {
  loading: () => <></>,
});

const Proposal = ({ params }: { params: { space: string; id: string } }) => {
  const { space: slug, id } = params;
  return (
    <Flex {...styles.$proposalParentFlexStyles}>
      <ProposalDetails slug={slug} id={id} />
      <ProposalNavbar slug={slug} id={id} />
    </Flex>
  );
};

export default Proposal;
