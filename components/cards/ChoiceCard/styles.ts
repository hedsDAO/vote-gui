import { AvatarProps, BoxProps, ButtonProps, CenterProps, FlexProps, GridItemProps, TextProps } from "@chakra-ui/react";
import { GridListChoice } from "@/components/cards/ChoiceCard/constants";

export const $parentAudioChoiceCardGridItemStyles = (currentView?: GridListChoice, isCurrentSong?: boolean): GridItemProps => ({
  rounded: currentView === "list" ? "xl" : "2xl",
  bg: isCurrentSong ? "whiteAlpha.700" : "heds.bg_dark",
  w: "full",
  border: "1px solid",
  borderColor: "heds.bg_light",
  className: "group",
  transition: "all 0.3s ease-in-out",
  boxSizing: "border-box",
  color: "white",
  p: 2,
  colSpan: 1,
  shadow: 'sm'
});

export const $parentFlexContainerStyles = (currentView?: GridListChoice): FlexProps => ({
  px: { base: currentView === "list" ? 1 : 1, lg: currentView === "list" ? 2 : 1 },
  py: { base: currentView === "list" ? 1 : 1, lg: currentView === "list" ? 0.5 : 1 },
  alignItems: "center",
  minH: currentView === 'list' ? "40px" : 'unset',
  maxH: currentView === 'list' ? "40px" : 'unset',
  gap: 3,
});

export const $centerPlayContainerProps: CenterProps = {
  position: "relative",
  bgSize: { base: "30em", lg: "62em" },
  minW: "0 !important",
  h: "auto",
  background: "transparent !important",
  padding: "0 !important",
  maxW: "auto !important",
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
  shadow: 'sm'
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

export const $artistNameTextStyles = (currentView?: GridListChoice, isCurrentSong?: boolean): TextProps => ({
  isTruncated: true,
  fontSize: { base: currentView === "list" ? "0.6rem" : "xs", lg: "xs" },
  textColor: isCurrentSong ? "heds.bg_light" : "whiteAlpha.700",
  fontFamily: "grotesk",
});

export const $choiceNameTextStyles = (currentView?: GridListChoice, isCurrentSong?: boolean): TextProps => ({
  isTruncated: true,
  mt: currentView === "list" ? "-1.5 !important" : "-1 !important",
  fontSize: { base: currentView === "list" ? "0.75rem" : "sm", lg: "sm" },
  fontFamily: "grotesk",
  textColor: isCurrentSong ? "heds.bg" : "whiteAlpha.700",
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
  minW: "7ch",
  maxW: "7ch",
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
  pt: 1 ,
  alignItems: "center",
  gap: 2,
  w: "full",
});

export const $listViewVotingFlexStyles: FlexProps = {
  ml: "auto",
  gap: 1.5,
  pl: { lg: 5 },
  pr: 0,
};

export const $listViewParentFlexStyles: FlexProps = {
  alignItems: "center",
  justifyContent: "center",
  gap: 1,
};

export const $listViewIncreaseButtonStyles: ButtonProps = {
  size: "xs",
  py: "16px !important",
  rounded: "sm",
  roundedLeft: "md",
  bg: "heds.bg_light !important",
  _hover: { bg: "heds.bg !important" },
  transition: "all 0.3s ease-in-out",
};

export const $listViewDecreaseButtonStyles: ButtonProps = {
  size: "xs",
  py: "16px !important",
  rounded: "sm",
  roundedRight: "md",
  bg: "heds.bg_light !important",
  _hover: { bg: "heds.bg !important" },
  transition: "all 0.3s ease-in-out",
};

export const $listViewBoxCounterStyles: BoxProps = {
  rounded: "sm",
  bg: "heds.bg_light",
  px: "1",
  py: { base: "6.35px !important", lg: "7.35px !important" },
};

export const $listViewCounterTextStyles: TextProps = {
  fontWeight: "normal",
  mt: "-2px",
  minW: "1.75ch",
  maxW: "1.75ch",
  textAlign: "center",
  fontSize: "md",
  textColor: "white",
};

export const $listViewIconDimensions = {
  height: 9,
  width: 9,
};

export const $gridViewFlexStyles: FlexProps = {
  ml: "auto",
  gap: 1.5,
  pl: { lg: 5 },
  pr: 1.5,
};

export const $gridViewChildFlexStyles: FlexProps = {
  alignItems: "center",
};

export const $gridViewCounterBoxStyles: BoxProps = {
  rounded: "sm",
  roundedLeft: "lg",
  bg: "heds.bg_light",
  px: "1",
  py: 4,
};

export const $gridViewCounterTextStyles: TextProps = {
  mt: "-3px",
  minW: "1.75ch",
  maxW: "1.75ch",
  textAlign: "center",
  fontSize: "xl",
  textColor: "white",
  fontWeight: "normal",
};

export const $gridViewChildFlexStyles2: FlexProps = {
  direction: { base: "column", lg: "column" },
  justifyContent: "center",
  gap: 1.5,
};

export const $gridViewIncreaseButtonStyles: ButtonProps = {
  size: "xs",
  py: "3 !important",
  rounded: "sm",
  roundedTopRight: "lg",
  bg: "heds.bg_light !important",
  _hover: { bg: "heds.bg !important" },
  transition: "all 0.3s ease-in-out",
};

export const $gridViewDecreaseButtonStyles: ButtonProps = {
  size: "xs",
  py: "3 !important",
  rounded: "sm",
  roundedBottomRight: "lg",
  bg: "heds.bg_light !important",
  _hover: { bg: "heds.bg !important" },
  transition: "all 0.3s ease-in-out",
};

export const $gridViewIconDimensions = {
  height: 10,
  width: 10,
};
