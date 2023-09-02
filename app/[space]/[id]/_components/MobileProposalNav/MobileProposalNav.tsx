"use client";
import { Box, Button, Flex, GridItem, Typography } from "@/common";
import { Grids, List, Percentage } from "@/common/Icons";
import * as styles from "@/app/[space]/[id]/_components/MobileProposalNav/styles";
import * as constants from "@/app/[space]/[id]/_components/MobileProposalNav/constants";

const MobileProposalNav = ({
  proposal,
  isShowingVoters,
  setIsShowingVoters,
  isShowingResults,
  setIsShowingResults,
  currentView,
  setCurrentView,
}: constants.MobileProposalNavProps) => {
  return (
    <>
      <GridItem {...styles.$gridItemStyles(isShowingVoters)}>
        {proposal?.votes?.length && proposal?.show_results ? (
          <Flex {...styles.$defaultFlexStyles}>
            <Typography
              {...styles.$choicesTypographyStyles(isShowingVoters)}
              onClick={isShowingVoters ? () => setIsShowingVoters(false) : () => {}}
            >
              {constants.CHOICE_TEXT}
            </Typography>
            <Box {...styles.$dividerBoxStyles} />
            <Typography
              {...styles.$votersTypographyStyles(isShowingVoters)}
              onClick={isShowingVoters ? () => {} : () => setIsShowingVoters(true)}
            >
              {constants.VOTERS_TEXT}
            </Typography>
          </Flex>
        ) : (
          <Flex {...styles.$defaultFlexStyles}>
            <Typography {...styles.$defaultChoicesTextStyles}>{constants.CHOICE_TEXT}</Typography>
          </Flex>
        )}
        <Flex {...styles.$iconsFlexStyles(isShowingVoters)}>
          {proposal?.votes?.length && proposal?.show_results ? (
            <Flex {...styles.$viewButtonsFlexStyles}>
              <Button {...styles.$resultsButtonStyles(isShowingResults)} onClick={() => setIsShowingResults(!isShowingResults)}>
                <Percentage />
              </Button>
              <Box {...styles.$dividerBoxStyles} />
            </Flex>
          ) : null}
          <Flex {...styles.$viewButtonsFlexStyles}>
            <Button {...styles.$gridButtonStyles(currentView, setCurrentView)}>
              <Grids />
            </Button>
            <Button {...styles.$listButtonStyles(currentView, setCurrentView)}>
              <List />
            </Button>
          </Flex>
        </Flex>
      </GridItem>
    </>
  );
};

export default MobileProposalNav;
