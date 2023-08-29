import { BoxProps, FlexProps, TextProps } from "@chakra-ui/react";

export const $spaceCardBoxStyles: BoxProps = {
  width: { base: "165px", lg: "52" },
  height: { base: "40", lg: "48" },
  border: "1px",
  rounded: "xl",
  borderColor: "purple.200",
  bg: "black",
  shadow: "sm",
  transition: "all 0.2s ease-in-out",
  _hover: {
    shadow: "md",
    bg: "purple.900",
  },
};

export const $spaceCardFlexStyles: FlexProps = {
  h: "full",
  flexDir: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "2",
};

export const $spaceCardTypographyStyles: TextProps = {
  mt: "2",
  fontFamily: "grotesk",
  fontSize: "lg",
  textColor: "whiteAlpha.800",
};

export const $spaceCardEmptyBoxStyles: FlexProps = {
  h: { base: "40", lg: "48" },
  w: { base: "36", lg: "52" },
  rounded: "xl",
  bg: "whiteAlpha.200",
  shadow: "sm",
};
