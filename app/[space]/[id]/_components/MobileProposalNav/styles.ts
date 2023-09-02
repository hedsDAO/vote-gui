import { BoxProps, ButtonProps, FlexProps, GridItemProps, TextProps } from "@chakra-ui/react";
import { GridListChoice } from "@/app/[space]/[id]/_components/MobileProposalNav/constants";

export const $gridItemStyles = (isShowingVoters: boolean): GridItemProps => ({
  display: { base: "flex", lg: "none" },
  alignItems: "center",
  justifyContent: "space-between",
  colSpan: { base: 1, lg: isShowingVoters ? 4 : 5 },
});

export const $choicesTypographyStyles = (isShowingVoters: boolean): TextProps => ({
  role: isShowingVoters ? "button" : "heading",
  fontSize: { lg: "lg" },
  letterSpacing: "wide",
  fontWeight: "semibold",
  textColor: isShowingVoters ? "blackAlpha.400" : "blackAlpha.800",
  fontFamily: "grotesk",
  alignSelf: "start",
});

export const $votersTypographyStyles = (isShowingVoters: boolean): TextProps => ({
  role: isShowingVoters ? "heading" : "button",
  fontSize: { lg: "lg" },
  letterSpacing: "wide",
  fontWeight: "semibold",
  textColor: isShowingVoters ? "blackAlpha.800" : "blackAlpha.400",
  fontFamily: "grotesk",
  alignSelf: "start",
});

export const $dividerBoxStyles: BoxProps = {
  w: "1px",
  h: "14px",
  bg: "blackAlpha.400",
};

export const $resultsButtonStyles = (isShowingResults: boolean): ButtonProps => ({
  background: isShowingResults ? "blackAlpha.200 !important" : "transparent !important",
  py: "1.5 !important",
  px: "3.5 !important",
  minH: "0 !important",
  h: "unset",
  size: "sm",
});

export const $gridButtonStyles = (currentView: GridListChoice, setCurrentView: (arg: GridListChoice) => void): ButtonProps => ({
  background: currentView === "grid" ? "blackAlpha.200 !important" : "transparent !important",
  py: "1.5 !important",
  minH: "0 !important",
  h: "unset",
  size: "sm",
  onClick: () => setCurrentView("grid" as GridListChoice),
});

export const $listButtonStyles = (currentView: GridListChoice, setCurrentView: (arg: GridListChoice) => void): ButtonProps => ({
  background: currentView === "list" ? "blackAlpha.200 !important" : "transparent !important",
  py: "1.5 !important",
  minH: "0 !important",
  h: "unset",
  size: "sm",
  onClick: () => setCurrentView("list" as GridListChoice),
});

export const $iconsFlexStyles = (isShowingVoters: boolean): FlexProps => ({
  display: isShowingVoters ? "none" : "flex",
  gap: 3,
  alignItems: "center",
});

export const $viewButtonsFlexStyles: FlexProps = {
  mx: { lg: 2 },
  px: 0.5,
  py: 0.5,
  gap: 0.5,
  rounded: "lg",
  alignItems: "center",
};

export const $defaultChoicesTextStyles: TextProps = {
  fontSize: { lg: "lg" },
  letterSpacing: "wide",
  fontWeight: "semibold",
  textColor: "blackAlpha.800",
  fontFamily: "grotesk",
  alignSelf: "start",
};


export const $defaultFlexStyles: FlexProps = {
    gap: 3,
    alignItems: "center",
  };