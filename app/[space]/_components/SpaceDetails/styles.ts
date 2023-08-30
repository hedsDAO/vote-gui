import { ButtonProps, FlexProps, TextProps } from "@chakra-ui/react";

export const $spaceDetailsParentFlexStyles: FlexProps = {
  direction: "column",
};

export const $spaceDetailsInnerFlexStyles: FlexProps = {
  direction: "column",
  gap: 4,
  minW: { lg: "4xl" },
  mx: "auto",
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

export const $typographyTextStyles: TextProps = {
  fontFamily: "grotesk",
  letterSpacing: "tight",
  fontSize: { base: "sm", lg: "base" },
  maxW: { lg: "75%" },
  textColor: "blackAlpha.700",
};

export const $iconFlexContainerStyles: FlexProps = {
  alignItems: "center",
  opacity: 0.8,
  gap: 1.5,
};
