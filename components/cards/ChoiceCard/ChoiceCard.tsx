"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import _ from "lodash";

import { Avatar, Box, Button, Center, Flex, GridItem, Heading, Typography } from "@/common";
import UseAudioPlayer from "@/hooks/UseAudioPlayer/UseAudioPlayer";
import { Minus, Pause, Play, Plus, Spinner } from "@/common/Icons";
import { setDecreaseScore, setIncreaseScore } from "@/store/activeVote";
import * as styles from "@/components/cards/ChoiceCard/styles";
import { useAccount } from "wagmi";
import { useAppSelector } from "@/store/hooks";
import { Choice } from "hedsvote";

const ChoiceCard = ({ choice }: { choice: Choice }) => {
  const dispatch = useDispatch();
  const { currentView, isVoteOpen, chosenTracks, publicStatus, isShowingResults, scoreData, proposal, hoveringVote } =
    useAppSelector((state: RootState) => state.proposal);
  const choiceType = proposal?.choice_type || "image";
  const { isConnected } = useAccount();
  const { currentSong, isLoading } = useAppSelector((state: RootState) => state.audioReducer);
  const state = useSelector((state: RootState) => state.activeVoteReducer);

  return (
    <UseAudioPlayer src={choice?.media}>
      {({ handlePlaySong }) => (
        <GridItem
          {...styles.$parentAudioChoiceCardGridItemStyles(
            currentView,
            currentSong?.media === choice?.media,
            hoveringVote ? choice?.id in hoveringVote : false,
            chosenTracks?.length ? chosenTracks?.includes(choice?.name) : false
          )}
        >
          <Flex {...styles.$parentFlexContainerStyles(currentView)}>
            {choiceType === "audio" ? (
              <Center
                isDisabled={isLoading}
                as={Button}
                onClick={() => {
                  if (isLoading) return;
                  if (choice.media) {
                    handlePlaySong()
                  }
                }}
                pointerEvents={isLoading ? "none" : "auto"}
                {...styles.$centerPlayContainerProps}
              >
                {currentSong?.isPlaying && currentSong?.media === choice.media ? (
                  <Pause className={styles.$playButtonClassName(currentView)} />
                ) : isLoading && currentSong?.media === choice.media ? (
                  <Spinner className={styles.$loadingButtonClassName(currentView)} />
                ) : (
                  <Play className={styles.$playButtonClassName(currentView)} />
                )}
                <Avatar {...styles.$audioAvatarImageStyles(currentView)} src={choice?.image} />
              </Center>
            ) : (
              <Avatar {...styles.$imageAvatarImageStyles(currentView)} src={choice?.image} />
            )}
            <Flex {...styles.$textFlexContainer(currentView)}>
              <Typography
                {...styles.$artistNameTextStyles(
                  currentView,
                  currentSong?.media === choice?.media,
                  hoveringVote ? choice?.id in hoveringVote : false
                )}
              >
                {_.isEmpty(publicStatus) ? choice.artist : publicStatus?.[choice?.id] ? choice.artist : ""}
              </Typography>
              <Typography
                {...styles.$choiceNameTextStyles(
                  currentView,
                  currentSong?.media === choice?.media,
                  hoveringVote ? choice?.id in hoveringVote : false
                )}
              >
                {choice.name}
              </Typography>
            </Flex>
            {isShowingResults && (
              <Flex {...styles.$resultsFlexContainer(currentView)}>
                {!_.isNull(hoveringVote) && choice.id in hoveringVote ? (
                  <Typography
                    {...styles.$percentageTextStyles(
                      hoveringVote ? choice?.id in hoveringVote : false,
                      currentSong?.media === choice?.media
                    )}
                  >
                    {scoreData?.[choice?.id]?.percentage}%
                  </Typography>
                ) : _.isNull(hoveringVote) ? (
                  <Typography
                    {...styles.$percentageTextStyles(
                      hoveringVote ? choice?.id in hoveringVote : false,
                      currentSong?.media === choice?.media
                    )}
                  >
                    {scoreData?.[choice?.id]?.percentage}%
                  </Typography>
                ) : (
                  <></>
                )}
                {!_.isNull(hoveringVote) && choice.id in hoveringVote ? (
                  <Flex {...styles.$percentageParentFlexStyles}>
                    <Box {...styles.$percentageContainerBoxStyles(hoveringVote ? choice?.id in hoveringVote : false)} />
                    <Box
                      {...styles.$percentageVariableWidthBoxStyles(
                        scoreData?.[choice?.id]?.percentage || 0,
                        hoveringVote ? choice?.id in hoveringVote : false
                      )}
                    />
                  </Flex>
                ) : _.isNull(hoveringVote) ? (
                  <Flex {...styles.$percentageParentFlexStyles}>
                    <Box {...styles.$percentageContainerBoxStyles(hoveringVote ? choice?.id in hoveringVote : false)} />
                    <Box
                      {...styles.$percentageVariableWidthBoxStyles(
                        scoreData?.[choice?.id]?.percentage || 0,
                        hoveringVote ? choice?.id in hoveringVote : false
                      )}
                    />
                  </Flex>
                ) : (
                  <></>
                )}
              </Flex>
            )}
            {isVoteOpen && isConnected && currentView === "list" ? (
              <Flex {...styles.$listViewVotingFlexStyles}>
                <Flex {...styles.$listViewParentFlexStyles}>
                  <Button {...styles.$listViewIncreaseButtonStyles} onClick={() => dispatch(setIncreaseScore(choice.id))}>
                    <Plus {...styles.$listViewIconDimensions} />
                  </Button>
                  <Box {...styles.$listViewBoxCounterStyles}>
                    <Heading {...styles.$listViewCounterTextStyles}>{state?.voteSelections?.[choice.id] || 0}</Heading>
                  </Box>
                  <Button
                    isDisabled={!(state?.voteSelections && choice.id in state?.voteSelections)}
                    {...styles.$listViewDecreaseButtonStyles}
                    onClick={() => dispatch(setDecreaseScore(choice.id))}
                  >
                    <Minus {...styles.$listViewIconDimensions} />
                  </Button>
                </Flex>
              </Flex>
            ) : isVoteOpen && isConnected && currentView === "grid" ? (
              <Flex {...styles.$gridViewFlexStyles}>
                <Flex {...styles.$gridViewChildFlexStyles}>
                  <Box {...styles.$gridViewCounterBoxStyles}>
                    <Heading {...styles.$gridViewCounterTextStyles}>{state?.voteSelections?.[choice.id] || 0}</Heading>
                  </Box>
                </Flex>
                <Flex {...styles.$gridViewChildFlexStyles2}>
                  <Button {...styles.$gridViewIncreaseButtonStyles} onClick={() => dispatch(setIncreaseScore(choice.id))}>
                    <Plus {...styles.$gridViewIconDimensions} />
                  </Button>
                  <Button
                    isDisabled={!(state?.voteSelections && choice.id in state?.voteSelections)}
                    {...styles.$gridViewDecreaseButtonStyles}
                    onClick={() => dispatch(setDecreaseScore(choice.id))}
                  >
                    <Minus {...styles.$gridViewIconDimensions} />
                  </Button>
                </Flex>
              </Flex>
            ) : (
              <></>
            )}
          </Flex>
          {isShowingResults && (
            <Flex {...styles.$percentageListParentFlexStyles(currentView)}>
              {!_.isNull(hoveringVote) && choice.id in hoveringVote ? (
                <Typography
                  {...styles.$percentageTextStyles(
                    hoveringVote ? choice?.id in hoveringVote : false,
                    currentSong?.media === choice?.media
                  )}
                >
                  {hoveringVote?.[choice?.id] ? +hoveringVote[choice?.id] : scoreData?.[choice?.id]?.percentage || 0}%
                </Typography>
              ) : _.isNull(hoveringVote) ? (
                <Typography
                  {...styles.$percentageTextStyles(
                    hoveringVote ? choice?.id in hoveringVote : false,
                    currentSong?.media === choice?.media
                  )}
                >
                  {hoveringVote?.[choice?.id] ? +hoveringVote[choice?.id] : scoreData?.[choice?.id]?.percentage || 0}%
                </Typography>
              ) : (
                <Typography
                  {...styles.$percentageTextStyles(
                    hoveringVote ? choice?.id in hoveringVote : false,
                    currentSong?.media === choice?.media
                  )}
                >
                  {hoveringVote?.[choice?.id] ? +hoveringVote[choice?.id] : scoreData?.[choice?.id]?.percentage || 0}%
                </Typography>
              )}
              {!_.isNull(hoveringVote) && choice.id in hoveringVote ? (
                <Flex {...styles.$percentageParentFlexStyles}>
                  <Box
                    {...styles.$percentageContainerBoxStyles(
                      hoveringVote ? choice?.id in hoveringVote : false,
                      currentSong?.media === choice?.media
                    )}
                  />
                  <Box
                    {...styles.$percentageVariableWidthBoxStyles(
                      hoveringVote ? +hoveringVote?.[choice?.id] : scoreData?.[choice?.id]?.percentage || 0,
                      hoveringVote ? choice?.id in hoveringVote : false,
                      currentSong?.media === choice?.media
                    )}
                  />
                </Flex>
              ) : _.isNull(hoveringVote) ? (
                <Flex {...styles.$percentageParentFlexStyles}>
                  <Box
                    {...styles.$percentageContainerBoxStyles(
                      hoveringVote ? choice?.id in hoveringVote : false,
                      currentSong?.media === choice?.media
                    )}
                  />
                  <Box
                    {...styles.$percentageVariableWidthBoxStyles(
                      hoveringVote ? +hoveringVote?.[choice?.id] : scoreData?.[choice?.id]?.percentage || 0,
                      hoveringVote ? choice?.id in hoveringVote : false,
                      currentSong?.media === choice?.media
                    )}
                  />
                </Flex>
              ) : (
                <Flex {...styles.$percentageParentFlexStyles}>
                  <Box {...styles.$percentageContainerBoxStyles(false)} />
                  <Box {...styles.$percentageVariableWidthBoxStyles(0)} />
                </Flex>
              )}
            </Flex>
          )}
        </GridItem>
      )}
    </UseAudioPlayer>
  );
};

export default ChoiceCard;
