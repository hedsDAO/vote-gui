"use client";
import { ProposalContext } from "@/context/proposal.context";
import { useRef, useState, useContext } from "react";
import Image from "next/image";
import { Choice } from "hedsvote";

export default function OptionCard({ choice }: { choice: Choice }) {
  const { state, dispatch } = useContext(ProposalContext);

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current?.play();
      setIsPlaying(true);
    }
  };

  const handleClick = (id: number) => {
    if (state.likes[id]) {
      dispatch({ type: "REMOVE_LIKE", payload: id });
    } else {
      dispatch({ type: "ADD_LIKE", payload: id });
    }
  };

  return (
    <div
      className="flex w-full flex-row justify-between rounded-lg border bg-[#2D2934] px-4 py-3 text-white"
      key={choice.id}>
      <div className="flex flex-row items-center gap-x-4">
        <Image
          alt="Choice cover image"
          className="rounded-md"
          src={choice.image}
          width={50}
          height={50}
        />
        <p className="self-center font-mono text-xs">{choice.name}</p>
      </div>
      <div className="flex flex-row items-center gap-x-2">
        {isPlaying ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="#FFFFFF"
            viewBox="0 0 256 256"
            onClick={togglePlay}
            className="hover:cursor-pointer">
            <path d="M216,48V208a16,16,0,0,1-16,16H160a16,16,0,0,1-16-16V48a16,16,0,0,1,16-16h40A16,16,0,0,1,216,48ZM96,32H56A16,16,0,0,0,40,48V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V48A16,16,0,0,0,96,32Z"></path>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="#FFFFFF"
            viewBox="0 0 256 256"
            onClick={togglePlay}
            className="hover:cursor-pointer">
            <path d="M240,128a15.74,15.74,0,0,1-7.6,13.51L88.32,229.65a16,16,0,0,1-16.2.3A15.86,15.86,0,0,1,64,216.13V39.87a15.86,15.86,0,0,1,8.12-13.82,16,16,0,0,1,16.2.3L232.4,114.49A15.74,15.74,0,0,1,240,128Z"></path>
          </svg>
        )}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill={state.likes[choice.id] ? "#EF4444" : "#FFFFFF"}
          viewBox="0 0 256 256"
          className="hover:cursor-pointer hover:fill-red-600"
          onClick={() => handleClick(choice.id)}>
          <path d="M240,94c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,220.66,16,164,16,94A62.07,62.07,0,0,1,78,32c20.65,0,38.73,8.88,50,23.89C139.27,40.88,157.35,32,178,32A62.07,62.07,0,0,1,240,94Z"></path>
        </svg>
        <audio ref={audioRef} src={choice.media} />
      </div>
    </div>
  );
}
