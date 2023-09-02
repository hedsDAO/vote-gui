"use client";
import { Box, Button, Checkbox, Flex, GridItem, Typography } from "@/common";
import { Grids, List } from "@/common/Icons";
import * as styles from "@/app/[space]/[id]/_components/DesktopProposalNav/styles";
import * as constants from "@/app/[space]/[id]/_components/DesktopProposalNav/constants";

const DesktopProposalNav = ({
  proposal,
  isShowingVoters,
  setIsShowingVoters,
  isShowingResults,
  setIsShowingResults,
  currentView,
  setCurrentView,
}: constants.DesktopProposalNavProps) => {
  return (
    <>
      <GridItem {...styles.$gridItemStyles(isShowingVoters)}>
        <Flex {...styles.$defaultFlexStyles}>
          <Typography {...styles.$choicesTypographyStyles(isShowingVoters)}>{constants.CHOICE_TITLE_TEXT}</Typography>
        </Flex>
        <Flex {...styles.$defaultFlexStyles}>
          {proposal?.votes?.length && proposal?.show_results ? (
            <Flex {...styles.$defaultFlexStyles}>
              <Flex {...styles.$resultsFlexStyles(isShowingResults)}>
                <Checkbox
                  {...styles.$resultsCheckboxStyles}
                  isChecked={isShowingResults}
                  onChange={(e) => setIsShowingResults(e.target.checked)}
                />
                <Typography {...styles.$resultsTypographyStyles(isShowingResults)}>{constants.RESULTS_TITLE_TEXT}</Typography>
              </Flex>
              <Box {...styles.$boxDividerStyles} />
            </Flex>
          ) : null}
          {proposal?.votes?.length && proposal?.show_results ? (
            <Flex {...styles.$defaultFlexStyles}>
              <Flex {...styles.$showVotersFlexStyles(isShowingVoters)}>
                <Checkbox
                  {...styles.$showVotersCheckboxStyles}
                  isChecked={isShowingVoters}
                  onChange={(e) => setIsShowingVoters(e.target.checked)}
                />
                <Typography {...styles.$showVotersTypographyStyles(isShowingVoters)}>{constants.SHOW_VOTERS_TEXT}</Typography>
              </Flex>
              <Box {...styles.$boxDividerStyles} />
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
      {isShowingVoters && (
        <GridItem {...styles.$votersGridItemStyles}>
          <Flex {...styles.$voterGridParentFlexStyles}>
            <Flex {...styles.$voterGridChildFlexStyles}>
              <Typography {...styles.$votersTypographyStyles}>{constants.VOTERS_TITLE_TEXT}</Typography>
            </Flex>
          </Flex>
        </GridItem>
      )}
    </>
  );
};

export default DesktopProposalNav;
