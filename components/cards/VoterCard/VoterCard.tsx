"use client";
import { Avatar, Flex, GridItem, Typography } from "@/common";
import { Info } from "@/common/Icons";
import { QuadraticVote, SingleChoiceVote } from "hedsvote";

const VoterCard = ({ vote, image }: { vote: QuadraticVote | SingleChoiceVote; image?: string }) => {
  return (
    <GridItem
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
            {vote.voter?.slice(0, 5) + "..."}
          </Typography>
        </Flex>
        <Flex px={2}>
          <Info className="invert" />
        </Flex>
      </Flex>
    </GridItem>
  );
};

export default VoterCard;
