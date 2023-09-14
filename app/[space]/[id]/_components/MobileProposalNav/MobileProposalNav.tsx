"use client";

import { useAccount } from "wagmi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import ConnectButtonSm from "@/components/buttons/ConnectButton/ConnectButtonSm";
import { Box, Button, Flex, GridItem, Typography } from "@/common";
import { Grids, List, Percentage, Question } from "@/common/Icons";
import * as constants from "@/app/[space]/[id]/_components/MobileProposalNav/constants";
import * as styles from "@/app/[space]/[id]/_components/MobileProposalNav/styles";
import * as actions from "@/store/proposal";
import _ from "lodash";

/**
 * @const {JSX.Element} MobileProposalNav
 * @description This component is responsible for rendering the responsive mobile proposal navbar.
 * It also handles the logic for the voting strategies button + modal and the cast vote button + modal.
 * @returns {JSX.Element} The mobile proposal navbar component.
 */

const MobileProposalNav = () => {
  const dispatch = useAppDispatch();
  const proposalState = useAppSelector((state) => state.proposal);
  const { voteSelections } = useAppSelector((state) => state.activeVoteReducer);
  const { isConnected } = useAccount();
  return (
    <>
      <GridItem {...styles.$gridItemStyles(proposalState.isShowingVoters)}>
        {proposalState.canShowResults ? (
          <Flex {...styles.$defaultFlexStyles}>
            <Typography
              {...styles.$choicesTypographyStyles(proposalState.isShowingVoters)}
              onClick={proposalState.isShowingVoters ? () => dispatch(actions.setIsShowingVoters(false)) : () => {}}
            >
              {constants.CHOICE_TEXT}
            </Typography>
            <Box {...styles.$dividerBoxStyles} />
            <Typography
              {...styles.$votersTypographyStyles(proposalState.isShowingVoters)}
              onClick={proposalState.isShowingVoters ? () => {} : () => dispatch(actions.setIsShowingVoters(true))}
            >
              {constants.VOTERS_TEXT}
            </Typography>
          </Flex>
        ) : (
          <Flex {...styles.$defaultFlexStyles}>
            <Typography {...styles.$defaultChoicesTextStyles}>{constants.CHOICE_TEXT}</Typography>
          </Flex>
        )}
        <Flex {...styles.$iconsFlexStyles(proposalState.isShowingVoters)}>
          {proposalState.canShowResults && !_.isEmpty(proposalState?.scoreData) ? (
            <Flex {...styles.$viewButtonsFlexStyles}>
              <Button
                {...styles.$resultsButtonStyles(proposalState.isShowingResults)}
                onClick={() => dispatch(actions.setIsShowingResults(!proposalState.isShowingResults))}
              >
                <Percentage />
              </Button>
              <Box {...styles.$dividerBoxStyles} />
            </Flex>
          ) : null}
          {proposalState?.isVoteOpen ? (
            <Flex {...styles.$parentVoteFlexStyles}>
              <Button
                isDisabled={
                  !isConnected ||
                  _.isEmpty(voteSelections) ||
                  JSON.stringify(voteSelections) === JSON.stringify(proposalState?.previousVote)
                }
                onClick={() => dispatch(actions.setIsCastingVote(!proposalState.isCastingVote))}
                {...styles.$voteButtonStyles}
              >
                <Typography {...styles.$voteButtonTextStyles}>{constants.VOTE_TEXT}</Typography>
              </Button>
              {isConnected ? (
                <Button
                  onClick={() => dispatch(actions.setIsShowingStrategies(!proposalState.isShowingStrategies))}
                  {...styles.$strategiesButtonStyles}
                >
                  <Typography {...styles.$strategiesButtonTextStyles}>{proposalState?.votingPower}</Typography>
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
            <Button {...styles.$gridButtonStyles(proposalState.currentView, (arg) => dispatch(actions.setCurrentView(arg)))}>
              <Grids />
            </Button>
            <Button {...styles.$listButtonStyles(proposalState.currentView, (arg) => dispatch(actions.setCurrentView(arg)))}>
              <List />
            </Button>
          </Flex>
        </Flex>
      </GridItem>
    </>
  );
};

export default MobileProposalNav;
