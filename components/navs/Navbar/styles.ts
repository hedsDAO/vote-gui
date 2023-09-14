import { FlexProps, TextProps } from "@chakra-ui/react";

export const $navbarFlexContainerStyles: FlexProps = {
  maxH: "7vh",
  minH: "7vh",
  w: { base: "full", lg: "100vw" },
  alignItems: "center",
  justifyContent: "space-between",
  bg: "heds.bg",
  px: { base: 5, lg: 7 },
  py: 5,
};

export const $brandTextStyles: TextProps = {
  pl: 2.5,
  fontFamily: "grotesk",
  fontWeight: "medium",
  letterSpacing: "wider",
  color: "white",
  _hover: {
    color: "whiteAlpha.800",
  },
  fontSize: { lg: "lg" },
};
