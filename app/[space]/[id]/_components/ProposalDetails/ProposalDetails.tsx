import { Flex, Heading, LinkIconButton, Typography, HeadingTextGroup, Box } from "@/common";
import { createClient } from "hedsvote";
import { store } from "@/store";
import { setProposal, setVoteParticipants } from "@/store/proposal";
import * as styles from "@/app/[space]/[id]/_components/ProposalDetails/styles";
import * as constants from "@/app/[space]/[id]/_components/ProposalDetails/constants";
import ProfilePicture from "@/components/media/ProfilePicture/ProfilePicture";
import { ArrowLeft } from "@/common/Icons";
import { getParticipantsUserData } from "@/utils/getParticipantsUserData";
import { isEmpty } from "lodash";

const { getProposal } = createClient();

async function getProposalData(id: string) {
  const allProposals = await getProposal(id);
  const proposalData = allProposals.data;
  return proposalData;
}

const ProposalDetails = async ({ slug, id }: { slug: string; id: string }) => {
  const stateProposalData = store.getState().proposal.proposal;
  const stateProposalDataExists = stateProposalData?.ipfs_hash?.length;
  // const stateVoterDataExists = store.getState().proposal?.voteParticipants;
  // const stateVoterData = store.getState().proposal?.voteParticipants;
  if (!stateProposalDataExists) {
    const proposal = await getProposalData(id);
    store.dispatch(setProposal(proposal));
  } else if (stateProposalData.ipfs_hash !== id) {
    const proposal = await getProposalData(id);
    store.dispatch(setProposal(proposal));
  }
  // const voterUserData = await getParticipantsUserData(proposal.votes);
  // if (voterUserData && isEmpty(stateVoterData) && !stateVoterDataExists) {
  //   store.dispatch(setVoteParticipants(voterUserData))
  // }

  return (
    <Flex {...styles.$proposalDetailsParentFlexStyles}>
      <Box {...styles.$bgOverlayBoxStyles(stateProposalData?.cover)}/>
      <Flex {...styles.$linkButtonFlexStyles}>
        <LinkIconButton {...styles.$linkButtonStyles} link={constants.BACK_BUTTON_LINK(slug)} leftIcon={<ArrowLeft />}>
          {constants.BACK_TEXT}
        </LinkIconButton>
      </Flex>
      <Flex {...styles.$proposalDetailsFlexStyles}>
        <Heading {...styles.$titleStyles}>{stateProposalData?.title}</Heading>
        <ProfilePicture {...styles.$profilePictureStyles}  src={stateProposalData?.cover} />
      </Flex>
      <Flex {...styles.$proposalDetailsInnerFlexStyles}>
        <HeadingTextGroup {...styles.$flexHeaderDescriptionGroupStyles}>
          <Heading {...styles.$headingStyles}>{constants.CREATED_BY_HEADER}</Heading>
          <Typography {...styles.$typographyStyles}>{stateProposalData?.author}</Typography>
        </HeadingTextGroup>
        <HeadingTextGroup {...styles.$flexHeaderDescriptionGroupStyles}>
          <Heading {...styles.$headingStyles}>{constants.DESCRIPTION_HEADER}</Heading>
          <Typography {...styles.$descriptionTypographyStyles}>{stateProposalData?.description}</Typography>
        </HeadingTextGroup>
        <HeadingTextGroup {...styles.$flexHeaderDescriptionGroupStyles}>
          <Heading {...styles.$headingStyles}>{constants.VOTE_REQUIREMENTS_HEADER}</Heading>
          <Typography {...styles.$voteRequirementsTypographyStyles}>{constants.VOTE_REQUIREMENTS}</Typography>
        </HeadingTextGroup>
        <Flex {...styles.$timeFlexStyles}>
          <HeadingTextGroup {...styles.$flexHeaderDescriptionGroupStyles}>
            <Heading {...styles.$headingStyles}>{constants.VOTE_START_HEADER}</Heading>
            <Typography {...styles.$typographyStyles}>{`${stateProposalData?.start_time}`}</Typography>
          </HeadingTextGroup>
          <HeadingTextGroup {...styles.$flexHeaderDescriptionGroupStyles}>
            <Heading {...styles.$headingStyles}>{constants.VOTE_END_HEADER}</Heading>
            <Typography {...styles.$typographyStyles}>{`${stateProposalData?.end_time}`}</Typography>
          </HeadingTextGroup>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ProposalDetails;
