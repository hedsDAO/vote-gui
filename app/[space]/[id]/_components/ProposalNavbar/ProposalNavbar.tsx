"use client";
import { Avatar, Box, Flex, Grid, GridItem, Typography } from "@/common";
import { useAppSelector } from "@/store/hooks";
import { Choice } from "hedsvote";

const ProposalNavbar = ({ slug, id }: { slug: string; id: string }) => {
  const proposal = useAppSelector((state) => state.proposal?.proposal);

  return (
    <Flex px={{base: 8, lg:0}} direction={"column"}>
      <Box w="full" h="1px" bg="blackAlpha.200" />
      <Flex my={6} w="full" maxW="4xl" alignSelf={"center"}>
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
              <Flex gap={3}>
                <Avatar size="lg" rounded={"lg"} borderRadius="lg" src={choice?.image} />
                <Flex py={1} mt={'-1'} justifyContent={'center'} minW="full" gap={2} direction={"column"}>
                  <Typography fontSize={'xs'} fontFamily={'grotesk'}>{choice.name}</Typography>
                  <Flex gap={{ base: "1.5px", lg: "2px" }}>
                    {new Array(50).fill(0).map((_, idx) => (
                      <Box key={"bar" + idx} h={2} w={{ base: "1.5px", lg: "1.5px" }} cursor={"pointer"} bg="white" />
                    ))}
                  </Flex>
                </Flex>
              </Flex>
            </GridItem>
          ))}
        </Grid>
      </Flex>
    </Flex>
  );
};

export default ProposalNavbar;
