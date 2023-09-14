"use client";

import Link from "next/link";
import { Flex, Heading, HeadingTextGroup, LinkIconButton, Typography } from "@/common";
import { ArrowLeft, Discord, Instagram, Soundcloud, Twitter } from "@/common/Icons";
import { useAppSelector } from "@/store/hooks";
import Banner from "@/components/media/Banner/Banner";
import ProfilePicture from "@/components/media/ProfilePicture/ProfilePicture";
import CreateProposalButton from "@/components/buttons/CreateProposalButton/CreateProposalButton";
import SSRSpaceDetails from "@/app/[space]/_components/SpaceDetails/SSRSpaceDetails";
import * as constants from "@/app/[space]/_components/SpaceDetails/constants";
import * as styles from "@/app/[space]/_components/SpaceDetails/styles";

const SpaceDetails = ({ slug }: { slug: string }) => {
  const invertClassName = { className: "invert-0" };
  const spaceData = useAppSelector((store) => store.spaceReducer.spaceData);
  const socialMap = {
    twitter: <Twitter {...invertClassName} />,
    discord: <Discord {...invertClassName} />,
    instagram: <Instagram {...invertClassName} />,
    soundcloud: <Soundcloud {...invertClassName} />,
  };
  return (
    <>
      {spaceData?.name?.length ? (
        <>
          <Flex {...styles.$spaceDetailsParentFlexStyles}>
            <Banner src={spaceData?.banner} />
            <Flex {...styles.$spaceDetailsInnerFlexStyles}>
              {<ProfilePicture {...styles.$profilePictureStyles} src={spaceData?.image} />}
              <Flex {...styles.$linkButtonFlexStyles}>
                <LinkIconButton {...styles.$linkButtonStyles} link={constants.BACK_BUTTON_LINK} leftIcon={<ArrowLeft />}>
                  {constants.BACK_TEXT}
                </LinkIconButton>
                <Flex {...styles.$socialLinksAndTextFlexStyles}>
                  <HeadingTextGroup>
                    <Heading {...styles.$headingFlexStyles}>{spaceData?.name}</Heading>
                    <Typography {...styles.$typographyTextStyles}>{spaceData?.description}</Typography>
                  </HeadingTextGroup>
                  <Flex {...styles.$iconFlexContainerStyles}>
                    {spaceData &&
                      constants.gatherSocialLinks(spaceData).map((social, idx) => (
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
              <CreateProposalButton slug={slug} admins={spaceData?.authors} />
            </Flex>
          </Flex>
        </>
      ) : (
        <SSRSpaceDetails />
      )}
    </>
  );
};

export default SpaceDetails;
