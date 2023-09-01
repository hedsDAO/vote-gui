import { Flex, Heading, LinkIconButton, Typography, HeadingTextGroup } from "@/common";
import { createClient } from "hedsvote";
import { store } from "@/store";
import { setProposal } from "@/store/proposal";
import * as styles from "@/app/[space]/[id]/_components/ProposalDetails/styles";
import * as constants from "@/app/[space]/[id]/_components/ProposalDetails/constants";
import ProfilePicture from "@/components/media/ProfilePicture/ProfilePicture";
import { ArrowLeft } from "@/common/Icons";

const { getAllProposalsInSpace } = createClient();

async function getProposalData(space: string, id: string) {
  const allProposals = await getAllProposalsInSpace(space);
  const proposalData = allProposals.data.find((proposal) => proposal?.ipfs_hash === id);
  return proposalData;
}

const ProposalDetails = async ({ slug, id }: { slug: string; id: string }) => {
  const stateProposalDataExists = store.getState().proposal?.proposal?.ipfs_hash?.length;
  let proposal = await getProposalData(slug, id);

  if (proposal && !stateProposalDataExists) {
    store.dispatch(setProposal(proposal));
  }

  return (
    <Flex {...styles.$proposalDetailsParentFlexStyles}>
      <Flex {...styles.$linkButtonFlexStyles}>
        <LinkIconButton {...styles.$linkButtonStyles} link={constants.BACK_BUTTON_LINK} leftIcon={<ArrowLeft />}>
          {constants.BACK_TEXT}
        </LinkIconButton>
      </Flex>
      <Flex {...styles.$proposalDetailsFlexStyles}>
        <Heading {...styles.$titleStyles}>{proposal?.title}</Heading>
        <ProfilePicture src={proposal?.cover} />
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
  );
};

export default ProposalDetails;
