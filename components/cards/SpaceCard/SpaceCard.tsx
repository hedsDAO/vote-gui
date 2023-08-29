import { Box, Flex, Typography } from "@/common";
import { SpaceData } from "hedsvote";
import Image from "next/image";
import * as styles from "./styles";

const SpaceCard = (props?: SpaceData) => {
  if (props?.name?.length) {
    return (
      <Box {...styles.$spaceCardBoxStyles}>
        <Flex {...styles.$spaceCardFlexStyles}>
          <Image
            className="rounded-full border-[3px] border-heds-bg-light"
            src={props?.image}
            alt={props?.name}
            width={55}
            height={55}
          />
          <Typography {...styles.$spaceCardTypographyStyles}>
            {props?.name}
          </Typography>
        </Flex>
      </Box>
    );
  } else
    return (
      <Box {...styles.$spaceCardEmptyBoxStyles}>
        <div className="flex h-full flex-col items-center justify-center gap-2">
          <div className="h-[50px] w-[50px] rounded-full bg-gray-200/10" />
          <p className="font-space-grotesk text-sm text-black">{""}</p>
        </div>
      </Box>
    );
};

export default SpaceCard;
