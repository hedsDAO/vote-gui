import { Avatar, Box, Flex, GridItem, Typography } from "@/common";
import { getVotingStatus } from "@/utils/getVotingStatus";
import * as styles from "@/components/cards/ProposalCard/styles";
import * as constants from "@/components/cards/ProposalCard/constants";

const ProposalCard = (proposal: any) => {
  const votingStatus = getVotingStatus(proposal?.start_time, proposal?.end_time);
  return (
    <GridItem {...styles.$gridItemStyles}>
      <Flex {...styles.$badgeFlexContainerStyles}>
        <Box {...styles.$proposalStatusBadgeStyles(votingStatus)} />
        <Typography {...styles.$votingStatusTextStyles}>{votingStatus}</Typography>
      </Flex>
      <Box {...styles.$avatarBoxStyles}>
        <Avatar src={proposal?.cover} {...styles.$avatarImageStyles} />
      </Box>
      <Flex {...styles.$textFlexContainerStyles}>
        <Typography {...styles.$proposalTitleTextStyles}>{proposal?.title}</Typography>
        <Typography {...styles.$proposalTimelineTextStyles}>
          {constants.calculateVotingStatusText(votingStatus)}
        </Typography>
        <Typography {...styles.$proposalDateTextStyles}>{new Date(proposal?.end_time).toLocaleDateString()}</Typography>
      </Flex>
    </GridItem>
  );
};

export default ProposalCard;
