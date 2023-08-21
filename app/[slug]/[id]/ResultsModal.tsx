"use client";
import { SortedChoice } from "@/common/types";
import { Transition, Dialog } from "@headlessui/react";
import { Proposal, QuadraticVote, SingleChoiceVote } from "hedsvote";
import Image from "next/image";
import { Fragment, useState } from "react";

const ResultsModal = ({
  isOpen,
  setIsOpen,
  vote,
  proposal,
}: {
  isOpen: boolean;
  setIsOpen: (bool: boolean) => void;
  vote: any;
  proposal: any;
}) => {
  const calculateVotePercentage = (currentVote: any) => {
    console.log(currentVote, "currentVote");
    let totalUserAllotedVotes = 0;
    vote?.vote_choices?.map((vote: any) => {
      totalUserAllotedVotes += vote?.amount;
    });
    return (currentVote?.amount / totalUserAllotedVotes) * 100;
  };
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10"
        onClose={() => setIsOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full w-full min-w-full items-center justify-center p-0 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative w-[90%] transform overflow-hidden rounded-lg bg-heds-bg px-5 py-4 text-left shadow-xl transition-all sm:my-8 sm:max-w-lg">
                <div className="flex flex-col gap-3">
                  {vote?.vote_choices?.map((choice: any, idx: number) => {
                    return (
                      <div className="flex justify-between">
                        <div className="flex items-center gap-2">
                          <Image
                            src={
                              proposal?.choices?.[choice?.choice_id - 1]?.image
                            }
                            alt="cover"
                            height={20}
                            width={20}
                            className="rounded-full object-cover min-h-[20px] max-h-[20px] min-w-[20px] max-w-[20px]"
                          />
                          <p className="font-space-grotesk text-white text-sm">
                            {proposal?.choices?.[choice?.choice_id - 1]?.name}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <p className="font-space-grotesk text-h-red-light text-sm">
                            {Math.round(calculateVotePercentage(choice))}%
                          </p>
                          <p className="font-space-grotesk text-h-yellow-light text-sm">
                            {Math.round(
                              (calculateVotePercentage(choice) * vote?.vp) / 100
                            )} HED
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ResultsModal;
