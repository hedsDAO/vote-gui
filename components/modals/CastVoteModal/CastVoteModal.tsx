"use client";
import { Transition, Dialog } from "@headlessui/react";
import Image from "next/image";
import { Fragment, useMemo, useState } from "react";
import { createClient } from "hedsvote";
import { useWalletClient } from "wagmi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setIsCastingVote } from "@/store/proposal";
import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";
import { Flex, Typography } from "@/common";

const CastVoteModal = () => {
  const { isCastingVote, proposal } = useAppSelector((store) => store.proposal);
  const { voteSelections } = useAppSelector((store) => store.activeVoteReducer);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { castVote } = createClient();
  const { data } = useWalletClient();
  const userVoteEntries = useMemo(() => (proposal?.votes ? Object.entries(proposal.votes) : null), [proposal?.votes]);
  // const handleCastVote = async () => {
  //   setIsLoading(true);
  //   if (!data) return;
  //   const vote_choices = Object.entries(userVotes).map((vote) => {
  //     return {
  //       proposal_id,
  //       choice_id: +vote[0],
  //       amount: vote[1],
  //     };
  //   });
  //   try {
  //     const vote: Vote = {
  //       proposal_id,
  //       vp,
  //       voter,
  //       vote_choices,
  //     };
  //     console.log(data, vote, 'here')
  //   //   const successfulVote = await castVote(data, vote);
  //   //   if (successfulVote === "signature rejected") {
  //   //     setIsLoading(false);
  //   //   } else {
  //   //     setIsLoading(false);
  //   //     setIsOpen(false);
  //   //   }
  //   } catch (e) {
  //     setIsLoading(false);
  //     console.log(e);
  //   }
  // };

  return (
    <Modal size="lg" onClose={() => dispatch(setIsCastingVote(false))} isOpen={isCastingVote} isCentered>
      <ModalOverlay />
      <ModalContent maxW={{ base: "95%", lg: "lg" }} p={8} bg="heds.bg_dark">
        <Flex direction="column">
          <Typography fontFamily="grotesk" fontSize={{ base: "base", lg: "2xl" }} color="whiteAlpha.900">
            CAST VOTE
          </Typography>
          <hr />
          {proposal?.votes?.length && userVoteEntries && proposal?.choices ? (
            userVoteEntries.map(([choiceId, choiceAmount], i) => {
              const choice = choiceId ? proposal?.choices.find((choice) => JSON.stringify(choice?.id) === choiceId) : null;
              if (choiceId)
                return (
                  <div className="flex items-center justify-between px-1" key={choiceId + i}>
                    <div className="flex items-center">
                      <div className="min-w-[25px] max-w-[25px]">
                        <Image
                          alt={choice?.name || ""}
                          src={choice?.image || ""}
                          width={16}
                          height={16}
                          className="rounded-full object-cover"
                        />
                      </div>
                      <p className="-mt-[1px] font-space-grotesk text-sm text-black">{choice?.name}</p>
                    </div>
                    <p className="font-space-grotesk text-sm text-black">
                      {/* {proposal?.votes?.length ? proposal?.votes?.[+choiceId] : ""} */}
                    </p>
                  </div>
                );
            })
          ) : (
            <></>
          )}
          <hr />
          {/* <div className="flex justify-between pt-2">
            <button onClick={() => dispatch(setIsCastingVote(false))} className="rounded-md bg-heds-bg/20 px-3 py-1">
              <p className="-mt-[1px] font-space-grotesk text-sm text-black/70 hover:text-black/100">back</p>
            </button>
            <button disabled={isLoading} onClick={() => {}} className="rounded-md bg-heds-bg px-3 py-1">
              {isLoading ? (
                <Image alt="loading" className="animate-spin invert" src={"/icons/spinner.svg"} width={16} height={16} />
              ) : (
                <p className="-mt-[1px] font-space-grotesk text-sm text-white">cast vote</p>
              )}
            </button>
          </div> */}
        </Flex>
      </ModalContent>
    </Modal>
  );
};

export default CastVoteModal;
