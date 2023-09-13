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
                <Typography mb={2} fontFamily="grotesk" color="whiteAlpha.600" fontSize="xs">
                  {constants.VOTING_PROPOSAL_TEXT}
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
                        p={1}
                        display="flex"
                        position={"relative"}
                        gap={2}
                      >
                        <Flex
                          direction="column"
                          alignItems="center"
                          justifyContent="center"
                          borderRadius="sm"
                          px={5}
                          py={0.5}
                          minWidth="9ch"
                        >
                          <Typography fontSize="0.5rem" color="whiteAlpha.600">
                            symbol
                          </Typography>
                          <Typography fontSize="xs" color="white" isTruncated maxWidth="7ch">
                            {tokenSymbol}
                          </Typography>
                        </Flex>
                        <Flex direction="row" alignItems={"center"} w="full" gap={1}>
                          <Flex
                            minW={{ base: "2rem", lg: "7rem" }}
                            maxW={{ base: "2rem", lg: "7rem" }}
                            gap={1}
                            alignItems="center"
                            borderRadius="sm"
                            p={1}
                          >
                            <Box minWidth="1.45ch" maxWidth="1.45ch" textAlign="center">
                              <Image alt="etherscan" className="invert" src={"/icons/etherscan.svg"} width={15} height={15} />
                            </Box>
                            <Link
                              display={{ base: "none", lg: "inline" }}
                              href={`https://etherscan.io/address/${tokenAddress}`}
                              isExternal
                              fontSize="xs"
                              color="white"
                            >
                              {tokenAddress?.slice(0, 6) + "..."}
                            </Link>
                          </Flex>
                          <Flex
                            minW={{ base: "4rem", lg: "7rem" }}
                            maxW={{ base: "4rem", lg: "7rem" }}
                            gap={1}
                            alignItems="center"
                            borderRadius="sm"
                            p={1}
                          >
                            <Box minWidth="1.25ch" maxWidth="1.25ch" textAlign="center">
                              <Image alt="owners" className="invert" src={"/icons/user.svg"} width={11} height={11} />
                            </Box>
                            <Typography fontSize="xs" color="white">
                              {numOfContractTokens}{" "}
                              <Typography as="span" display={{ base: "none", lg: "inline" }}>
                                owners
                              </Typography>
                            </Typography>
                          </Flex>
                          <Flex
                            minW={{ base: "3rem", lg: "7rem" }}
                            maxW={{ base: "3rem", lg: "7rem" }}
                            gap={1}
                            alignItems="center"
                            borderRadius="sm"
                            p={1}
                          >
                            <Box minWidth="1.25ch" maxWidth="1.25ch" textAlign="center">
                              <Image alt="weight" className="invert" src={"/icons/weight.svg"} width={11} height={11} />
                            </Box>
                            <Typography alignItems={"center"} display={"flex"} gap={2} fontSize="xs" color="white">
                              {weight}{" "}
                              <Typography as="span" display={{ base: "none", lg: "inline" }}>
                                {erc721?.params?.symbol}
                              </Typography>
                              <Typography
                                fontSize={{ base: "0.6rem", lg: "xs" }}
                                as="span"
                                fontFamily="inter"
                                textColor={"whiteAlpha.800"}
                                letterSpacing="wider"
                              >{`${quantity ? `(${quantity})` : ""}`}</Typography>
                            </Typography>
                          </Flex>
                        </Flex>
                        {/* {isOwner && (
                          <Box mt={2} ml="auto" mr={"-2"} h="27px" w="110px" roundedLeft={"lg"} bg="green.700">
                            <Typography paddingLeft="4" paddingTop="1" paddingBottom="2" fontSize="xs" color="whiteAlpha.800">
                              you own this
                            </Typography>
                          </Box>
                        )} */}
                      </Box>
                    );
                  })}
                </Flex>
                <Flex px={2} py={1.5} mt={0.5} rounded="lg" alignItems={"center"} justifyContent="space-between" bg="whiteAlpha.800">
                  <Typography px={2} fontFamily={'mono'} color="blackAlpha.800" fontSize='xs' as="span">
                    {address.slice(0, 8) + "..."}
                  </Typography>
                  <Typography bg="blackAlpha.800" px={2} py={1} rounded='md' fontFamily={'grotesk'} color="whiteAlpha.800" fontSize="xs">
                    HED: {proposalState.votingPower}
                  </Typography>
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
