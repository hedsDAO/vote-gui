"use client";

import { CurrentSongProps, SortedChoice } from "@/common/types";
import { Proposal } from "hedsvote";
import Image from "next/image";

const ClosedAudioCard = ({
  proposal,
  userVote,
  choice,
  currentSong,
  filledBars,
  togglePlayPause,
  handleBarClick,
  playSound,
}: {
  proposal: Proposal;
  userVote: any;
  choice: SortedChoice;
  currentSong: CurrentSongProps | null;
  filledBars: number;
  playSound: (audioSrc: string) => void;
  togglePlayPause: () => void;
  handleBarClick: (idx: number, media: string) => void;
}) => {
  const getUserVotePercentage = () => {
    const votePercentage = userVote?.find(
      (vote: any) => vote?.choice_id === choice?.id
    )?.percentage;
    if (votePercentage) return Math.round(votePercentage * 100);
    else return 0;
  };

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
      {proposal?.show_results && (
        <div className="ml-auto flex items-center">
          <div className="flex flex-col">
            <div className="rounded-sm bg-heds-bg-light px-2 py-1 lg:-mr-4">
              <h1 className="min-w-[7ch] max-w-[7ch] text-center text-xs text-white">
                {Math.round(choice?.score * 10) / 10 || 0} %
              </h1>
            </div>
            {userVote && (
              <div className="rounded-sm bg-h-red-dark px-2 py-1 lg:-mr-4">
                <h1 className="min-w-[7ch] max-w-[7ch] text-center text-xs text-white">
                  {getUserVotePercentage()} %
                </h1>
              </div>
            )}
          </div>
        </div>
      )}
      <div className={"ml-auto flex items-center justify-center gap-4 pr-5"}>
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
    </div>
  );
};

export default ClosedAudioCard;
