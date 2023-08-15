"use client";

import { Dialog, Transition } from "@headlessui/react";
import { PlusCircle, CheckCircle, XCircle } from "@phosphor-icons/react";
import { useState, Fragment, useEffect, useContext, useMemo } from "react";
import { CreateProposalContext } from "@/context/createProposal.context";
import { StrategyName } from "hedsvote";
import Image from "next/image";

const ChoicesPreview = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { state } = useContext(CreateProposalContext);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10"
        onClose={onClose}
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
              <Dialog.Panel className="relative w-[90%] transform overflow-hidden rounded-lg bg-black  px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:max-w-md sm:p-6">
                <div className="flex flex-col gap-4">
                  {state?.choiceOptions?.map((option, idx) => {
                    return (
                      <div
                        key={option.title + idx}
                        className="flex flex-row">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-white/50 min-w-[10px] max-w-[10px]">{idx + 1}</span>
                          <Image
                            className="rounded-sm"
                            alt={`${option.title} image`}
                            src={URL.createObjectURL(option.imageFile as File)}
                            width={35}
                            height={35}
                          />
                          <p className="font-space-grotesk text-sm mb-0.5 text-white/80">{option.title}</p>
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

export default ChoicesPreview;
