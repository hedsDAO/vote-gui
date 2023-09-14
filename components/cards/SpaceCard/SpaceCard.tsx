import { Box, Flex, Typography } from "@/common";
import { SpaceData } from "hedsvote";
import Image from "next/image";
import * as styles from "@/components/cards/SpaceCard/styles";
import * as constants from "@/components/cards/SpaceCard/constants";

const SpaceCard = (props?: SpaceData) => {
  if (props?.name?.length) {
    return (
      <Box {...styles.$spaceCardBoxStyles}>
        <Flex {...styles.$spaceCardFlexStyles}>
          <Image
            style={{ ...styles.$imageStyles }}
            src={props?.image}
            alt={props?.name}
            width={constants.DEFAULT_IMG_WIDTH}
            height={constants.DEFAULT_IMG_HEIGHT}
          />
          <Typography {...styles.$spaceCardTypographyStyles}>{props?.name}</Typography>
        </Flex>
      </Box>
    );
  } else
    return (
      <Box {...styles.$spaceCardEmptyBoxStyles}>
        <Flex {...styles.$emptySpaceFlexStyles}>
          <Box {...styles.$emptyBoxStyles} />
          <Typography {...styles.$emptyTypographyStyles}>{""}</Typography>
        </Flex>
      </Box>
    );
};

export default SpaceCard;
