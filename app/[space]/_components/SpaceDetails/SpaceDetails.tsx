import Link from "next/link";
import { createClient } from "hedsvote";
import { setSpaceData } from "@/store/space";
import { store } from "@/store";
import { Flex, Heading, HeadingTextGroup, LinkIconButton, Typography } from "@/common";
import { ArrowLeft, Discord, Instagram, Soundcloud, Twitter } from "@/common/Icons";
import Banner from "@/components/media/Banner/Banner";
import ProfilePicture from "@/components/media/ProfilePicture/ProfilePicture";
import CreateProposalButton from "@/components/buttons/CreateProposalButton/CreateProposalButton";
import * as constants from "@/app/[space]/_components/SpaceDetails/constants";
import * as styles from "@/app/[space]/_components/SpaceDetails/styles";

const { getAllSpaces } = createClient();

async function getSpaceData(name: string) {
  const spaces = await getAllSpaces();
  const spaceData = spaces.data.find((space) => space.name === name);
  return spaceData;
}

const SpaceDetails = async ({ slug }: { slug: string }) => {
  const invertClassName = { className: "invert-0" };
  const stateSpaceData = store.getState().spaceReducer.spaceData;
  const stateSpaceDataExists = store.getState().spaceReducer.spaceData.authors.length;

  if (!stateSpaceDataExists) {
    const space = await getSpaceData(slug);
    if (!space) return;
    store.dispatch(setSpaceData(space));
    return;
  } else if (stateSpaceData.name !== slug) {
    const space = await getSpaceData(slug);
    if (!space) return;
    store.dispatch(setSpaceData(space));
    return;
  }

  const socialMap = {
    twitter: <Twitter {...invertClassName} />,
    discord: <Discord {...invertClassName} />,
    instagram: <Instagram {...invertClassName} />,
    soundcloud: <Soundcloud {...invertClassName} />,
  };
  return (
    <>
      <Flex {...styles.$spaceDetailsParentFlexStyles}>
        <Banner src={stateSpaceData?.banner} />
        <Flex {...styles.$spaceDetailsInnerFlexStyles}>
          {<ProfilePicture {...styles.$profilePictureStyles} src={stateSpaceData?.image} />}
          <Flex {...styles.$linkButtonFlexStyles}>
            <LinkIconButton {...styles.$linkButtonStyles} link={constants.BACK_BUTTON_LINK} leftIcon={<ArrowLeft />}>
              {constants.BACK_TEXT}
            </LinkIconButton>
            <Flex {...styles.$socialLinksAndTextFlexStyles}>
              <HeadingTextGroup>
                <Heading {...styles.$headingFlexStyles}>{stateSpaceData?.name}</Heading>
                <Typography {...styles.$typographyTextStyles}>{stateSpaceData?.description}</Typography>
              </HeadingTextGroup>
              <Flex {...styles.$iconFlexContainerStyles}>
                {stateSpaceData &&
                  constants.gatherSocialLinks(stateSpaceData).map((social, idx) => (
                    <Link key={social?.name + idx} href={social.url} target={constants.URL_TARGET}>
                      {socialMap[social.name]}
                    </Link>
                  ))}
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex {...styles.$parentSpaceNavbarFlexStyles}>
        <Flex {...styles.$parentFlexStyles}>
          <Typography {...styles.$proposalHeaderTextStyles}>{constants.PROPOSAL_HEADER_TEXT}</Typography>
          <CreateProposalButton slug={slug} admins={stateSpaceData?.authors} />
        </Flex>
      </Flex>
    </>
  );
};

export default SpaceDetails;
