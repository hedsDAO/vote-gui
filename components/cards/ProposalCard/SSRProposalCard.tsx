import { Avatar, Box, Flex, GridItem, Skeleton } from "@/common";
import * as styles from "@/components/cards/ProposalCard/styles";

const SSRProposalCard = () => {
  return (
    <>
      <GridItem {...styles.$gridItemSkeletonStyles}>
        <Skeleton {...styles.$skeletonBadgeFlexContainerStyles}>
          <Skeleton {...styles.$proposalStatusBadgeSkeletonStyles} />
        </Skeleton>
        <Box {...styles.$avatarBoxStyles}>
          <Skeleton {...styles.$skeletonAvatarFlexStyles}>
            <Avatar {...styles.$avatarImageStyles} />
          </Skeleton>
        </Box>
        <Flex {...styles.$textFlexContainerStyles}>
          <Skeleton {...styles.$skeletonProposalTitleTextStyles} />
          <Flex {...styles.$skeletonDateFlexStyles}>
            <Skeleton {...styles.$skeletonProposalTimelineTextStyles} />
            <Skeleton {...styles.$skeletonProposalDateTextStyles} />
          </Flex>
        </Flex>
      </GridItem>
    </>
  );
};

export default SSRProposalCard;
