import { Flex, Heading, LinkIconButton, HeadingTextGroup, Skeleton, Button } from "@/common";
import { ProfilePicture } from "@/components/media";
import { ArrowLeft } from "@/common/Icons";
import * as styles from "@/app/[space]/[id]/_components/ProposalDetails/styles";
import * as constants from "@/app/[space]/[id]/_components/ProposalDetails/constants";

const SSRProposalDetails = () => {
  return (
    <Flex {...styles.$proposalDetailsParentFlexStyles}>
      <Flex {...styles.$linkButtonFlexStyles}>
        <Button {...styles.$ssrLinkButtonStyles} isDisabled leftIcon={<ArrowLeft />}>
          {constants.BACK_TEXT}
        </Button>
      </Flex>
      <Flex {...styles.$proposalDetailsFlexStyles}>
        <Skeleton {...styles.$skeletonHeadingStyles} />
        <ProfilePicture {...styles.$profilePictureStyles} />
      </Flex>
      <Flex {...styles.$proposalDetailsInnerFlexStyles}>
        <HeadingTextGroup {...styles.$flexHeaderDescriptionGroupStyles}>
          <Heading {...styles.$headingStyles}>{constants.CREATED_BY_HEADER}</Heading>
          <Skeleton {...styles.$skeletonCreatedByTextStyles} />
        </HeadingTextGroup>
        <HeadingTextGroup {...styles.$flexHeaderDescriptionGroupStyles}>
          <Heading {...styles.$headingStyles}>{constants.DESCRIPTION_HEADER}</Heading>
          <Flex {...styles.$skeletonDescriptionFlexStyles}>
            <Skeleton {...styles.$skeletonDescriptionTextStyles} />
            <Skeleton {...styles.$skeletonDescriptionTextStyles2} />
            <Skeleton {...styles.$skeletonDescriptionTextStyles} />
            <Skeleton {...styles.$skeletonDescriptionTextStyles2} />
          </Flex>
        </HeadingTextGroup>
        <HeadingTextGroup {...styles.$flexHeaderDescriptionGroupStyles}>
          <Heading {...styles.$headingStyles}>{constants.VOTE_REQUIREMENTS_HEADER}</Heading>
          <Flex {...styles.$skeletonDescriptionFlexStyles}>
            <Skeleton {...styles.$skeletonVoteRequirementsTextStyles} />
            <Skeleton {...styles.$skeletonVoteRequirementsTextStyles} />
          </Flex>
        </HeadingTextGroup>
        <Flex {...styles.$timeFlexStyles}>
          <HeadingTextGroup {...styles.$flexHeaderDescriptionGroupStyles}>
            <Heading {...styles.$headingStyles}>{constants.VOTE_START_HEADER}</Heading>
            <Skeleton {...styles.$skeletonStartTimeTextStyles} />
          </HeadingTextGroup>
          <HeadingTextGroup {...styles.$flexHeaderDescriptionGroupStyles}>
            <Heading {...styles.$headingStyles}>{constants.VOTE_END_HEADER}</Heading>
            <Skeleton {...styles.$skeletonEndTimeTextStyles} />
          </HeadingTextGroup>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SSRProposalDetails;
