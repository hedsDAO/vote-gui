import Banner from "@/components/media/Banner/Banner";
import ProfilePicture from "@/components/media/ProfilePicture/ProfilePicture";
import { Flex, HeadingTextGroup, LinkIconButton, Skeleton, Typography } from "@/common";
import { ArrowLeft, Discord, Instagram, Soundcloud, Twitter } from "@/common/Icons";
import * as constants from "@/app/[space]/_components/SpaceDetails/constants";
import * as styles from "@/app/[space]/_components/SpaceDetails/styles";

const SSRSpaceDetails = () => {
  const invertClassName = { className: "invert-0" };
  return (
    <>
      <Flex {...styles.$spaceDetailsParentFlexStyles}>
        <Banner />
        <Flex {...styles.$spaceDetailsInnerFlexStyles}>
          <ProfilePicture {...styles.$profilePictureStyles} />
          <Flex {...styles.$linkButtonFlexStyles}>
            <LinkIconButton {...styles.$linkButtonStyles} link={constants.BACK_BUTTON_LINK} leftIcon={<ArrowLeft />}>
              {constants.BACK_TEXT}
            </LinkIconButton>
            <Flex {...styles.$socialLinksAndTextFlexStyles}>
              <HeadingTextGroup>
                <Skeleton {...styles.$skeletonHeadingStyles} />
                <Flex {...styles.$skeletonFlexStyles}>
                  <Skeleton {...styles.$skeletonTypographyTextStyles} />
                  <Skeleton {...styles.$skeletonTypographyTextStyles2} />
                </Flex>
              </HeadingTextGroup>
              <Flex {...styles.$iconFlexContainerStyles}>
                <Skeleton fitContent {...styles.$iconSkeletonStyles}>
                  <Twitter {...invertClassName} />
                </Skeleton>
                <Skeleton fitContent {...styles.$iconSkeletonStyles}>
                  <Discord {...invertClassName} />
                </Skeleton>
                <Skeleton fitContent {...styles.$iconSkeletonStyles}>
                  <Instagram {...invertClassName} />
                </Skeleton>
                <Skeleton fitContent {...styles.$iconSkeletonStyles}>
                  <Soundcloud {...invertClassName} />
                </Skeleton>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex {...styles.$parentSpaceNavbarFlexStyles}>
        <Flex {...styles.$parentFlexStyles}>
          <Typography {...styles.$proposalHeaderTextStyles} opacity={0.7}>
            {constants.PROPOSAL_HEADER_TEXT}
          </Typography>
        </Flex>
      </Flex>
    </>
  );
};

export default SSRSpaceDetails;
