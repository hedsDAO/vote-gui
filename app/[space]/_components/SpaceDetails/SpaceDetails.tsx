import { createClient } from "hedsvote";
import Link from "next/link";
import Banner from "@/components/media/Banner/Banner";
import ProfilePicture from "@/components/media/ProfilePicture/ProfilePicture";
import { Flex, Heading, HeadingTextGroup, LinkIconButton, Skeleton, Typography } from "@/common";
import { ArrowLeft, Discord, Instagram, Soundcloud, Twitter } from "@/common/Icons";
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
  const space = await getSpaceData(slug);
  const socialMap = {
    twitter: <Twitter {...invertClassName} />,
    discord: <Discord {...invertClassName} />,
    instagram: <Instagram {...invertClassName} />,
    soundcloud: <Soundcloud {...invertClassName} />,
  };
  return (
    <Flex {...styles.$spaceDetailsParentFlexStyles}>
      <Banner src={space?.banner} />
      <Flex {...styles.$spaceDetailsInnerFlexStyles}>
        <ProfilePicture {...styles.$profilePictureStyles} src={space?.image} />
        <Flex {...styles.$linkButtonFlexStyles}>
            <LinkIconButton {...styles.$linkButtonStyles} link={constants.BACK_BUTTON_LINK} leftIcon={<ArrowLeft />}>
              {constants.BACK_TEXT}
            </LinkIconButton>
          <Flex {...styles.$socialLinksAndTextFlexStyles}>
            <HeadingTextGroup>
              <Heading {...styles.$headingFlexStyles}>{space?.name}</Heading>
              <Typography {...styles.$typographyTextStyles}>{space?.description}</Typography>
            </HeadingTextGroup>
            <Flex {...styles.$iconFlexContainerStyles}>
              {space &&
                constants.gatherSocialLinks(space).map((social, idx) => (
                  <Link key={social?.name + idx} href={social.url} target={constants.URL_TARGET}>
                    {socialMap[social.name]}
                  </Link>
                ))}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SpaceDetails;
