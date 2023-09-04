"use client";
import { Avatar, Box, Center, Flex, GridItem, Typography } from "@/common";
import { Play } from "@/common/Icons";
import * as styles from "@/components/cards/ChoiceCard/styles";
import * as constants from "@/components/cards/ChoiceCard/constants";

const ChoiceCard = ({ choiceType, currentView, choice, isShowingResults, scoreData }: constants.AudioChoiceCardProps) => {
  return (
    <GridItem {...styles.$parentAudioChoiceCardGridItemStyles(currentView)}>
      <Flex {...styles.$parentFlexContainerStyles(currentView)}>
        {choiceType === "audio" ? (
          <Center onClick={() => {}} {...styles.$centerPlayContainerProps}>
            <Play className={styles.$playButtonClassName(currentView)} />
            <Avatar {...styles.$audioAvatarImageStyles(currentView)} src={choice?.image} />
          </Center>
        ) : (
          <Avatar {...styles.$imageAvatarImageStyles(currentView)} src={choice?.image} />
        )}
        <Flex {...styles.$textFlexContainer(currentView)}>
          <Typography {...styles.$artistNameTextStyles(currentView)}>{choice.artist}</Typography>
          <Typography {...styles.$choiceNameTextStyles(currentView)}>{choice.name}</Typography>
        </Flex>
        {isShowingResults && (
          <Flex {...styles.$resultsFlexContainer(currentView)}>
            <Typography {...styles.$percentageTextStyles}>
              {Math.round((scoreData?.sortedScores?.[choice?.id]?.score / scoreData?.totalScore) * 1000)}%
            </Typography>
            <Flex {...styles.$percentageParentFlexStyles}>
              <Box {...styles.$percentageContainerBoxStyles} />
              <Box
                {...styles.$percentageVariableWidthBoxStyles(
                  Math.round((scoreData?.sortedScores?.[choice?.id]?.score / scoreData?.totalScore) * 1000)
                )}
              />
            </Flex>
          </Flex>
        )}
      </Flex>
      {isShowingResults && (
        <Flex {...styles.$percentageListParentFlexStyles(currentView)}>
          <Typography {...styles.$percentageTextStyles}>
            {Math.round((scoreData?.sortedScores?.[choice?.id]?.score / scoreData?.totalScore) * 1000)}%
          </Typography>
          <Flex {...styles.$percentageParentFlexStyles}>
            <Box {...styles.$percentageContainerBoxStyles} />
            <Box
              {...styles.$percentageVariableWidthBoxStyles(
                Math.round((scoreData?.sortedScores?.[choice?.id]?.score / scoreData?.totalScore) * 1000)
              )}
            />
          </Flex>
        </Flex>
      )}
    </GridItem>
  );
};

export default ChoiceCard;
