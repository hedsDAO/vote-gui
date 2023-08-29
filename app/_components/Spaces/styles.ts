import { TextProps, FlexProps, BoxProps } from "@chakra-ui/react";

export const $spacesFlexContainer: FlexProps = {
  alignSelf: { base: "start", sm: "center", lg: "start" },
};

export const $spacesTypographyStyles: TextProps = {
  ml: { base: "4", lg: "2" },
  fontWeight: "bold",
  textColor: "whiteAlpha.800",
  letterSpacing: "wide",
  fontSize: "xl",
  rounded: "md",
  px: "1",
  fontFamily: "inter",
};

export const $spaceCardsFlexContainer: FlexProps = {
  justifyContent: "center",
  gap: { base: 3, lg: 4 },
  py: "6",
};

export const $hiddenSpaceCardsBoxStyles: BoxProps = {
  display: { base: "none", lg: "inline-block" },
};

export const $spacesParentFlexContainer: FlexProps = {
  mx: "auto",
  flexDir: "column",
  maxW: { lg: "4xl" },
  px: { lg: 5 },
  alignItems: { base: "center", lg: "start" },
};
