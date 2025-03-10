import { FlexProps, GridProps } from "@chakra-ui/react";

export const $parentProposalFlexStyles: FlexProps = {
  mx: "auto",
  maxW: "4xl",
  justifyContent: "start",
  px: { base: "8", lg: "0" },
};

export const $contentFlexStyles: FlexProps = {
  direction: "column",
};


export const $gridContainerStyles: GridProps = {
  my: "5",
  gridTemplateColumns: { base: "1fr", lg: "repeat(3, 1fr)" },
  gap: "5",
  pb: "5",
  minW: { lg: "full" },
};
