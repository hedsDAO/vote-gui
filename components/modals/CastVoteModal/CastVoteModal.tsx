"use client";

import { useState } from "react";
import { setIsCastingVote } from "@/store/proposal";
import { useAccount, useWalletClient } from "wagmi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createClient } from "hedsvote";

import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { Avatar, Button, Flex, Typography } from "@/common";
import * as constants from "@/components/modals/CastVoteModal/constants";
import * as styles from "@/components/modals/CastVoteModal/styles";
import _ from "lodash";

const CastVoteModal = () => {
  const dispatch = useAppDispatch();
  const { castVote } = createClient();
  const { address } = useAccount();
  const { data } = useWalletClient();
  const [isLoading, setIsLoading] = useState(false);
  const { isCastingVote, proposal, votingPower } = useAppSelector((store) => store.proposal);
  const { voteSelections } = useAppSelector((store) => store.activeVoteReducer);

  const handleCastVote = async () => {
    if (!data || _.isEmpty(voteSelections)) return;
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
            setIsLoading(false);
            dispatch(setIsCastingVote(false));
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
          <Flex {...styles.$modalBodyFlexStyles}>
            {!_.isEmpty(voteSelections) ? (
              Object.entries(voteSelections).map(([key, val]) => {
                return (
                  <Flex {...styles.$voteSelectionFlexStyles} key={key}>
                    <Avatar src={proposal?.choices[+key].image} {...styles.$avatarStyles} />
                    <Typography {...styles.$proposalChoiceTextStyles}>{proposal?.choices[+key].name}</Typography>
                    <Flex {...styles.$voteChoiceValueFlexStyles}>
                      <Typography {...styles.$voteChoiceValueTextStyles}>{val}</Typography>
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
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CastVoteModal;
