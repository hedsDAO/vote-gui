"use client";

import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { Howl } from "howler";
import _ from "lodash";

import { Avatar, Box, Button, Center, Flex, GridItem, Heading, Typography } from "@/common";
import { setCurrentSong, setCurrentSongIsPlaying, updateCurrentSongPercentage } from "@/store/audio";
import { Minus, Pause, Play, Plus, Spinner } from "@/common/Icons";
import { setDecreaseScore, setIncreaseScore } from "@/store/activeVote";
import * as styles from "@/components/cards/ChoiceCard/styles";
import { useAccount } from "wagmi";
import { useAppSelector } from "@/store/hooks";
import { HedsVoteChoice } from "./constants";
import { Choice } from "hedsvote";

const ChoiceCard = ({ choice }: { choice: Choice }) => {
  const dispatch = useDispatch();
  const { currentView, isVoteOpen, canShowResults, publicStatus, isShowingResults, scoreData, proposal, hoveringVote } =
    useAppSelector((state: RootState) => state.proposal);
  const choiceType = proposal?.choice_type || "image";
  const { isConnected } = useAccount();
  const state = useSelector((state: RootState) => state.activeVoteReducer);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const currentSong = useSelector((state: RootState) => state.audioReducer.currentSong);
  const soundRef = useRef<Howl | null>(null);
  const playSound = (audioSrc: string) => {
    if (currentSong && currentSong.media === audioSrc) {
      togglePlayPause();
      return;
    }

    if (soundRef.current) {
      soundRef.current.stop();
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    const newSound = new Howl({
      src: [audioSrc],
      format: ["mp3", "wav"],
    });

    soundRef.current = newSound;

    newSound.once("load", () => {
      newSound.play();
      dispatch(
        setCurrentSong({
          media: audioSrc,
          percentage: 0,
          isLoading: false,
          isPlaying: true,
        })
      );

      intervalRef.current = setInterval(() => {
        if (newSound.playing()) {
          dispatch(updateCurrentSongPercentage(newSound.seek() / newSound.duration()));
        }
      }, 1000);
    });

    newSound.on("end", () => {
      dispatch(setCurrentSong(null));
      if (intervalRef.current) clearInterval(intervalRef.current);
    });

    dispatch(
      setCurrentSong({
        media: audioSrc,
        percentage: 0,
        isLoading: true,
        isPlaying: false,
      })
    );
  };

  const togglePlayPause = () => {
    if (currentSong && soundRef.current) {
      if (currentSong.isPlaying) {
        soundRef.current.pause();
        dispatch(setCurrentSongIsPlaying(false));
      } else {
        soundRef.current.play();
        dispatch(setCurrentSongIsPlaying(true));
      }
    }
  };

  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.stop();
        soundRef.current = null;
      }

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);
  return (
    <GridItem
      {...styles.$parentAudioChoiceCardGridItemStyles(
        currentView,
        currentSong?.media === choice?.media,
        hoveringVote ? choice?.id in hoveringVote : false
      )}
    >
      <Flex {...styles.$parentFlexContainerStyles(currentView)}>
        {choiceType === "audio" ? (
          <Center
            isDisabled={currentSong?.isLoading}
            as={Button}
            onClick={() => {
              if (currentSong?.isLoading) return;
              if (choice.media) {
                if (currentSong && currentSong.media === choice.media) {
                  togglePlayPause();
                } else {
                  playSound(choice.media);
                }
              }
            }}
            pointerEvents={currentSong?.isLoading ? "none" : "auto"}
            {...styles.$centerPlayContainerProps}
          >
            {currentSong?.isPlaying && currentSong?.media === choice.media ? (
              <Pause className={styles.$playButtonClassName(currentView)} />
            ) : currentSong?.isLoading && currentSong?.media === choice.media ? (
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
              <Typography {...styles.$percentageTextStyles(hoveringVote ? choice?.id in hoveringVote : false)}>
                {scoreData?.[choice?.id]?.percentage}%
              </Typography>
            ) : _.isNull(hoveringVote) ? (
              <Typography {...styles.$percentageTextStyles(hoveringVote ? choice?.id in hoveringVote : false)}>
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
            <Typography {...styles.$percentageTextStyles(hoveringVote ? choice?.id in hoveringVote : false)}>
              {hoveringVote?.[choice?.id] ? +hoveringVote[choice?.id] : scoreData?.[choice?.id]?.percentage || 0}%
            </Typography>
          ) : _.isNull(hoveringVote) ? (
            <Typography {...styles.$percentageTextStyles(hoveringVote ? choice?.id in hoveringVote : false)}>
              {hoveringVote?.[choice?.id] ? +hoveringVote[choice?.id] : scoreData?.[choice?.id]?.percentage || 0}%
            </Typography>
          ) : (
            <></>
          )}
          {!_.isNull(hoveringVote) && choice.id in hoveringVote ? (
            <Flex {...styles.$percentageParentFlexStyles}>
              <Box {...styles.$percentageContainerBoxStyles(hoveringVote ? choice?.id in hoveringVote : false)} />
              <Box
                {...styles.$percentageVariableWidthBoxStyles(
                  hoveringVote ? +hoveringVote?.[choice?.id] : scoreData?.[choice?.id]?.percentage || 0,
                  hoveringVote ? choice?.id in hoveringVote : false
                )}
              />
            </Flex>
          ) : _.isNull(hoveringVote) ? (
            <Flex {...styles.$percentageParentFlexStyles}>
              <Box {...styles.$percentageContainerBoxStyles(hoveringVote ? choice?.id in hoveringVote : false)} />
              <Box
                {...styles.$percentageVariableWidthBoxStyles(
                  hoveringVote ? +hoveringVote?.[choice?.id] : scoreData?.[choice?.id]?.percentage || 0,
                  hoveringVote ? choice?.id in hoveringVote : false
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
  );
};

export default ChoiceCard;
