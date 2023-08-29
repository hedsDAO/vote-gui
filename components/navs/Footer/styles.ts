import { FlexProps, TextProps } from "@chakra-ui/react";

export const $footerFlexContainerStyles: FlexProps = {
  maxH: "12vh",
  minH: "12vh",
  w: { base: "full", lg: "100vw" },
  alignItems: "center",
  justifyContent: "space-between",
  bg: "black",
  px: { base: 6, lg: 10 },
  py: 2,
};

export const $textContainerFlexStyles: FlexProps = {
  ml: { base: -3, lg: -2 },
  flexDir: "row",
  alignItems: "center",
};

export const $descriptionFlexContainerStyles: FlexProps = {
  flexDir: "column",
  color: "white",
};

export const $textDescriptionStyles: TextProps = {
  fontSize: "0.65rem",
};

export const $linkIconContainerFlexStyles: FlexProps = {
  flexDir: "row",
  alignItems: "center",
  gap: 3.5,
};
