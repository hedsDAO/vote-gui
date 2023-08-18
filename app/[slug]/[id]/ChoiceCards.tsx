"use client";

import Image from "next/image";
import { Howl } from "howler";
import { useEffect, useState, useRef, useContext } from "react";
import { ProposalContext } from "@/context/proposal.context";

const ChoiceCards = ({ choices }: { choices: any[] }) => {
  const { state, dispatch } = useContext(ProposalContext);

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

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      currentSong?.sound?.unload();
    };
  }, []);

  const handleBarClick = (barIndex: number, audioSrc: string) => {
    const seekPercentage = barIndex / 50; // Since there are 50 bars

    if (currentSong && currentSong?.sound && currentSong.media === audioSrc) {
      // If the clicked song is the current song
      const seekTime = currentSong.sound.duration() * seekPercentage;
      currentSong.sound.seek(seekTime);
      setCurrentSong((prev) => ({
        ...prev!,
        percentage: seekPercentage,
      }));
    } else {
      // If the clicked song is not the current song

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

  return (
    <>
      {choices?.map((choice, idx) => {
        const filledBars = currentSong
          ? Math.floor(50 * currentSong.percentage)
          : 0;
        const isCurrentSong = currentSong?.media === choice.media;
        console.log(state?.likes);
        if (choice?.media === null) {
          console.log(choice?.media);
          return (
            <div
              key={choice?.media}
              className={
                `${isCurrentSong ? "bg-gray-200" : "bg-heds-bg-dark"} ` +
                "col-span-1 flex gap-1 rounded-lg p-1 shadow-sm"
              }
            >
              <div className="p-2.5">
                <Image
                  className="rounded-lg"
                  src={choice?.image}
                  alt={choice.name}
                  width={45}
                  height={45}
                />
              </div>
              <div className="flex flex-col justify-center gap-2">
                <p
                  className={
                    `${isCurrentSong ? "text-black" : "text-white"} ` +
                    "truncate text-ellipsis font-space-grotesk text-sm lg:max-w-[23ch]"
                  }
                >
                  {choice?.name}
                </p>
              </div>
              <div className="ml-auto flex gap-2 pr-2">
                <div className="flex items-center">
                  <div className="rounded-sm bg-heds-bg-light px-2 py-2.5">
                    <h1 className="-mt-[3px] text-xl text-white">
                      {state?.likes?.[idx] || 0}
                    </h1>
                  </div>
                </div>
                <div className="flex flex-col justify-center gap-1.5">
                  <button
                    onClick={() => {
                      dispatch({ type: "INCREASE_SCORE", payload: idx });
                    }}
                    className="rounded-sm bg-heds-bg-light p-1"
                  >
                    <Image
                      className="invert"
                      alt="like"
                      src={"/icons/plus.svg"}
                      width={10}
                      height={10}
                    />
                  </button>
                  <button
                    disabled={!state?.likes?.[idx]}
                    onClick={() => {
                      dispatch({ type: "DECREASE_SCORE", payload: idx });
                    }}
                    className="rounded-sm bg-heds-bg-light p-1"
                  >
                    <Image
                      className="invert"
                      alt="like"
                      src={"/icons/minus.svg"}
                      width={10}
                      height={10}
                    />
                  </button>
                </div>
              </div>
            </div>
          );
        } else
          return (
            <div
              key={choice?.media}
              className={
                `${isCurrentSong ? "bg-gray-200" : "bg-heds-bg-dark"} ` +
                "col-span-1 flex gap-2 rounded-lg p-1 shadow-sm"
              }
            >
              <div className="p-2.5">
                <Image
                  className="rounded-lg"
                  src={choice?.image}
                  alt={choice.name}
                  width={45}
                  height={45}
                />
              </div>
              <div className="flex flex-col justify-center gap-2">
                <p
                  className={
                    `${isCurrentSong ? "text-black" : "text-white"} ` +
                    "max-w-[20ch] truncate text-ellipsis font-space-grotesk text-xs lg:max-w-[23ch]"
                  }
                >
                  {choice?.artist} - {choice?.name || ""}
                </p>
                <div className="flex gap-[1.5px] lg:gap-0.5">
                  {new Array(50).fill(0).map((_, idx) => {
                    const barColor =
                      choice.media === currentSong?.media && idx < filledBars
                        ? "bg-black"
                        : choice.media === currentSong?.media
                        ? "bg-black/40"
                        : "bg-gray-400";
                    return (
                      <span
                        key={"bar" + idx}
                        className={`h-4 w-[1.5px] lg:w-[2px] ${barColor} cursor-pointer`}
                        onClick={() => handleBarClick(idx, choice.media)}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="mx-auto flex items-center justify-center gap-4 px-1">
                {currentSong?.isLoading &&
                choice.media === currentSong.media ? (
                  <Image
                    alt="loading"
                    className="animate-spin"
                    src={"/icons/spinner.svg"}
                    width={20}
                    height={20}
                  />
                ) : currentSong?.isPlaying &&
                  choice.media === currentSong.media ? (
                  <button role="button" onClick={togglePlayPause}>
                    <Image
                      alt="pause"
                      src={"/icons/pause.svg"}
                      width={20}
                      height={20}
                    />
                  </button>
                ) : (
                  <button role="button" onClick={() => playSound(choice.media)}>
                    <Image
                      className={isCurrentSong ? "" : "invert"}
                      alt="play"
                      src={"/icons/play.svg"}
                      width={20}
                      height={20}
                    />
                  </button>
                )}
              </div>
              <div className="flex gap-2 pr-2 ">
                <div className="flex items-center">
                  <div className="rounded-sm bg-heds-bg-light px-2 py-2.5">
                    <h1 className="-mt-[3px] text-xl text-white min-w-[1.75ch] max-w-[1.75ch] text-center">
                      {state?.likes?.[idx] || 0}
                    </h1>
                  </div>
                </div>
                <div className="flex flex-col justify-center gap-1.5">
                  <button
                    onClick={() => {
                      dispatch({ type: "INCREASE_SCORE", payload: idx });
                    }}
                    className="rounded-sm bg-heds-bg-light p-1"
                  >
                    <Image
                      className="invert"
                      alt="like"
                      src={"/icons/plus.svg"}
                      width={10}
                      height={10}
                    />
                  </button>
                  <button
                    disabled={!state?.likes?.[idx]}
                    onClick={() => {
                      dispatch({ type: "DECREASE_SCORE", payload: idx });
                    }}
                    className="rounded-sm bg-heds-bg-light p-1"
                  >
                    <Image
                      className="invert"
                      alt="like"
                      src={"/icons/minus.svg"}
                      width={10}
                      height={10}
                    />
                  </button>
                </div>
              </div>
            </div>
          );
      })}
    </>
  );
};

export default ChoiceCards;
