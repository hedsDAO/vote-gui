import { BoxProps, ButtonProps, CheckboxProps, FlexProps, GridItemProps, TextProps } from "@chakra-ui/react";
import { GridListChoice } from "./constants";

export const $gridItemStyles = (isShowingVoters: boolean): GridItemProps => ({
  px: 1,
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
  size: "sm",
};

export const $showVotersCheckboxStyles: CheckboxProps = {
  colorScheme: "telegram",
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
