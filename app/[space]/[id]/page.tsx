"use client";

import { Flex } from "@/common";
import dynamic from "next/dynamic";
import * as styles from "@/app/[space]/[id]/styles";
import SSRProposalDetails from "./_components/ProposalDetails/SSRProposalDetails";
import SSRProposalNavbar from "./_components/ProposalNavbar/SSRProposalNavbar";
import { useAppSelector } from "@/store/hooks";

const ProposalDetails = dynamic(() => import("./_components/ProposalDetails/ProposalDetails"), {
  loading: () => <SSRProposalDetails />,
});

const ProposalNavbar = dynamic(() => import("./_components/ProposalNavbar/ProposalNavbar"), {
  loading: () => <SSRProposalNavbar />,
});

const Proposal = ({ params }: { params: { space: string; id: string } }) => {
  const { space: slug, id } = params;
  const proposal = useAppSelector((state) => state.proposal?.proposal);
  return (
    <Flex {...styles.$proposalParentFlexStyles}>
      <ProposalDetails slug={slug} id={id} />
      {proposal && <ProposalNavbar slug={slug} id={id} />}
    </Flex>
  );
};

export default Proposal;
