"use client";
import { Avatar, Box, Center, Flex, Grid, GridItem, Typography } from "@/common";
import { CaretDown, CaretUp, Play } from "@/common/Icons";
import { getScoreData } from "@/utils/getScoreData";
import { Choice, Proposal } from "hedsvote";

const ProposalChoices = ({
  proposal,
  isShowingVoters,
  isShowingResults,
  currentView,
}: {
  proposal: Proposal;
  isShowingVoters: boolean;
  isShowingResults: boolean;
  currentView: "list" | "grid";
}) => {
  const scoreData = getScoreData(proposal);
  return (
    <GridItem
      display={{ base: isShowingVoters ? "none" : "flex", lg: "flex" }}
      colSpan={{ base: 1, lg: isShowingVoters ? 4 : 5 }}
      alignSelf={"start"}
    >
      <Grid
        gap={currentView === "list" ? 2 : 2}
        minW="full"
        gridTemplateColumns={
          currentView === "list" ? "1fr" : { base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)", xl: "repeat(4, 1fr)" }
        }
      >
        {proposal?.choices?.map((choice: Choice) => (
          <GridItem
            key={choice?.id}
            rounded={currentView === "list" ? "xl" : "2xl"}
            bg="heds.bg_dark"
            _hover={{ bg: "heds.bg_light" }}
            w="full"
            className="group"
            transition="all 0.3s ease-in-out"
            color="white"
            p={currentView === "list" ? 2 : 2}
            colSpan={1}
          >
            <Flex
              px={{ base: currentView === "list" ? 1 : 1, lg: currentView === "list" ? 2 : 1 }}
              py={{ base: currentView === "list" ? 1 : 1, lg: currentView === "list" ? 0.5 : 1 }}
              alignItems={"center"}
              gap={3}
            >
              <Center position={"relative"} bgSize={{ base: "30em", lg: "62em" }}>
                <Play
                  className={`${currentView === "list" ? "h-10" : "h-auto"} ` + "absolute invert transition-all group-hover:z-10"}
                />
                <Avatar
                  size={currentView === "list" ? "sm" : "lg"}
                  rounded={currentView === "list" ? "md" : "xl"}
                  borderRadius={currentView === "list" ? "md" : "xl"}
                  src={choice?.image}
                  transition={"all 0.3s ease-in-out"}
                  _groupHover={{ opacity: "50%" }}
                />
              </Center>
              <Flex
                minW={{ base: currentView === "list" ? "25%" : "auto", lg: currentView === "list" ? "20%" : "auto" }}
                maxW={{ base: currentView === "list" ? "25%" : "auto", lg: currentView === "list" ? "20%" : "auto" }}
                p={{ base: currentView === "list" ? 0 : 1, lg: 1 }}
                mt={currentView === "list" ? "0" : "-1"}
                gap={1}
                direction={"column"}
              >
                <Typography
                  isTruncated
                  fontSize={{ base: currentView === "list" ? "0.6rem" : "xs", lg: "xs" }}
                  textColor={"whiteAlpha.700"}
                  fontFamily={"grotesk"}
                >
                  {choice.artist}
                </Typography>
                <Typography
                  isTruncated
                  mt={currentView === "list" ? "-1.5 !important" : "-1 !important"}
                  fontSize={{ base: currentView === "list" ? "0.75rem" : "sm", lg: "sm" }}
                  fontFamily={"grotesk"}
                >
                  {choice.name}
                </Typography>
              </Flex>
              {isShowingResults && (
                <Flex
                  display={currentView === "list" ? "flex" : "none"}
                  transition={"all 0.3s ease-in-out"}
                  px={1.5}
                  py={"10.2px"}
                  alignItems="center"
                  gap={2}
                  w="full"
                >
                  <Typography fontFamily={"grotesk"} letterSpacing={"widest"} fontSize={"xs"}>
                    {Math.round((scoreData?.sortedScores?.[choice?.id]?.score / scoreData?.totalScore) * 1000)}%
                  </Typography>
                  <Flex w="full" my={1} direction={"column"}>
                    <Box minH="9px" rounded="full" bg="whiteAlpha.400" w="full" />
                    <Box
                      mt={"-9px"}
                      minH="9px"
                      rounded="full"
                      bg="whiteAlpha.700"
                      w={`${Math.round((scoreData?.sortedScores?.[choice?.id]?.score / scoreData?.totalScore) * 1000)}%`}
                    />
                  </Flex>
                </Flex>
              )}
              {!isShowingResults && (
                <Flex ml={"auto"} pr={{ base: 2, lg: 3 }} direction={"column"}>
                  <CaretUp className={"invert"} />
                  <CaretDown className={"invert"} />
                </Flex>
              )}
            </Flex>
            {isShowingResults && (
              <Flex
                display={currentView === "list" ? "none" : "flex"}
                transition={"all 0.3s ease-in-out"}
                px={1.5}
                pt={0.5}
                alignItems="center"
                gap={2}
                w="full"
              >
                <Typography fontFamily={"grotesk"} letterSpacing={"widest"} fontSize={"xs"}>
                  {Math.round((scoreData?.sortedScores?.[choice?.id]?.score / scoreData?.totalScore) * 1000)}%
                </Typography>
                <Flex w="full" my={1} direction={"column"}>
                  <Box minH="9px" rounded="full" bg="whiteAlpha.400" w="full" />
                  <Box
                    mt={"-9px"}
                    minH="9px"
                    rounded="full"
                    bg="whiteAlpha.700"
                    w={`${Math.round((scoreData?.sortedScores?.[choice?.id]?.score / scoreData?.totalScore) * 1000)}%`}
                  />
                </Flex>
              </Flex>
            )}
          </GridItem>
        ))}
      </Grid>
    </GridItem>
  );
};

export default ProposalChoices;
