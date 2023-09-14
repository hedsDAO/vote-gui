import { GridItemProps, GridProps } from "@chakra-ui/react";

export const $proposalVotersGridItemStyles = (isShowingVoters: boolean): GridItemProps => ({
  display: isShowingVoters ? "flex" : "none",
  colSpan: 1,
  alignSelf: "start",
});

export const $proposalVotersGridStyles: GridProps = {
  gap: 2,
  minW: "full",
  gridTemplateColumns: { base: "1fr", lg: "repeat(1, 1fr)" },
};
