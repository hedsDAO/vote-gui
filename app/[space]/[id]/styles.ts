import { FlexProps, GridProps } from "@chakra-ui/react";

export const $proposalParentFlexStyles: FlexProps = {
  direction: "column",
  minH: "81vh",
};

export const $proposalGridStyles: GridProps = {
  gap: { lg: 5 },
  px: 8,
  mb: 6,
  gridTemplateColumns: { base: "1fr", lg: "repeat(5, 1fr)" },
};
