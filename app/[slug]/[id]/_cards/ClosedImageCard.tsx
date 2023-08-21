"use client";

import { SortedChoice } from "@/common/types";
import { ProposalContext } from "@/context/proposal.context";
import Image from "next/image";
import { useContext } from "react";

const ClosedImageCard = ({ choice }: { choice: SortedChoice }) => {
  const { state, dispatch } = useContext(ProposalContext);
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
        <div className="mx-auto flex items-center">
          <div className="rounded-sm bg-heds-bg-light px-4 py-2 mr-2">
            <h1 className="text-center text-sm text-white">
              {Math.round(choice?.score * 10) / 10 || 0} %
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClosedImageCard;
