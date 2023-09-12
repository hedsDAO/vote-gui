import { FlexProps, GridItemProps, GridProps } from "@chakra-ui/react";

export const $proposalChoicesParentFlexStyles: FlexProps = {
  direction: "column",
  pb: 32,
  px: 6,
  borderTop: "1px",
  borderColor: "blackAlpha.300",
};

export const $ssrProposalNavbarCardsGridStyles: GridProps = {
  gap: { base: 2, lg: 5 },
  mt: 6,
  gridTemplateColumns: { base: "1fr", lg: "repeat(5, 1fr)" },
};

export const $proposalChoicesGridItemStyles = (isShowingVoters: boolean): GridItemProps => ({
  display: { base: isShowingVoters ? "none" : "flex", lg: "flex" },
  colSpan: { base: 1, lg: isShowingVoters ? 4 : 5 },
  alignSelf: "start",
});

export const $proposalContentGridStyles = (currentView: "list" | "grid"): GridProps => ({
  gap: currentView === "list" ? 2 : 2,
  minW: "full",
  gridTemplateColumns:
    currentView === "list" ? "1fr" : { base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)", xl: "repeat(4, 1fr)" },
});
