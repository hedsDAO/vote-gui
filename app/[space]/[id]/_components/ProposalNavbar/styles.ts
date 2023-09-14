import { BoxProps, FlexProps, GridProps, SkeletonProps } from "@chakra-ui/react";

export const $proposalNavbarParentFlexStyles: FlexProps = {
  direction: "column",
  px: 8,
  pb: 7,
  borderTop: "1px",
  borderColor: "blackAlpha.300",
};

export const $proposalNavbarBoxStyles: BoxProps = {
  my: 3,
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

export const $proposalNavbarSkeleton1Styles: SkeletonProps = {
  minW: "12ch",
  minH: "25px",
};

export const $proposalNavbarSkeleton2Styles: SkeletonProps = {
  minW: "30px",
  minH: "25px",
};

export const $ssrProposalNavbarFlexStyles: FlexProps = {
  pr: { lg: 4 },
  justifyContent: "space-between",
};
