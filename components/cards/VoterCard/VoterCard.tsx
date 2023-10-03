"use client";
import { useEffect } from "react";
import { Avatar, Flex, GridItem, Typography } from "@/common";
import { Info } from "@/common/Icons";
import { useAppDispatch } from "@/store/hooks";
import { setHoveringVote } from "@/store/proposal";
import { Vote } from "@heds-dev/hedsvote";
import _ from "lodash";

const VoterCard = ({ vote, image }: { vote: Vote; image?: string }) => {
  const dispatch = useAppDispatch();
  const handleSetHoveringVote = (vote: any) => {
    const { vote_choices } = vote;
    let hoveringVote: { [key: number]: string } = {};
    const totalVotesDistributed = vote_choices.reduce((acc: number, choice: any) => acc + choice.amount, 0);
    vote_choices.forEach((choice: any) => {
      hoveringVote[choice.choice_id] = `${_.round((choice.amount / totalVotesDistributed) * 100, 2)}`;
    });
    dispatch(setHoveringVote(hoveringVote));
  };
  useEffect(() => {
    return () => {
      dispatch(setHoveringVote(null));
    };
  }, [vote]);
  return (
    <GridItem
      onMouseEnter={() => handleSetHoveringVote(vote)}
      onMouseLeave={() => dispatch(setHoveringVote(null))}
      _hover={{ bg: "heds.bg_light" }}
      transition="all 0.3s ease-in-out"
      key={vote.voter}
      rounded="3xl"
      bg="heds.bg_dark"
      w="full"
      color="white"
      p={2}
      colSpan={1}
    >
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Flex gap={2} alignItems={"center"}>
          <Avatar size="xs" rounded={"xl"} borderRadius="xl" src={image} />
          <Typography color="whiteAlpha.800" fontSize={"xs"} fontFamily={"grotesk"}>
            {vote.voter}
          </Typography>
        </Flex>
        <Flex px={2}>
          <Info className="opacity-50 invert" />
        </Flex>
      </Flex>
    </GridItem>
  );
};

export default VoterCard;
