"use client";

import { ProposalContext } from "@/context/proposal.context";
import { Choice } from "hedsvote";
import Image from "next/image";
import { useContext, useEffect } from "react";

const OpenImageCard = ({
  choice,
  userVote,
}: {
  choice: Choice;
  userVote: any;
}) => {
  const { state, dispatch } = useContext(ProposalContext);
  useEffect(() => {
    let likes: { [key: string]: any } = {};
    if (userVote) {
      userVote?.map((e: any) => {
        likes[e?.choice_id] = e?.amount;
      });
      dispatch({
        type: "SET_VOTES",
        payload: likes,
      });
    }
  }, [userVote]);
  console.log(choice, 'choice')
  return (
    <div
      className={
        "col-span-1 flex gap-1 rounded-lg bg-heds-bg-dark p-1 shadow-sm"
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
            "truncate text-ellipsis font-space-grotesk text-sm text-white lg:max-w-[23ch]"
          }
        >
          {choice?.name}
        </p>
      </div>
      <div className="ml-auto flex gap-2 pr-2">
        <div className="flex items-center">
          <div className="rounded-sm bg-heds-bg-light px-2 py-2.5">
            <h1 className="-mt-[3px] text-xl text-white">
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

export default OpenImageCard;
