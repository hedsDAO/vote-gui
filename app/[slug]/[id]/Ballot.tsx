"use client";

import { ProposalContext } from "@/context/proposal.context";
import { ConnectKitButton } from "connectkit";
import { useContext, useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { calculateUserVotingPower, Strategy, Choice } from "hedsvote";
import BallotModal from "./BallotModal";

const Ballot = ({
  choices,
  strategies,
}: {
  choices: Choice[];
  strategies: Strategy[];
}) => {
  const { state, dispatch } = useContext(ProposalContext);
  const [isOpen, setIsOpen] = useState(false);
  const { isConnected, address } = useAccount();
  const getVp = async () => {
    console.log(address, strategies);
    try {
      const vp = await calculateUserVotingPower(
        address as `0x${string}`,
        strategies
      );
      console.log(vp, "###################################");
      return vp;
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    console.log("here");
    if (address && strategies) getVp();
  }, [address, strategies]);
  if (!isConnected) {
    return (
      <ConnectKitButton.Custom>
        {({ isConnected, show, address }) => {
          return (
            <button
              className="rounded-full bg-heds-bg px-4 py-2"
              onClick={show}
            >
              <p className="font-space-grotesk text-[0.8rem] text-white transition-all">
                connect
              </p>
            </button>
          );
        }}
      </ConnectKitButton.Custom>
    );
  } else
    return (
      <>
        <div className="flex gap-1">
          <button
            onClick={() => setIsOpen(true)}
            disabled={
              state?.likes && Object.values(state?.likes)?.length ? false : true
            }
            className={
              `${
                state?.likes && Object.values(state?.likes)?.length
                  ? "bg-fuchsia-500"
                  : "bg-fuchsia-200"
              } ` + "rounded-full px-3 py-2"
            }
          >
            <p className="font-inter text-xs text-white">
              BALLOT{" "}
              <span
                className={
                  `${
                    state?.likes && Object.values(state?.likes)?.length
                      ? "bg-fuchsia-900"
                      : "bg-fuchsia-300"
                  } ` + "ml-1 rounded-full px-1.5 py-0.5 text-white"
                }
              >
                {state?.likes ? Object.values(state?.likes)?.length : 0}
              </span>
            </p>
          </button>
          {/* here */}
          {/* <p className="text-black">{userVp}</p> */}
        </div>
        <BallotModal isOpen={isOpen} setIsOpen={setIsOpen} />
      </>
    );
};

export default Ballot;
