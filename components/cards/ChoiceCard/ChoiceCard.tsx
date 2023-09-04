"use client";
import { useEffect, useRef } from "react";
import { Avatar, Box, Button, Center, Flex, GridItem, Typography } from "@/common";
import { Play, Pause, Spinner } from "@/common/Icons";
import * as styles from "@/components/cards/ChoiceCard/styles";
import * as constants from "@/components/cards/ChoiceCard/constants";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSong, setCurrentSongIsPlaying, updateCurrentSongPercentage } from "@/store/audio";
import { RootState } from "@/store";
import { Howl } from "howler";

const ChoiceCard = ({ choiceType, currentView, choice, isShowingResults, scoreData }: constants.AudioChoiceCardProps) => {
  const dispatch = useDispatch();
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
    <GridItem {...styles.$parentAudioChoiceCardGridItemStyles(currentView)}>
      <Flex {...styles.$parentFlexContainerStyles(currentView)}>
        {choiceType === "audio" ? (
          <Center
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
