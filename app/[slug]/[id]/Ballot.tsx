"use client";

import { ProposalContext } from "@/context/proposal.context";
import { ConnectKitButton } from "connectkit";
import { useContext, useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { calculateUserVotingPower, Strategy, Choice } from "hedsvote";
import BallotModal from "./BallotModal";
import VotingPowerModal from "./VotingPowerModal";

const Ballot = ({
  userVote,
  choices,
  strategies,
  proposal,
}: {
  userVote: any;
  choices: Choice[];
  strategies: Strategy[];
  proposal?: any;
}) => {
  const { state, dispatch } = useContext(ProposalContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isShowingVPModal, setIsShowingVPModal] = useState(false);
  const [showConnectButton, setShowConnectButton] = useState<boolean>();
  const [userVp, setUserVp] = useState<number>(0);
  const { isConnected, address } = useAccount();
  const getVp = async () => {
    try {
      const vp = await calculateUserVotingPower(
        address as `0x${string}`,
        strategies
      );
      setUserVp(vp);
      return;
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (address && strategies) getVp();
  }, [address, strategies]);

  useEffect(() => {
    if (isConnected && address) {
      setShowConnectButton(false);
    } else {
      setShowConnectButton(true);
    }
  }, [isConnected]);

  const prevVote = userVote?.reduce(
    (obj: any, item: any) => ({
      ...obj,
      [item.choice_id]: item.amount,
    }),
    {}
  );
  console.log(
    JSON.stringify(state?.likes) === JSON.stringify(prevVote) ||
      Object?.values(state?.likes)?.length === 0
  );
  return (
    <>
      <div className="flex gap-1">
        {showConnectButton ? (
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
        ) : (
          <button
            onClick={() => setIsOpen(true)}
            disabled={
              JSON.stringify(state?.likes) === JSON.stringify(prevVote) ||
              Object?.values(state?.likes)?.length === 0
            }
            className={
              `${
                Object.values(state?.likes)?.length !== 0 &&
                JSON.stringify(state?.likes) !== JSON.stringify(prevVote)
                  ? "bg-fuchsia-500"
                  : "bg-fuchsia-200"
              } ` + "max-h-[30px] min-h-[30px] rounded-full px-3"
            }
          >
            <p className="font-inter text-xs text-white">
              CAST VOTE{" "}
              <span
                className={
                  `${
                    Object.values(state?.likes)?.length !== 0 &&
                    JSON.stringify(state?.likes) !== JSON.stringify(prevVote)
                      ? "bg-fuchsia-900"
                      : "bg-fuchsia-300"
                  } ` + "ml-1 rounded-full px-1.5 py-0.5 text-white"
                }
              >
                {state?.likes ? Object.values(state?.likes)?.length : 0}
              </span>
            </p>
          </button>
        )}
        {/* here */}
        <div
          role="button"
          onClick={() => setIsShowingVPModal(true)}
          className="flex items-center rounded-full bg-heds-bg px-3"
        >
          <p className="text-sm text-white">{userVp}</p>
        </div>
        <VotingPowerModal
          isOpen={isShowingVPModal}
          setIsOpen={setIsShowingVPModal}
          strategies={proposal?.strategies}
          address={address as string}
        />
      </div>
      {address && (
        <BallotModal
          choices={choices}
          userVotes={state?.likes}
          proposalId={proposal?.proposalId || ""}
          vp={userVp}
          voter={address}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
    </>
  );
};

export default Ballot;
