import Link from "next/link";
import { createClient } from "hedsvote";
import { Box, Flex, Typography } from "@/common";
import * as constants from "@/app/_components/Spaces/constants";
import * as styles from "@/app/_components/Spaces/styles";
import SpaceCard from "@/components/cards/SpaceCard/SpaceCard";

async function getSpaceData() {
  try {
    const spacesResult = await createClient().getAllSpaces();
    const spaces = spacesResult.data.filter((space) => space.name !== "test");
    return spaces || null;
  } catch (e) {
    console.log(e);
  }
}

const Spaces = async () => {
  const spaceData = await getSpaceData();

  return (
    <Box>
      <Flex {...styles.$spacesParentFlexContainer}>
        <Flex {...styles.$spacesFlexContainer}>
          <Typography {...styles.$spacesTypographyStyles}>
            {constants.SPACES_TEXT}
          </Typography>
        </Flex>
        <Flex {...styles.$spaceCardsFlexContainer}>
          {spaceData?.map((space) => (
            <Link key={space?.name} href={`/${space?.name}`}>
              <SpaceCard {...space} />
            </Link>
          ))}
          {new Array(2)?.fill(null)?.map((_, index) => (
            <Box key={index}  {...styles.$hiddenSpaceCardsBoxStyles}>
              <SpaceCard {..._} />
            </Box>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Spaces;
