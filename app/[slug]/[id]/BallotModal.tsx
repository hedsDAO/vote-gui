"use client";
import { Transition, Dialog } from "@headlessui/react";
import Image from "next/image";
import { Fragment, useState } from "react";
import { createClient } from "hedsvote";
import { useWalletClient } from "wagmi";
const BallotModal = ({
  isOpen,
  setIsOpen,
  choices,
  userVotes,
  proposalId,
  vp,
  voter,
}: {
  isOpen: boolean;
  setIsOpen: (bool: boolean) => void;
  choices: any[];
  userVotes: { [key: number]: number };
  proposalId: string;
  vp: number;
  voter: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { castVote } = createClient();
  const { data } = useWalletClient();

  const handleCastVote = async () => {
    setIsLoading(true);
    if (!data) return;
    const voteChoices = Object.entries(userVotes).map((vote) => {
      return {
        proposalId,
        choiceId: +vote[0],
        amount: vote[1],
      };
    });
    try {
      const vote = {
        proposalId,
        vp,
        voter,
        voteChoices,
      };
      const successfulVote = await castVote(data, vote);
      if (successfulVote === "signature rejected") {
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setIsOpen(false);
      }
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }
  };

  const chosenIds = Object.keys(userVotes);
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
              <Dialog.Panel className="relative w-[90%] transform overflow-hidden rounded-lg bg-white px-6 py-4 text-left shadow-xl transition-all sm:my-8 sm:max-w-lg">
                <div className="flex flex-col gap-2">
                  <p className="pb-2 font-inter text-black">CONFIRM CHOICES</p>
                  <hr />
                  {userVotes &&
                    Object.keys(userVotes).map((choice, i) => {
                      return (
                        <div
                          className="flex items-center justify-between px-1"
                          key={choice + i}
                        >
                          <div className="flex items-center">
                            <div className="min-w-[25px] max-w-[25px]">
                              <Image
                                alt={choices[+choice].name}
                                src={choices[+choice].image}
                                width={16}
                                height={16}
                                className="rounded-full object-cover"
                              />
                            </div>
                            <p className="-mt-[1px] font-space-grotesk text-sm text-black">
                              {choices[+choice].name}
                            </p>
                          </div>
                          <p className="font-space-grotesk text-sm text-black">
                            {userVotes[+choice]}
                          </p>
                        </div>
                      );
                    })}
                  <hr />
                  <div className="flex justify-between pt-2">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="rounded-md bg-heds-bg/20 px-3 py-1"
                    >
                      <p className="-mt-[1px] font-space-grotesk text-sm text-black/70 hover:text-black/100">
                        back
                      </p>
                    </button>
                    <button
                      disabled={isLoading}
                      onClick={() => handleCastVote()}
                      className="rounded-md bg-heds-bg px-3 py-1"
                    >
                      {isLoading ? (
                        <Image
                          alt="loading"
                          className="animate-spin invert"
                          src={"/icons/spinner.svg"}
                          width={16}
                          height={16}
                        />
                      ) : (
                        <p className="-mt-[1px] font-space-grotesk text-sm text-white">
                          cast vote
                        </p>
                      )}
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default BallotModal;
