import { Flex, Typography } from "@/common";
import { createClient } from "hedsvote";

const SSRProposalNavbar = () => {
  return (
    <Flex w='full' maxW='4xl' alignSelf={'center'}>
      <Typography alignSelf={'start'}>SSR</Typography>
    </Flex>
  );
};

export default SSRProposalNavbar;
