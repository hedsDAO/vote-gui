import { ButtonProps, FlexProps, SkeletonProps, TextProps } from "@chakra-ui/react";

export const $spaceDetailsParentFlexStyles: FlexProps = {
  direction: "column",
};

export const $spaceDetailsInnerFlexStyles: FlexProps = {
  direction: "column",
  gap: 4,
  minW: { lg: "4xl" },
  mx: { lg: "auto" },
  pb: 4,
  mr: { base: 4, lg: "auto" },
};

export const $linkButtonStyles: ButtonProps = {
  ml: { lg: "-8" },
  _hover: { bg: "transparent", textColor: "black" },
  size: "sm",
  transition: "all 0.2s ease-in-out",
  textColor: "blackAlpha.800",
  gap: 2,
  fontSize: "base",
  fontWeight: "normal",
  fontFamily: "grotesk",
  px: 0,
  py: 0,
};

export const $profilePictureStyles = {
  alignSelf: "end",
  mt: "-12",
  shadow: "sm",
};

export const $linkButtonFlexStyles: FlexProps = {
  direction: "column",
  mt: { base: "-90px", lg: "-32" },
  gap: 4,
  px: { base: 6, lg: 0 },
};

export const $socialLinksAndTextFlexStyles: FlexProps = {
  direction: "column",
  pt: { base: 10, lg: 5 },
  gap: 4,
  px: { base: 3, lg: 0 },
};

export const $headingFlexStyles: TextProps = {
  fontFamily: "grotesk",
  fontWeight: "normal",
  ml: "-0.5",
};

export const $skeletonHeadingStyles: TextProps = {
  fontFamily: "grotesk",
  fontWeight: "normal",
  ml: "-0.5",
  mt: 1,
  maxW: "7ch",
  minH: "4ch",
  minW: "7ch",
};

export const $skeletonFlexStyles: FlexProps = {
  direction: "column",
  gap: 1,
};

export const $typographyTextStyles: TextProps = {
  fontFamily: "grotesk",
  letterSpacing: "tight",
  fontSize: { base: "sm", lg: "base" },
  maxW: { lg: "75%" },
  textColor: "blackAlpha.700",
};

export const $skeletonTypographyTextStyles: TextProps = {
  minH: "1.75ch",
  minW: "7ch",
  fontFamily: "grotesk",
  letterSpacing: "tight",
  fontSize: { base: "sm", lg: "base" },
  maxW: { lg: "75%" },
  textColor: "blackAlpha.700",
};

export const $skeletonTypographyTextStyles2: TextProps = {
  fontFamily: "grotesk",
  letterSpacing: "tight",
  fontSize: { base: "sm", lg: "base" },
  maxW: { lg: "75%" },
  textColor: "blackAlpha.700",
  minH: { base: "1.75ch", lg: "0" },
  minW: { base: "7ch", lg: "0" },
};

export const $iconFlexContainerStyles: FlexProps = {
  alignItems: "center",
  opacity: 0.8,
  gap: 1.5,
};

export const $proposalHeaderTextStyles: TextProps = {
  fontFamily: "inter",
  fontSize: "xl",
  fontWeight: "semibold",
  textColor: "blackAlpha.800",
  letterSpacing: "wide",
};

export const $parentFlexStyles: FlexProps = {
  mt: 12,
  mb: 4,
  px: { base: 8, lg: 0 },
  w: "full",
  alignItems: "center",
  justifyContent: "space-between",
};

export const $parentSpaceNavbarFlexStyles: FlexProps = {
  w: "full",
  mx: "auto",
  justifyContent: "start",
  maxW: "4xl",
  minH: "60px",
  maxH: "60px",
};

export const $iconSkeletonStyles: SkeletonProps = {
  minH: "1.75ch",
  maxH: "1.75ch",
  maxW: "1.75ch",
  minW: "1.75ch",
};
