import {
  FlexProps,
  TextProps,
  BadgeProps,
  AvatarProps,
  AvatarGroupProps,
} from "@chakra-ui/react";

export const $headerFlexContainer: FlexProps = {
  maxW: "6xl",
  mx: "auto",
  flexDir: "column",
  alignItems: "center",
  justifyContent: "center",
  
  gap: { base: 3, lg: 0 },
  pb: { base: 10, lg: 16 },
  pt: { base: 10, lg: 12 },
};

export const $typographyAndBadgeFlexContainer: FlexProps = {
  alignItems: "center",
  gap: 6,
  mb: {lg: -5},
};

export const $typographyAndAvatarFlexContainer: FlexProps = {
  flexDir: { base: "column", lg: "row" },
  alignItems: "center",
  mt: 2,
  gap: { base: 6, lg: 8 },
};

export const $typographyStyles: TextProps = {
  color: "white",
  fontWeight: "bold",
  fontFamily: "inter",
  fontSize: { base: "5xl", lg: "8xl" },
};

export const $badgeStyles: BadgeProps = {
  bg: "transparent",
  textColor: "white",
  fontFamily: "grotesk",
  opacity: 0.8,
  display: { base: "none", lg: "inline-block" },
  px: 3.5,
  py: 0.5,
  fontWeight: "medium",
  textTransform: "lowercase",
  fontSize: { base: "xs", lg: "sm" },
  shadow: "md",
  rounded: "full",
  border: "1px",
  borderColor: "white",
};

export const $avatarStyles = (src: string): AvatarProps => ({
  src: src,
  bg: 'black',
  shadow: "md",
  width: { base: 65, lg: 75 },
  height: { base: 65, lg: 75 },
});

export const $avatarGroupStyles: Partial<AvatarGroupProps> = {
  alignItems: "center",
  spacing: { base: "-3", lg: "-5" },
};

export const $descriptionFlexStyles: FlexProps = {
  ml: "auto",
  justifySelf: "end",
  mr: { lg: "-10" },
};

export const $descriptionTypographyStyles: TextProps = {
  maxW: "md",
  overflow: "auto",
  px: 14,
  textAlign: { base: "center", lg: "right" },
  textColor: "whiteAlpha.800",
  fontFamily: "grotesk",
  fontSize: { base: "xs", lg: "sm" },
};
