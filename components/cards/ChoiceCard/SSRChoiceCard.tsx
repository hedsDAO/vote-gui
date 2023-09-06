import { Avatar, Flex, GridItem, Typography, Skeleton } from "@/common";
import * as styles from "@/components/cards/ChoiceCard/styles";

const SSRChoiceCard = () => {
  return (
    <GridItem as={Skeleton} {...styles.$parentAudioChoiceCardGridItemStyles("grid")}>
      <Flex {...styles.$parentFlexContainerStyles("grid")}>
        <Avatar {...styles.$imageAvatarImageStyles("grid")} src={"/empty.webp"} />
        <Flex {...styles.$textFlexContainer("grid")}>
          <Typography as={Skeleton} {...styles.$artistNameTextStyles("grid")} />
          <Typography as={Skeleton} {...styles.$choiceNameTextStyles("grid")} />
        </Flex>
      </Flex>
    </GridItem>
  );
};

export default SSRChoiceCard;
