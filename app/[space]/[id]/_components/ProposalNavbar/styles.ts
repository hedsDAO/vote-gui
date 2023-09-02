import { BoxProps, FlexProps, GridProps } from "@chakra-ui/react";

export const $proposalNavbarParentFlexStyles: FlexProps = {
  direction: "column",
  pb: 32,
  px: 8,
  borderTop: '1px',
  borderColor: 'blackAlpha.300'
};

export const $proposalNavbarBoxStyles: BoxProps = {
  my: 4,
  w: "full",
  bg: "blackAlpha.200",
};

export const $navbarGridStyles: GridProps = {
  gap: 5,
  gridTemplateColumns: { base: "1fr", lg: "repeat(5, 1fr)" },
};

export const $proposalNavbarCardsGridStyles: GridProps = {
  gap: { lg: 5 },
  mt: 6,
  gridTemplateColumns: { base: "1fr", lg: "repeat(5, 1fr)" },
};
