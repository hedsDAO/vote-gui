"use client";

import Image from "next/image";
import { useContext } from "react";
import { ProposalContext } from "@/context/proposal.context";

import { CurrentSongProps } from "@/app/[slug]/[id]/ChoiceCards";

interface AudioChoice {
  id: number;
  proposal_id: string;
  image: string;
  wallet_id: string;
  artist: string;
  name: string;
  location: string;
  media: string;
}

const AudioChoiceCard = ({
  choice,
  currentSong,
  filledBars,
  togglePlayPause,
  handleBarClick,
  playSound,
}: {
  choice: AudioChoice;
  currentSong: CurrentSongProps | null;
  filledBars: number;
  togglePlayPause: () => void;
  handleBarClick: (idx: number, media: string) => void;
  playSound: (audioSrc: string) => void;
}) => {
  const { state, dispatch } = useContext(ProposalContext);

  return (
    <div
      className={
        `${
          choice?.media === currentSong?.media
            ? "bg-gray-200"
            : "bg-heds-bg-dark"
        } ` + "col-span-1 flex gap-2 rounded-lg p-1 shadow-sm"
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
            `${
              choice?.media === currentSong?.media ? "text-black" : "text-white"
            } ` +
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
      <div className="mx-auto flex items-center justify-center gap-4">
        {currentSong?.isLoading && choice.media === currentSong.media ? (
          <Image
            alt="loading"
            className="animate-spin"
            src={"/icons/spinner.svg"}
            width={20}
            height={20}
          />
        ) : currentSong?.isPlaying && choice.media === currentSong.media ? (
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
              className={choice?.media === currentSong?.media ? "" : "invert"}
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
            <h1 className="-mt-[3px] min-w-[1.75ch] max-w-[1.75ch] text-center text-xl text-white">
              {state?.likes?.[choice.id] || 0}
            </h1>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-1.5">
          <button
            onClick={() => {
              dispatch({ type: "INCREASE_SCORE", payload: choice.id });
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
            disabled={!state?.likes?.[choice.id]}
            onClick={() => {
              dispatch({ type: "DECREASE_SCORE", payload: choice.id });
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
};

export default AudioChoiceCard;
