import { AvatarProps, BoxProps, FlexProps, GridItemProps, SkeletonProps, TextProps } from "@chakra-ui/react";

export const $gridItemStyles: GridItemProps = {
  colSpan: 1,
  p: 2,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  _hover: { bg: "blackAlpha.300" },
  transition: "all 0.2s ease-in-out",
  bg: "blackAlpha.100",
  backgroundImage: "url('/textures/noise_white.png')",
  rounded: "2xl",
  minH: "full",
  h: "fit-content",
};

export const $gridItemSkeletonStyles: GridItemProps = {
  colSpan: -1,
  position: "relative",
  p: 2,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  _hover: { bg: "blackAlpha.300" },
  transition: "all 0.2s ease-in-out",
  bg: "blackAlpha.100",
  rounded: "2xl",
  minH: "full",
  h: "fit-content",
  backgroundImage: "url('/textures/noise_white.png')",
};

export const $badgeFlexContainerStyles: FlexProps = {
  mb: "2",
  alignSelf: "start",
  width: "fit-content",
  rounded: "full",
  border: "1px",
  borderColor: "blackAlpha.300",
  shadow: "sm",
  bg: "white",
  px: "3px",
  py: "0.5",
};

export const $skeletonBadgeFlexContainerStyles: FlexProps = {
  mb: "2",
  alignSelf: "start",
  width: "fit-content",
  rounded: "full",
  border: "1px",
  borderColor: "blackAlpha.300",
  shadow: "sm",
  bg: "white",
  px: "3px",
  py: "0.5",
  minW: "7ch",
};

export const $proposalStatusBadgeStyles = (votingStatus?: "upcoming" | "open" | "closed" | null): BoxProps => ({
  position: "relative",
  ml: "-0.75px",
  maxH: "20px",
  minH: "20px",
  maxW: "20px",
  minW: "20px",
  rounded: "full",
  border: "1px",
  borderColor: "blackAlpha.300",
  bg: votingStatus === "upcoming" ? "gray.500" : votingStatus === "open" ? "green.500" : "red.500",
});

export const $proposalStatusBadgeSkeletonStyles: SkeletonProps = {
  position: "relative",
  zIndex: 2,
  ml: "-0.75px",
  maxH: "20px",
  minH: "20px",
  maxW: "20px",
  minW: "20px",
  rounded: "full",
  border: "1px",
  bgColor: "blackAlpha.500",
  borderColor: "blackAlpha.300",
};

export const $skeletonAvatarFlexStyles: SkeletonProps = {
  fitContent: true,
  width: "full",
  minW: "fit-content",
  rounded: "full",
};

export const $avatarImageStyles: AvatarProps = {
  height: "full",
  width: "full",
  aspectRatio: 1,
  border: "4px",
  shadow: "sm",
};

export const $avatarBoxStyles: BoxProps = {
  px: 12,
};

export const $votingStatusTextStyles: TextProps = {
  maxH: "20px",
  rounded: "full",
  pl: "1.5",
  pr: "2.5",
  mt: "1px",
  fontFamily: "grotesk",
  fontSize: "xs",
  textColor: "blackAlpha.700",
};

export const $textFlexContainerStyles: FlexProps = {
  mt: "3",
  flexDirection: "column",
  alignItems: "center",
};

export const $proposalTitleTextStyles: TextProps = {
  fontFamily: "grotesk",
  fontSize: "lg",
  textColor: "black",
  mb: "3",
  mt: "1",
};

export const $skeletonProposalTitleTextStyles: TextProps = {
  fontFamily: "grotesk",
  fontSize: "lg",
  textColor: "black",
  mb: "3",
  mt: "1",
  minH: "2ch",
  minW: "10ch",
};

export const $skeletonDateFlexStyles: FlexProps = {
  direction: "column",
  alignItems: "center",
  gap: 2,
  mt: 1,
  mb: 2,
};

export const $proposalTimelineTextStyles: TextProps = {
  fontSize: "xs",
  fontWeight: "semibold",
  textColor: "blackAlpha.800",
};

export const $skeletonProposalTimelineTextStyles: SkeletonProps = {
  minH: "2ch",
  minW: "7ch",
  fontSize: "xs",
  fontWeight: "semibold",
  textColor: "blackAlpha.800",
};

export const $skeletonProposalDateTextStyles: SkeletonProps = {
  minH: "1.5ch",
  minW: "10ch",
  fontFamily: "grotesk",
  fontSize: "xs",
  pb: 2,
  fontWeight: "normal",
  textColor: "black",
};

export const $proposalDateTextStyles: TextProps = {
  fontFamily: "grotesk",
  fontSize: "xs",
  pb: 2,
  fontWeight: "normal",
  textColor: "black",
};
