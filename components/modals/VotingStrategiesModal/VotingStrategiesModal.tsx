"use client";

import Image from "next/image";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setIsShowingStrategies } from "@/store/proposal";

import { Box, Button, Flex, Typography } from "@/common";
import { Link, Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";
import * as styles from "@/components/modals/VotingStrategiesModal/styles";
import * as constants from "@/components/modals/VotingStrategiesModal/constants";

const VotingStrategiesModal = () => {
  const dispatch = useAppDispatch();
  const proposalState = useAppSelector((state) => state.proposal);
  const { address } = useAccount();
  const [erc721, setErc721] = useState<any>();
  const [whitelist, setWhitelist] = useState<any>();
  useEffect(() => {
    if (proposalState?.proposal?.strategies) {
      proposalState?.proposal?.strategies?.map((e: any) => {
        if (e?.["name"] === "whitelist-weighted") {
          setWhitelist(e);
        }
        if (e?.["name"] === "erc721-multi-registry-weighted") {
          setErc721(e);
        }
      });
    }
  }, [proposalState]);

  return (
    <Modal
      size="lg"
      onClose={() => dispatch(setIsShowingStrategies(false))}
      isOpen={proposalState?.isShowingStrategies}
      isCentered
    >
      <ModalOverlay />
      <ModalContent maxW={{ base: "95%", lg: "lg" }} p={8} bg="heds.bg_dark">
        {address && (
          <Flex direction="column" gap={2}>
            <Flex direction="column">
              <Typography fontSize="2xl" color="white">
                {constants.VOTING_STRATEGIES_HEADING}
              </Typography>
              <Typography fontFamily="grotesk" fontSize={{ base: "sm", lg: "base" }} color="whiteAlpha.700">
                {constants.generateSubheading(erc721?.params?.symbol)}
              </Typography>
            </Flex>
            <Box mt={3}>
              <Flex direction="column" gap={2}>
                <Typography color="whiteAlpha.800">{constants.TOKEN_AND_CONTRACTS_HEADING}</Typography>
                <Typography fontFamily="grotesk" color="whiteAlpha.600" fontSize="xs">
                  {constants.TOKEN_CONTRACTS_TEXT}
                  <Typography as="span" color="orange.400">
                    {constants.TOKEN_CONTRACTS_TEXT}
                  </Typography>
                  {constants.HOLDERS_POWER_TEXT}
                </Typography>
                <Flex direction="column" gap={2}>
                  {erc721?.params?.tokens?.map((token: string, i: number) => {
                    const tokenSymbol = erc721?.params?.owners?.[`${i}`]?.[0]?.symbol;
                    const tokenAddress = erc721?.params?.tokens?.[i];
                    const numOfContractTokens = erc721?.params?.owners?.[i]?.length;
                    const weight = erc721?.params?.weights?.[i];
                    let owners = erc721?.params?.owners?.[i]?.map((token: any) => token?.owner);
                    const isOwner = owners?.includes(address?.toLowerCase());
                    const test = owners?.filter((e: any) => e?.toLowerCase() === address?.toLowerCase());
                    let quantity = test?.length || 0;
                    return (
                      <Box
                        key={i + "token"}
                        bg={isOwner ? "green.600" : "black.800"}
                        borderRadius="lg"
                        p={2}
                        display="flex"
                        position={"relative"}
                        gap={2}
                      >
                        <Flex
                          direction="column"
                          alignItems="center"
                          justifyContent="center"
                          borderRadius="sm"
                          p={5}
                          minWidth="9ch"
                        >
                          <Typography fontSize="xs" color="whiteAlpha.600">
                            symbol
                          </Typography>
                          <Typography fontSize="xs" color="white" isTruncated maxWidth="7ch">
                            {tokenSymbol}
                          </Typography>
                        </Flex>
                        <Flex direction="column" justifyContent="center" gap={1}>
                          <Flex gap={1} alignItems="center" borderRadius="sm" p={1}>
                            <Box minWidth="1.25ch" maxWidth="1.25ch" textAlign="center">
                              <Image alt="etherscan" className="invert" src={"/icons/etherscan.svg"} width={13} height={13} />
                            </Box>
                            <Link href={`https://etherscan.io/address/${tokenAddress}`} isExternal fontSize="xs" color="white">
                              {tokenAddress?.slice(0, 6) + "..."}
                            </Link>
                          </Flex>
                          <Flex gap={1} alignItems="center" borderRadius="sm" p={1}>
                            <Box minWidth="1.25ch" maxWidth="1.25ch" textAlign="center">
                              <Image alt="owners" className="invert" src={"/icons/user.svg"} width={11} height={11} />
                            </Box>
                            <Typography fontSize="xs" color="white">
                              {numOfContractTokens} tokens
                            </Typography>
                          </Flex>
                          <Flex gap={1} alignItems="center" borderRadius="sm" p={1}>
                            <Box minWidth="1.25ch" maxWidth="1.25ch" textAlign="center">
                              <Image alt="weight" className="invert" src={"/icons/weight.svg"} width={11} height={11} />
                            </Box>
                            <Typography fontSize="xs" color="white">
                              {weight} {erc721?.params?.symbol}{" "}
                              <Typography as="span" fontFamily="inter" letterSpacing="wider">{`${
                                quantity > 1 ? `(${quantity})` : ""
                              }`}</Typography>
                            </Typography>
                          </Flex>
                        </Flex>
                        {isOwner && (
                          <Box mt={2} ml="auto" mr={"-2"} h="27px" w="110px" roundedLeft={"lg"} bg="green.700">
                            <Typography paddingLeft="4" paddingTop="1" paddingBottom="2" fontSize="xs" color="whiteAlpha.800">
                              you own this
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    );
                  })}
                </Flex>
              </Flex>
            </Box>
            <Box {...styles.$backButtonBoxStyles}>
              <Button {...styles.$backButtonStyles} onClick={() => dispatch(setIsShowingStrategies(false))}>
                {constants.BACK_BUTTON_TEXT}
              </Button>
            </Box>
          </Flex>
        )}
      </ModalContent>
    </Modal>
  );
};

export default VotingStrategiesModal;
