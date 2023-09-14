import { Flex, Grid } from "@/common";
import SSRProposalCard from "@/components/cards/ProposalCard/SSRProposalCard";
import * as styles from "@/app/[space]/_components/Proposals/styles";

const SSRProposals = () => {
  let proposals = new Array(3).fill("ssr-proposal");
  return (
    <Flex {...styles.$parentProposalFlexStyles}>
      <Flex {...styles.$contentFlexStyles}>
        <Grid {...styles.$gridContainerStyles}>
          {proposals?.map((_, idx) => (
            <SSRProposalCard key={_ + idx} />
          ))}
        </Grid>
      </Flex>
    </Flex>
  );
};

export default SSRProposals;
