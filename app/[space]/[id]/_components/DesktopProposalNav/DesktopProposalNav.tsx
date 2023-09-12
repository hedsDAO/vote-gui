"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useAccount } from "wagmi";

import ConnectButtonSm from "@/components/buttons/ConnectButton/ConnectButtonSm";
import { Box, Button, Checkbox, Flex, GridItem, Typography } from "@/common";
import { Grids, List, Question } from "@/common/Icons";
import * as constants from "@/app/[space]/[id]/_components/DesktopProposalNav/constants";
import * as styles from "@/app/[space]/[id]/_components/DesktopProposalNav/styles";
import * as actions from "@/store/proposal";
import _ from "lodash";

/**
 * @const {JSX.Element} DesktopProposalNav
 * @description This component is responsible for rendering the responsive desktop proposal navbar.
 * It also handles the logic for the voting strategies button + modal and the cast vote button + modal.
 * @returns {JSX.Element} The desktop proposal navbar component.
 */

const DesktopProposalNav = () => {
  const dispatch = useAppDispatch();
  const { isConnected } = useAccount();
  const proposalState = useAppSelector((state) => state.proposal);
  const voteSelections = useAppSelector((state) => state.activeVoteReducer?.voteSelections);

  return (
    <>
      <GridItem {...styles.$gridItemStyles(proposalState?.isShowingVoters)}>
        <Flex {...styles.$defaultFlexStyles}>
          <Typography {...styles.$choicesTypographyStyles(proposalState?.isShowingVoters)}>
            {constants.CHOICE_TITLE_TEXT}
          </Typography>
        </Flex>
        <Flex {...styles.$defaultFlexStyles}>
          {proposalState?.canShowResults ? (
            <Flex {...styles.$defaultFlexStyles}>
              <Flex {...styles.$resultsFlexStyles(proposalState?.isShowingResults)}>
                <Checkbox
                  {...styles.$resultsCheckboxStyles}
                  isChecked={proposalState?.isShowingResults}
                  onChange={(e) => dispatch(actions.setIsShowingResults(e.target.checked))}
                />
                <Typography {...styles.$resultsTypographyStyles(proposalState?.isShowingResults)}>
                  {constants.RESULTS_TITLE_TEXT}
                </Typography>
              </Flex>
              <Box {...styles.$boxDividerStyles} />
            </Flex>
          ) : null}
          {proposalState?.canShowResults && !_.isEmpty(proposalState?.scoreData) ? (
            <Flex {...styles.$defaultFlexStyles}>
              <Flex {...styles.$showVotersFlexStyles(proposalState?.isShowingVoters)}>
                <Checkbox
                  {...styles.$showVotersCheckboxStyles}
                  isChecked={proposalState?.isShowingVoters}
                  onChange={(e) => dispatch(actions.setIsShowingVoters(e.target.checked))}
                />
                <Typography {...styles.$showVotersTypographyStyles(proposalState?.isShowingVoters)}>
                  {constants.SHOW_VOTERS_TEXT}
                </Typography>
              </Flex>
              <Box {...styles.$boxDividerStyles} />
            </Flex>
          ) : null}
          {proposalState?.isVoteOpen ? (
            <Flex {...styles.$parentVoteFlexStyles}>
              {proposalState?.isVoteOpen ? (
                <Button
                  isDisabled={!isConnected || _.isEmpty(voteSelections)}
                  onClick={() => dispatch(actions.setIsCastingVote(!proposalState?.isCastingVote))}
                  {...styles.$voteButtonStyles}
                >
                  <Typography {...styles.$voteTextStyles}>{constants.VOTE_TEXT}</Typography>
                </Button>
              ) : (
                <></>
              )}
              {isConnected ? (
                <Button
                  onClick={() => dispatch(actions.setIsShowingStrategies(!proposalState?.isShowingStrategies))}
                  {...styles.$votingPowerButtonStyles}
                >
                  <Typography {...styles.$votingPowerTextStyles}>
                    {proposalState?.votingPower} {constants.TOKEN_TEXT}
                  </Typography>
                  <Flex {...styles.$infoIconFlexStyles}>
                    <Question />
                  </Flex>
                </Button>
              ) : (
                <ConnectButtonSm />
              )}
              <Box {...styles.$boxDividerStyles} />
            </Flex>
          ) : (
            <></>
          )}
          <Flex {...styles.$viewButtonsFlexStyles}>
            <Button {...styles.$gridButtonStyles(proposalState?.currentView, (arg) => dispatch(actions.setCurrentView(arg)))}>
              <Grids />
            </Button>
            <Button {...styles.$listButtonStyles(proposalState?.currentView, (arg) => dispatch(actions.setCurrentView(arg)))}>
              <List />
            </Button>
          </Flex>
        </Flex>
      </GridItem>
      {proposalState?.isShowingVoters && (
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
