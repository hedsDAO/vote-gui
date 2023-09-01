import { Avatar, Box, Flex, Grid, GridItem, Typography } from "@/common";
import { store } from "@/store";
import { useAppSelector } from "@/store/hooks";
import { setProposal } from "@/store/proposal";
import { Choice, createClient } from "hedsvote";

const { getProposal } = createClient();

async function getProposalData(id: string) {
  const allProposals = await getProposal(id);
  const proposalData = allProposals.data;
  return proposalData;
}

const ProposalNavbar = async ({ slug, id }: { slug: string; id: string }) => {
  const stateProposalDataExists = useAppSelector((state) => state.proposal?.proposal?.ipfs_hash?.length);
  let proposal = await getProposalData(id);
  if (proposal && !stateProposalDataExists) {
    store.dispatch(await setProposal(proposal));
  }
  return (
    <>
      <Box w="full" h="1px" bg="blackAlpha.200" />
      <Flex mt={6} mb={4} w="full" maxW="4xl" alignSelf={"center"}>
        <Flex direction={"column"}>
          <Typography
            fontSize={"xl"}
            letterSpacing={"wide"}
            fontWeight={"semibold"}
            textColor={"blackAlpha.800"}
            fontFamily={"grotesk"}
            alignSelf={"start"}
          >
            CHOICES
          </Typography>
        </Flex>
      </Flex>
      <Flex w="full" maxW="4xl" alignSelf={"center"}>
        <Grid gap={3} minW="full" gridTemplateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }}>
          {proposal?.choices?.map((choice: Choice) => (
            <GridItem key={choice?.id} rounded="xl" bg="heds.bg_dark" w="full" color="white" p={2} colSpan={1}>
              <Flex gap={2}>
                <Avatar size="lg" rounded={"lg"} borderRadius="lg" src={choice?.image} />
                <Flex minW='full' direction={'column'}>
                    <Box w='full' maxW="fit-content" minH='20px' bg='white' rounded='lg' />
                </Flex>
              </Flex>
            </GridItem>
          ))}
        </Grid>
      </Flex>
    </>
  );
};

export default ProposalNavbar;
