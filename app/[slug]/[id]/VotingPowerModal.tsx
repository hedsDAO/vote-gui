"use client";

import { Transition, Dialog } from "@headlessui/react";
import { Strategy, calculateUserVotingPower } from "hedsvote";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";

const VotingPowerModal = ({
  isOpen,
  setIsOpen,
  strategies,
  address,
}: {
  isOpen: boolean;
  setIsOpen: (bool: boolean) => void;
  strategies: any;
  address: string;
}) => {
  const [erc721, setErc721] = useState<any>();
  const [whitelist, setWhitelist] = useState<any>();
  useEffect(() => {
    if (strategies) {
      strategies?.map((e: any) => {
        if (e?.["name"] === "whitelist-weighted") {
          setWhitelist(e);
        }
        if (e?.["name"] === "erc721-multi-registry-weighted") {
          setErc721(e);
        }
      });
    }
  }, [strategies]);

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
              <Dialog.Panel className="relative w-[90%] transform overflow-hidden rounded-lg bg-heds-bg px-6 py-5 text-left shadow-xl transition-all sm:my-8 sm:max-w-lg">
                {address && <div className="flex flex-col gap-2">
                  <div className="flex flex-col">
                    <p className="text-2xl text-white">Voting Strategies</p>
                    <p className="font-space-grotesk text-sm text-white/70 lg:text-base">
                      where do my {erc721?.params?.symbol} voting points come
                      from?
                    </p>
                  </div>
                  <div className="mt-3 flex flex-col gap-2">
                    <div className="flex flex-col">
                      <p className="text-white/90">Tokens and Contracts</p>
                      <p className="font-space-grotesk text-xs text-white/60">
                        This voting proposal has{" "}
                        <span className="text-h-yellow-light">
                          {/* {Object.keys(erc721?.params?.owners)?.length}{" "} */}
                          tokens/contracts
                        </span>{" "}
                        that give holders voting power.
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      {erc721?.params?.tokens?.map(
                        (token: string, i: number) => {
                          const tokenSymbol =
                            erc721?.params?.owners?.[`${i}`]?.[0]?.symbol;
                          const tokenAddress = erc721?.params?.tokens?.[i];
                          const numOfOwners =
                            erc721?.params?.owners?.[i]?.length;
                          const weight = erc721?.params?.weights?.[i];
                          let owners = erc721?.params?.owners?.[i]?.map(
                            (token: any) => token?.owner
                          );
                          const isOwner = owners?.includes(
                            address?.toLowerCase()
                          );

                          const test = owners?.filter(
                            (e: any) =>
                              e?.toLowerCase() === address?.toLowerCase()
                          );
                          let quantity = test?.length || 0;

                          return (
                            <div
                              key={i + "token"}
                              className={
                                `${
                                  isOwner ? "bg-green-600/70" : "bg-h-black-800"
                                } ` + " flex gap-2 rounded-lg py-2"
                              }
                            >
                              <div
                                className="flex min-w-[9ch] flex-col items-center justify-center rounded-sm px-5 py-5 lg:min-w-[11ch] "
                                key={token}
                              >
                                <p className="font-space-grotesk text-[0.6rem] text-white/60">
                                  symbol
                                </p>
                                <p className="max-w-[7ch] truncate text-ellipsis text-xs text-white">
                                  {tokenSymbol}
                                </p>
                              </div>
                              <div className="flex w-full flex-col justify-center -space-y-1">
                                <div className="flex items-center gap-2 rounded-sm  py-1 pl-1 pr-2">
                                  <div className="min-w-[1.25ch] max-w-[1.25ch] text-center">
                                    <Image
                                      alt="etherscan"
                                      src={"/icons/etherscan.svg"}
                                      width={16}
                                      height={16}
                                      className="invert"
                                    />
                                  </div>
                                  <a
                                    autoFocus={false}
                                    target="_blank"
                                    href={`https://etherscan.io/address/${tokenAddress}`}
                                    className="font-space-grotesk text-xs text-white outline-none ring-0 ring-transparent hover:underline"
                                  >
                                    {tokenAddress?.slice(0, 6) + "..."}
                                  </a>
                                </div>
                                <div className="flex flex-col">
                                  <div className="flex items-center gap-2 rounded-sm  py-1 pl-1 pr-2">
                                    <div className="min-w-[1.25ch] max-w-[1.25ch] text-center">
                                      <Image
                                        alt="owners"
                                        src={"/icons/user.svg"}
                                        width={10}
                                        height={10}
                                        className="invert"
                                      />
                                    </div>
                                    <p className="font-space-grotesk text-xs text-white ">
                                      {numOfOwners} owners
                                    </p>
                                  </div>
                                </div>
                                <div className="flex flex-col">
                                  <div className="flex items-center gap-2 rounded-sm  py-1 pl-1 pr-2">
                                    <div className="min-w-[1.25ch] max-w-[1.25ch] text-center">
                                      <Image
                                        alt="weight"
                                        src={"/icons/weight.svg"}
                                        width={10}
                                        height={10}
                                        className="invert"
                                      />
                                    </div>
                                    <p className="font-space-grotesk text-xs text-white ">
                                      {weight} {erc721?.params?.symbol}{" "}
                                      <span className="tracking-widest font-inter">{`${quantity > 1 ? `(${quantity})` : ""}`}</span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                              {isOwner && (
                                <div className="h-[23px] w-[220px] rounded-l-lg bg-green-800 lg:h-[26px] lg:w-[200px]">
                                  <p className="pl-3.5 pt-1 font-space-grotesk text-[0.6rem] text-white/80 lg:text-xs">
                                    you own this
                                  </p>
                                </div>
                              )}
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                  {whitelist?.params?.addresses && (
                    <div className="mt-3 flex flex-col gap-2">
                      <div className="flex flex-col">
                        <p className="text-white/90">Whitelist</p>
                        <p className="font-space-grotesk text-xs text-white/60">
                          The creator of this proposal has added a whitelist of
                          addresses.
                        </p>
                      </div>
                      <div
                        className={
                          `${
                            Object.keys(whitelist?.params?.addresses)?.includes(
                              address?.toLowerCase()
                            )
                              ? "bg-green-600/70"
                              : "bg-h-black-800"
                          } ` + "flex gap-2 rounded-lg py-3"
                        }
                      >
                        <div className="flex min-w-[9ch] flex-col items-center justify-center rounded-sm px-5 py-5 lg:min-w-[11ch] ">
                          <p className="max-w-[7ch] truncate text-ellipsis text-xs text-white">
                            WLST
                          </p>
                        </div>
                        <div className="flex w-full flex-col justify-center -space-y-1">
                          <div className="flex items-center gap-2 rounded-sm  py-1 pl-1 pr-2">
                            <div className="min-w-[1.25ch] max-w-[1.25ch] text-center">
                              <Image
                                alt="owners"
                                src={"/icons/user.svg"}
                                width={10}
                                height={10}
                                className="invert"
                              />
                            </div>
                            <p className="font-space-grotesk text-xs text-white ">
                              {
                                Object.values(whitelist?.params?.addresses)
                                  ?.length
                              }{" "}
                              owners
                            </p>
                          </div>
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2 rounded-sm  py-1 pl-1 pr-2">
                              <div className="min-w-[1.25ch] max-w-[1.25ch] text-center">
                                <Image
                                  alt="weight"
                                  src={"/icons/weight.svg"}
                                  width={10}
                                  height={10}
                                  className="invert"
                                />
                              </div>
                              <p className="font-space-grotesk text-xs text-white ">
                                {Object.values(whitelist?.params?.addresses)[0]}{" "}
                                {erc721?.params?.symbol}
                              </p>
                            </div>
                          </div>
                        </div>
                        {Object.keys(whitelist?.params?.addresses)?.includes(
                          address?.toLowerCase()
                        ) && (
                          <div className="h-[23px] w-[220px] rounded-l-lg bg-green-800 lg:h-[27px] lg:w-[180px]">
                            <p className="pl-4 pt-[5px] font-space-grotesk text-[0.6rem] text-white/80 lg:text-xs">
                              whitelisted
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  <div className="flex flex-col gap-2">
                    <div className="flex w-full flex-row items-start justify-between gap-2 rounded-lg bg-h-black-800 px-4 py-3">
                      <div>
                        <p className="rounded-sm font-space-grotesk text-xs text-white/70">
                          <span className="mr-1 text-h-yellow-light/70">
                            HED
                          </span>
                          {calculateUserVotingPower(address, strategies)}
                        </p>
                      </div>
                      <p className="max-w-[24ch] truncate rounded-sm font-space-grotesk text-xs text-white/70 lg:max-w-none">
                        {address?.toLowerCase()}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 flex justify-end">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="rounded-md bg-h-black-800/70 px-3 py-1 hover:bg-h-black-800"
                    >
                      <p className="font-space-grotesk text-sm text-white">
                        back
                      </p>
                    </button>
                  </div>
                </div>}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default VotingPowerModal;
