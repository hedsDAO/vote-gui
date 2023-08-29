import { Typography, Badge, Flex, AvatarGroup, Avatar } from "@/common";
import * as styles from "@/app/_components/Header/styles";
import * as constants from "@/app/_components/Header/constants";

const Header = () => {
  return (
    <Flex {...styles.$headerFlexContainer}>
      <Flex {...styles.$typographyAndBadgeFlexContainer}>
        <Typography {...styles.$typographyStyles}>
          {constants.HEADER_ONE_TEXT}
        </Typography>
        <Badge {...styles.$badgeStyles}>{constants.BADGE_TEXT}</Badge>
      </Flex>
      <Flex {...styles.$typographyAndAvatarFlexContainer}>
        <AvatarGroup {...styles.$avatarGroupStyles}>
          {constants.IMAGE_LINKS.map((src) => (
            <Avatar key={src} {...styles.$avatarStyles(src)} />
          ))}
        </AvatarGroup>
        <Typography {...styles.$typographyStyles}>
          {constants.HEADER_TWO_TEXT}
        </Typography>
      </Flex>
      <Flex {...styles.$descriptionFlexStyles}>
        <Typography {...styles.$descriptionTypographyStyles}>
          {constants.DESCRIPTION_TEXT}
        </Typography>
      </Flex>
    </Flex>
  );
};

export default Header;
