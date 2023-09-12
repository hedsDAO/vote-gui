"use client";

import { useAppSelector } from "@/store/hooks";

import SSRProposalDetails from "@/app/[space]/[id]/_components/ProposalDetails/SSRProposalDetails";
import { Box, Flex, Heading, HeadingTextGroup, LinkIconButton, Typography } from "@/common";
import { ProfilePicture } from "@/components/media";
import { ArrowLeft } from "@/common/Icons";
import * as constants from "@/app/[space]/[id]/_components/ProposalDetails/constants";
import * as styles from "@/app/[space]/[id]/_components/ProposalDetails/styles";

/**
 * @const {JSX.Element} ProposalDetails
 * @description This component is responsible for rendering the proposal
 * title, description, image, times and other related information.
 * @returns {JSX.Element} The proposal details component.
 */

const ProposalDetails = () => {
  const slug = useAppSelector((state) => state.spaceReducer.spaceData.name);
  const proposal = useAppSelector((state) => state.proposal.proposal);
  return (
    <>
      {proposal ? (
        <Flex {...styles.$proposalDetailsParentFlexStyles}>
          <Box {...styles.$bgOverlayBoxStyles(proposal?.cover)} />
          <Flex {...styles.$linkButtonFlexStyles}>
            <LinkIconButton {...styles.$linkButtonStyles} link={constants.BACK_BUTTON_LINK(slug)} leftIcon={<ArrowLeft />}>
              {constants.BACK_TEXT}
            </LinkIconButton>
          </Flex>
          <Flex {...styles.$proposalDetailsFlexStyles}>
            <Heading {...styles.$titleStyles}>{proposal?.title}</Heading>
            <ProfilePicture {...styles.$profilePictureStyles} src={proposal?.cover} />
          </Flex>
          <Flex {...styles.$proposalDetailsInnerFlexStyles}>
            <HeadingTextGroup {...styles.$flexHeaderDescriptionGroupStyles}>
              <Heading {...styles.$headingStyles}>{constants.CREATED_BY_HEADER}</Heading>
              <Typography {...styles.$typographyStyles}>{proposal?.author}</Typography>
            </HeadingTextGroup>
            <HeadingTextGroup {...styles.$flexHeaderDescriptionGroupStyles}>
              <Heading {...styles.$headingStyles}>{constants.DESCRIPTION_HEADER}</Heading>
              <Typography {...styles.$descriptionTypographyStyles}>{proposal?.description}</Typography>
            </HeadingTextGroup>
            <HeadingTextGroup {...styles.$flexHeaderDescriptionGroupStyles}>
              <Heading {...styles.$headingStyles}>{constants.VOTE_REQUIREMENTS_HEADER}</Heading>
              <Typography {...styles.$voteRequirementsTypographyStyles}>{constants.VOTE_REQUIREMENTS}</Typography>
            </HeadingTextGroup>
            <Flex {...styles.$timeFlexStyles}>
              <HeadingTextGroup {...styles.$flexHeaderDescriptionGroupStyles}>
                <Heading {...styles.$headingStyles}>{constants.VOTE_START_HEADER}</Heading>
                <Typography {...styles.$typographyStyles}>{`${proposal?.start_time}`}</Typography>
              </HeadingTextGroup>
              <HeadingTextGroup {...styles.$flexHeaderDescriptionGroupStyles}>
                <Heading {...styles.$headingStyles}>{constants.VOTE_END_HEADER}</Heading>
                <Typography {...styles.$typographyStyles}>{`${proposal?.end_time}`}</Typography>
              </HeadingTextGroup>
            </Flex>
          </Flex>
        </Flex>
      ) : (
        <SSRProposalDetails />
      )}
    </>
  );
};

export default ProposalDetails;
