"use client";
import { SortedChoice } from "@/common/types";
import { Proposal } from "hedsvote";
import { useRef, useState, useEffect } from "react";
import { Howl } from "howler";
import ClosedAudioCard from "./ClosedAudioCard";
import OpenAudioCard from "./OpenAudioCard";
import { useAccount } from "wagmi";

const AudioCards = ({
  proposal,
  sortedChoicesWithScores,
  votingStatus,
}: {
  proposal: Proposal;
  sortedChoicesWithScores?: SortedChoice[];
  votingStatus: string;
}) => {
  const { address } = useAccount();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [currentSong, setCurrentSong] = useState<{
    media: string;
    sound: Howl | null;
    percentage: number;
    isLoading: boolean;
    isPlaying: boolean;
  } | null>(null);
  const playSound = (audioSrc: string) => {
    if (currentSong && currentSong.media === audioSrc) {
      togglePlayPause();
      return;
    }
    if (currentSong && currentSong.sound) {
      currentSong.sound.stop();
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    const newSound = new Howl({
      src: [audioSrc],
      format: ["mp3", "wav"],
    });
    newSound.once("load", () => {
      newSound.play();
      setCurrentSong({
        media: audioSrc,
        sound: newSound,
        percentage: 0,
        isLoading: false,
        isPlaying: true,
      });

      intervalRef.current = setInterval(() => {
        if (newSound.playing()) {
          setCurrentSong((prev) => ({
            ...prev!,
            percentage: newSound.seek() / newSound.duration(),
          }));
        }
      }, 1000);
    });
    newSound.on("end", () => {
      setCurrentSong(null);
      if (intervalRef.current) clearInterval(intervalRef.current);
    });
    setCurrentSong({
      media: audioSrc,
      sound: newSound,
      percentage: 0,
      isLoading: true,
      isPlaying: false,
    });
  };

  const togglePlayPause = () => {
    if (currentSong && currentSong.sound) {
      if (currentSong.isPlaying) {
        currentSong.sound.pause();
        setCurrentSong((prev) => ({ ...prev!, isPlaying: false }));
      } else {
        currentSong.sound.play();
        setCurrentSong((prev) => ({ ...prev!, isPlaying: true }));
      }
    }
  };

  const handleBarClick = (barIndex: number, audioSrc: string) => {
    const seekPercentage = barIndex / 50;
    if (currentSong && currentSong?.sound && currentSong.media === audioSrc) {
      const seekTime = currentSong.sound.duration() * seekPercentage;
      currentSong.sound.seek(seekTime);
      setCurrentSong((prev) => ({
        ...prev!,
        percentage: seekPercentage,
      }));
    } else {
      if (currentSong && currentSong.sound) {
        currentSong.sound.stop();
        if (intervalRef.current) clearInterval(intervalRef.current);
      }

      const newSound = new Howl({
        src: [audioSrc],
        format: ["mp3", "wav"],
      });
      setCurrentSong((prev) => ({
        ...prev!,
        isLoading: true,
        media: audioSrc,
      }));
      newSound.once("load", () => {
        const seekTime = newSound.duration() * seekPercentage;
        newSound.seek(seekTime);
        newSound.play();
        setCurrentSong({
          media: audioSrc,
          sound: newSound,
          percentage: seekPercentage,
          isLoading: false,
          isPlaying: true,
        });

        intervalRef.current = setInterval(() => {
          if (newSound.playing()) {
            setCurrentSong((prev) => ({
              ...prev!,
              percentage: newSound.seek() / newSound.duration(),
            }));
          }
        }, 1000);
      });

      newSound.on("end", () => {
        setCurrentSong(null);
        if (intervalRef.current) clearInterval(intervalRef.current);
      });

      setCurrentSong({
        media: audioSrc,
        sound: newSound,
        percentage: 0,
        isLoading: true,
        isPlaying: false,
      });
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      currentSong?.sound?.unload();
    };
  }, []);

  const filledBars = currentSong ? Math.floor(50 * currentSong.percentage) : 0;
  if (votingStatus === "closed") {
    const userVote = (proposal?.votes || []).filter(
      (vote) => vote.voter?.toLowerCase() === address?.toLowerCase()
    );
    return (
      <>
        {sortedChoicesWithScores?.map((choice) => (
          <ClosedAudioCard
            userVote={userVote || []}
            currentSong={currentSong}
            togglePlayPause={togglePlayPause}
            filledBars={filledBars}
            handleBarClick={handleBarClick}
            playSound={playSound}
            choice={choice}
          />
        ))}
      </>
    );
  } else if (votingStatus === "open") {
    return (
      <>
        {proposal?.choices?.map((choice) => {
          return (
            <OpenAudioCard
              key={choice.id}
              currentSong={currentSong}
              togglePlayPause={togglePlayPause}
              filledBars={filledBars}
              handleBarClick={handleBarClick}
              playSound={playSound}
              choice={choice}
            />
          );
        })}
      </>
    );
  }
};

export default AudioCards;
