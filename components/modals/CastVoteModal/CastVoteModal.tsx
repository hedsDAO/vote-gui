"use client";

import { useEffect, useState } from "react";
import { setIsCastingVote, setPreviousVote } from "@/store/proposal";
import { useAccount, useWalletClient } from "wagmi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createClient } from "hedsvote";

import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { Avatar, Button, Flex, Typography } from "@/common";
import * as constants from "@/components/modals/CastVoteModal/constants";
import * as styles from "@/components/modals/CastVoteModal/styles";
import _ from "lodash";
import LoadingAnimation from "@/components/animations/LoadingAnimation/LoadingAnimation";
import CheckMarkAnimation from "@/components/animations/CheckmarkAnimation/CheckmarkAnimation";

const CastVoteModal = () => {
  const dispatch = useAppDispatch();
  const { castVote } = createClient();
  const { address } = useAccount();
  const { data } = useWalletClient();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { isCastingVote, proposal, votingPower } = useAppSelector((store) => store.proposal);
  const { voteSelections } = useAppSelector((store) => store.activeVoteReducer);
  const chosenIds = _.isEmpty(voteSelections) ? [] : Object.keys(voteSelections);

  const handleCastVote = async () => {
    if (!data || _.isEmpty(voteSelections)) return;
    setIsLoading(true);
    const proposal_id = proposal?.ipfs_hash;
    const voter = address;
    const vp = votingPower;
    if (proposal_id && voter && vp) {
      const vote = constants.formatVoteArguments({ proposal_id, voter, vp, voteSelections });
      if (vote) {
        try {
          const successfulVote = await castVote(data, vote);
          if (successfulVote === "signature rejected") {
            setIsLoading(false);
          } else {
            setIsSuccess(true);
            setTimeout(() => {
              dispatch(setPreviousVote(voteSelections));
              setIsLoading(false);
              setIsSuccess(false);
              dispatch(setIsCastingVote(false));
            }, 2500);
          }
        } catch (e) {
          setIsLoading(false);
          console.log(e);
        }
      }
    }
  };

  return (
    <Modal
      {...styles.$modalStyles}
      onClose={isLoading ? () => {} : () => dispatch(setIsCastingVote(false))}
      isOpen={isCastingVote}
    >
      <ModalOverlay {...styles.$modalOverlayStyles} />
      <ModalContent {...styles.$modalContentStyles}>
        <ModalHeader>
          <Typography {...styles.$headingTextStyles}>{constants.HEADING_TEXT}</Typography>
          <Typography {...styles.$subheadingTextStyles}>{constants.SUBHEADING_TEXT}</Typography>
          <ModalCloseButton isDisabled={isLoading} {...styles.$modalCloseButtonStyles} />
        </ModalHeader>
        <ModalBody>
          {isSuccess ? (
            <Flex {...styles.$checkmarkFlexAnimationStyles}>
              <CheckMarkAnimation />
              <Flex {...styles.$successTextFlexStyles}>
                <Typography {...styles.$successSubheadingStyles}>
                  {constants.SUCCESS_SUBHEADING}
                </Typography>
                <Typography {...styles.$successHeadingStyles}>
                  {constants.SUCCESS_HEADING}
                </Typography>
              </Flex>
            </Flex>
          ) : isLoading ? (
            <LoadingAnimation />
          ) : (
            <Flex {...styles.$modalBodyFlexStyles}>
              {!_.isEmpty(voteSelections) && proposal?.choices?.length ? (
                proposal?.choices?.map((choice, idx) => {
                  if (chosenIds?.includes(`${choice?.id}`))
                    return (
                      <Flex key={choice?.id + voteSelections?.[choice?.id]} {...styles.$voteSelectionFlexStyles}>
                        <Avatar src={choice?.image} {...styles.$avatarStyles} />
                        <Typography {...styles.$proposalChoiceTextStyles}>{choice?.name}</Typography>
                        <Flex {...styles.$voteChoiceValueFlexStyles}>
                          <Typography {...styles.$voteChoiceValueTextStyles}>{voteSelections?.[choice?.id]}</Typography>
                        </Flex>
                      </Flex>
                    );
                })
              ) : (
                <></>
              )}
              <Flex {...styles.$submitButtonFlexContainerStyles}>
                <Button onClick={() => handleCastVote()} isLoading={isLoading} {...styles.$submitButtonStyles}>
                  {constants.BUTTON_TEXT}
                </Button>
              </Flex>
            </Flex>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CastVoteModal;
