"use client";
import { Box, Button, Checkbox, Flex, GridItem, Typography } from "@/common";
import { Grids, List } from "@/common/Icons";
import * as styles from "@/app/[space]/[id]/_components/DesktopProposalNav/styles";
import * as constants from "@/app/[space]/[id]/_components/DesktopProposalNav/constants";
import { useAccount } from "wagmi";
import { useAppSelector } from "@/store/hooks";

const DesktopProposalNav = ({
  proposal,
  isShowingVoters,
  setIsShowingVoters,
  isShowingResults,
  setIsShowingResults,
  currentView,
  setCurrentView,
}: constants.DesktopProposalNavProps) => {
  const { address } = useAccount();
  const spaceAuthors = useAppSelector((state) => state.spaceReducer.spaceData.authors);

  const handleShowResults = (address: `0x${string}` | undefined) => {
    if (spaceAuthors?.find((author) => author?.toLowerCase() === address?.toLowerCase())) return true;
    else if (address?.toLowerCase() === proposal?.author?.toLowerCase()) return true;
    else if (proposal?.show_results && proposal?.votes?.length) return true;
  };
  return (
    <>
      <GridItem {...styles.$gridItemStyles(isShowingVoters)}>
        <Flex {...styles.$defaultFlexStyles}>
          <Typography {...styles.$choicesTypographyStyles(isShowingVoters)}>{constants.CHOICE_TITLE_TEXT}</Typography>
        </Flex>
        <Flex {...styles.$defaultFlexStyles}>
          {handleShowResults(address) ? (
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
          {handleShowResults(address) ? (
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
