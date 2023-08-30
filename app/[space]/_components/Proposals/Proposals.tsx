import { createClient } from "hedsvote";
import Link from "next/link";
import ProposalCard from "@/components/cards/ProposalCard/ProposalCard";
import { Flex, Grid, Typography } from "@/common";
import * as styles from "@/app/[space]/_components/Proposals/styles";
import * as constants from "@/app/[space]/_components/Proposals/constants";

const { getAllProposalsInSpace } = createClient();

async function getProposals(name: string) {
  const proposals = await getAllProposalsInSpace(name);
  return proposals.data;
}

const Proposals = async ({ slug }: { slug: string }) => {
  const proposals: any[] | undefined = await getProposals(slug);
  return (
    <Flex {...styles.$parentProposalFlexStyles}>
      <Flex {...styles.$contentFlexStyles}>
        <Typography {...styles.$proposalHeaderTextStyles}>{constants.PROPOSAL_HEADER_TEXT}</Typography>
        <Grid {...styles.$gridContainerStyles}>
          {proposals?.map((proposal, idx) => (
            <Link href={`${slug}/${proposal?.ipfs_hash}`} key={proposal?.author + idx}>
              <ProposalCard {...proposal} />
            </Link>
          ))}
        </Grid>
      </Flex>
    </Flex>
  );
};

export default Proposals;
