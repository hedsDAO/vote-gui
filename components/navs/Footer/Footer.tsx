import Link from "next/link";
import { Flex, Typography } from "@/common";
import { Discord, Heds, Instagram, Soundcloud, Twitter } from "@/common/Icons";
import * as constants from "@/components/navs/Footer/constants";
import * as styles from "@/components/navs/Footer/styles";

const Footer = () => {
  return (
    <Flex {...styles.$footerFlexContainerStyles}>
      <Flex {...styles.$textContainerFlexStyles}>
        <Heds />
        <Flex {...styles.$descriptionFlexContainerStyles}>
          <Typography {...styles.$textDescriptionStyles}>
            {constants.COPYRIGHT_TEXT}
          </Typography>
          <Typography {...styles.$textDescriptionStyles}>
            {constants.COPYRIGHT_DESC}
          </Typography>
        </Flex>
      </Flex>
      <Flex {...styles.$linkIconContainerFlexStyles}>
        <Link href={constants.TWITTER_LINK} target="_blank">
          <Twitter />
        </Link>
        <Link href={constants.DISCORD_LINK} target="_blank">
          <Discord />
        </Link>
        <Link href={constants.INSTAGRAM_LINK} target="_blank">
          <Instagram />
        </Link>
        <Link href={constants.SOUNDCLOUD_LINK} target="_blank">
          <Soundcloud />
        </Link>
      </Flex>
    </Flex>
  );
};

export default Footer;
