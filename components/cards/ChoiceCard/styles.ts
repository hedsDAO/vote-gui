import { AvatarProps, BoxProps, CenterProps, FlexProps, GridItemProps, TextProps } from "@chakra-ui/react";
import { GridListChoice } from "@/components/cards/ChoiceCard/constants";

export const $parentAudioChoiceCardGridItemStyles = (currentView?: GridListChoice): GridItemProps => ({
  rounded: currentView === "list" ? "xl" : "2xl",
  bg: "heds.bg_dark",
  _hover: { bg: "heds.bg_light" },
  w: "full",
  className: "group",
  transition: "all 0.3s ease-in-out",
  color: "white",
  p: 2,
  colSpan: 1,
});

export const $parentFlexContainerStyles = (currentView?: GridListChoice): FlexProps => ({
  px: { base: currentView === "list" ? 1 : 1, lg: currentView === "list" ? 2 : 1 },
  py: { base: currentView === "list" ? 1 : 1, lg: currentView === "list" ? 0.5 : 1 },
  alignItems: "center",
  gap: 3,
});

export const $centerPlayContainerProps: CenterProps = {
  position: "relative",
  bgSize: { base: "30em", lg: "62em" },
  minW: '0 !important',
  h: 'auto',
  background: 'transparent !important',
  padding: '0 !important',
  maxW: 'auto !important'
};

export const $playButtonClassName = (currentView?: GridListChoice) =>
  `${currentView === "list" ? "h-10" : "h-auto"} ` + "absolute invert transition-all group-hover:z-10";

  export const $loadingButtonClassName = (currentView?: GridListChoice) =>
  `${currentView === "list" ? "h-10" : "h-auto"} ` + "absolute animate-spin invert transition-all group-hover:z-10";

export const $audioAvatarImageStyles = (currentView?: GridListChoice): AvatarProps => ({
  size: currentView === "list" ? "sm" : "lg",
  rounded: currentView === "list" ? "md" : "xl",
  borderRadius: currentView === "list" ? "md" : "xl",
  transition: "all 0.3s ease-in-out",
  _groupHover: { opacity: "50%" },
});

export const $imageAvatarImageStyles = (currentView?: GridListChoice): AvatarProps => ({
  size: currentView === "list" ? "sm" : "lg",
  rounded: currentView === "list" ? "md" : "xl",
  borderRadius: currentView === "list" ? "md" : "xl",
  transition: "all 0.3s ease-in-out",
});



export const $textFlexContainer = (currentView?: GridListChoice): FlexProps => ({
  minW: { base: currentView === "list" ? "25%" : "auto", lg: currentView === "list" ? "20%" : "auto" },
  maxW: { base: currentView === "list" ? "25%" : "auto", lg: currentView === "list" ? "20%" : "auto" },
  p: { base: currentView === "list" ? 0 : 1, lg: 1 },
  mt: currentView === "list" ? "0" : "-1",
  gap: 1,
  direction: "column",
});

export const $artistNameTextStyles = (currentView?: GridListChoice): TextProps => ({
  isTruncated: true,
  fontSize: { base: currentView === "list" ? "0.6rem" : "xs", lg: "xs" },
  textColor: "whiteAlpha.700",
  fontFamily: "grotesk",
});

export const $choiceNameTextStyles = (currentView?: GridListChoice): TextProps => ({
  isTruncated: true,
  mt: currentView === "list" ? "-1.5 !important" : "-1 !important",
  fontSize: { base: currentView === "list" ? "0.75rem" : "sm", lg: "sm" },
  fontFamily: "grotesk",
});

export const $resultsFlexContainer = (currentView?: GridListChoice): FlexProps => ({
  display: currentView === "list" ? "flex" : "none",
  transition: "all 0.3s ease-in-out",
  px: 1.5,
  py: "10.2px",
  alignItems: "center",
  gap: 2,
  w: "full",
});

export const $percentageTextStyles: TextProps = {
  fontFamily: "grotesk",
  letterSpacing: "widest",
  fontSize: "xs",
};

export const $percentageParentFlexStyles: FlexProps = {
  w: "full",
  my: 1,
  direction: "column",
};

export const $percentageContainerBoxStyles: BoxProps = {
  minH: "9px",
  rounded: "full",
  bg: "whiteAlpha.400",
  w: "full",
};

export const $percentageVariableWidthBoxStyles = (percentage: number): BoxProps => ({
  mt: "-9px",
  minH: "9px",
  rounded: "full",
  bg: "whiteAlpha.700",
  w: `${percentage}%`,
});

export const $percentageListParentFlexStyles = (currentView?: GridListChoice): FlexProps => ({
  display: currentView === "list" ? "none" : "flex",
  transition: "all 0.3s ease-in-out",
  px: 1.5,
  pt: 0.5,
  alignItems: "center",
  gap: 2,
  w: "full",
});
