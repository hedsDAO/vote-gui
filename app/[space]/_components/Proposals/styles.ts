import { FlexProps, GridProps, TextProps } from "@chakra-ui/react";

export const $parentProposalFlexStyles: FlexProps = {
  mx: "auto",
  mt: "10",
  maxW: "4xl",
  justifyContent: "start",
  px: { base: "8", lg: "0" },
};

export const $contentFlexStyles: FlexProps = {
  direction: "column",
};

export const $proposalHeaderTextStyles: TextProps = {
  fontFamily: "inter",
  fontSize: "xl",
  fontWeight: "semibold",
  textColor: "blackAlpha.800",
  letterSpacing: "wide",
};

export const $gridContainerStyles: GridProps = {
  my: "5",
  gridTemplateColumns: { base: "1fr", lg: "repeat(3, 1fr)" },
  gap: "4",
  pb: "5",
  minW: { lg: "full" },
};
