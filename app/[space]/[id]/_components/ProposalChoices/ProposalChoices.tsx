"use client";
import { Avatar, Box, Center, Flex, Grid, GridItem, Typography } from "@/common";
import { CaretDown, CaretUp, Play } from "@/common/Icons";
import ChoiceCard from "@/components/cards/ChoiceCard/ChoiceCard";
import { getScoreData } from "@/utils/getScoreData";
import { Choice, Proposal, QuadraticVote, quadratic } from "hedsvote";

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
  const { getScores } = quadratic({ votes: proposal.votes as QuadraticVote[], choices: proposal.choices });
  const calculatedScores = getScores();
  const scoreData = getScoreData({ ...proposal, scores: calculatedScores });

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
        {isShowingResults
          ? scoreData?.sortedChoicesWithScores?.map((choice: Choice) => (
              <ChoiceCard
                choiceType={proposal?.choice_type}
                key={choice.id}
                currentView={currentView}
                choice={choice}
                isShowingResults={isShowingResults}
                scoreData={scoreData}
              />
            ))
          : proposal?.choices?.map((choice: Choice) => (
              <ChoiceCard
                choiceType={proposal?.choice_type}
                key={choice.id}
                currentView={currentView}
                choice={choice}
                isShowingResults={isShowingResults}
                scoreData={scoreData}
              />
            ))}
      </Grid>
    </GridItem>
  );
};

export default ProposalChoices;
