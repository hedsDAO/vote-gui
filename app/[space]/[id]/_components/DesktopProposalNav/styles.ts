import { BoxProps, ButtonProps, CheckboxProps, FlexProps, GridItemProps, TextProps } from "@chakra-ui/react";
import { GridListChoice } from "./constants";

export const $gridItemStyles = (isShowingVoters: boolean): GridItemProps => ({
  px: 1,
  alignItems: "center",
  minH: "40px",
  display: { base: "none", lg: "flex" },
  justifyContent: "space-between",
  colSpan: { base: 1, lg: isShowingVoters ? 4 : 5 },
});

export const $choicesTypographyStyles = (isShowingVoters: boolean): TextProps => ({
  fontSize: { lg: "lg" },
  letterSpacing: "wide",
  fontWeight: "semibold",
  textColor: { base: isShowingVoters ? "blackAlpha.400" : "blackAlpha.800", lg: "blackAlpha.800" },
  fontFamily: "grotesk",
  alignSelf: "start",
});

export const $resultsFlexStyles = (isShowingResults: boolean): FlexProps => ({
  opacity: isShowingResults ? 1 : 0.5,
  _hover: { opacity: 1 },
  transition: "all 0.3s ease-in-out",
  px: 3,
  py: 1,
  rounded: "full",
  gap: 2,
  alignItems: "center",
});

export const $showVotersFlexStyles = (isShowingVoters: boolean): FlexProps => ({
  opacity: isShowingVoters ? 1 : 0.5,
  _hover: { opacity: 1 },
  transition: "all 0.3s ease-in-out",
  px: 3,
  py: 1,
  rounded: "full",
  gap: 2,
  alignItems: "center",
});

export const $resultsCheckboxStyles: CheckboxProps = {
  colorScheme: "telegram",
  borderColor: "blackAlpha.600 !important",
  size: "sm",
};

export const $showVotersCheckboxStyles: CheckboxProps = {
  colorScheme: "telegram",
  borderColor: "blackAlpha.600 !important",
  size: "sm",
};

export const $resultsTypographyStyles = (isShowingResults: boolean): TextProps => ({
  fontSize: { base: "xs", lg: "xs" },
  letterSpacing: "wide",
  fontWeight: "semibold",
  textColor: isShowingResults ? "black" : "blackAlpha.700",
  fontFamily: "grotesk",
});

export const $showVotersTypographyStyles = (isShowingVoters: boolean): TextProps => ({
  fontSize: { base: "xs", lg: "xs" },
  letterSpacing: "wide",
  fontWeight: "semibold",
  textColor: isShowingVoters ? "black" : "blackAlpha.700",
  fontFamily: "grotesk",
});

export const $viewButtonsFlexStyles: FlexProps = {
  mx: { lg: 2 },
  px: 0.5,
  py: 0.5,
  gap: 1,
  rounded: "lg",
  alignItems: "center",
};

export const $gridButtonStyles = (currentView: "grid" | "list", setCurrentView: (arg: GridListChoice) => void): ButtonProps => ({
  background: currentView === "grid" ? "blackAlpha.200 !important" : "transparent !important",
  py: "1.5 !important",
  minH: "0 !important",
  h: "unset",
  size: "sm",
  onClick: () => setCurrentView("grid" as GridListChoice),
});

export const $listButtonStyles = (currentView: "grid" | "list", setCurrentView: (arg: GridListChoice) => void): ButtonProps => ({
  background: currentView === "list" ? "blackAlpha.200 !important" : "transparent !important",
  py: "1.5 !important",
  minH: "0 !important",
  h: "unset",
  size: "sm",
  onClick: () => setCurrentView("list" as GridListChoice),
});

export const $votersGridItemStyles: GridItemProps = {
  display: { base: "none", lg: "flex" },
  colSpan: { base: 1, lg: 1 },
};

export const $votersTypographyStyles: TextProps = {
  fontSize: "lg",
  letterSpacing: "wide",
  fontWeight: "semibold",
  textColor: "blackAlpha.800",
  fontFamily: "grotesk",
  alignSelf: "start",
};

export const $boxDividerStyles: BoxProps = {
  w: "1px",
  h: "16px",
  bg: "blackAlpha.400",
};

export const $defaultFlexStyles: FlexProps = {
  gap: 3,
  alignItems: "center",
};

export const $voterGridParentFlexStyles: FlexProps = {
  w: "full",
  alignSelf: "center",
};
export const $voterGridChildFlexStyles: FlexProps = {
  w: "full",
  justifyContent: "space-between",
  alignItems: "center",
  direction: "row",
};

export const $voteButtonStyles: ButtonProps = {
  alignItems: "center",
  rounded: "md",
  gap: 2,
  px: "3!important",
  minH: "24.5px",
  maxH: "24.5px",
  bg: "green.500 !important",
  _hover: { bg: "green.600 !important" },
};

export const $voteTextStyles: TextProps = {
  letterSpacing: "wider",
  textColor: "white",
  mt: "1px",
  fontFamily: "grotesk",
  fontSize: "0.75rem",
};

export const $parentVoteFlexStyles: FlexProps = {
  mx: 2,
  gap: 3.5,
  alignItems: "center",
};

export const $votingPowerButtonStyles: ButtonProps = {
  alignItems: "center",
  rounded: "md",
  gap: 2,
  pl: "3 !important",
  pr: "0 !important",
  bg: "blackAlpha.200 !important",
  minH: "24.5px",
  maxH: "24.5px",
  _hover: { bg: "blackAlpha.300 !important" },
};

export const $votingPowerTextStyles: TextProps = {
  letterSpacing: "wider",
  textColor: "blackAlpha.700",
  mt: "1px",
  fontFamily: "grotesk",
  fontSize: "0.75rem",
};

export const $infoIconFlexStyles: FlexProps = {
  px: 2,
  roundedRight: "md",
  minH: "24.5px",
  maxH: "24.5px",
  bg: "blackAlpha.200",
};
