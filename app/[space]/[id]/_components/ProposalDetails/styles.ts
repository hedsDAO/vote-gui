import { BoxProps, ButtonProps, FlexProps, SkeletonProps, TextProps } from "@chakra-ui/react";

export const $proposalDetailsParentFlexStyles: FlexProps = {
  direction: "column",
  my: { base: 3, lg: 10 },
  pb: { base: 3, lg: 5 },
  maxW: { lg: "90vw" },
  w: "full",
  mx: "auto",
  gap: 5,
};

export const $linkButtonStyles: ButtonProps = {
  ml: { lg: "-8" },
  _hover: { bg: "transparent", textColor: "black" },
  size: "sm",
  transition: "all 0.2s ease-in-out",
  textColor: "blackAlpha.800",
  gap: 2,
  fontSize: "base",
  fontWeight: "normal",
  fontFamily: "grotesk",
  px: 0,
  py: 0,
};

export const $ssrLinkButtonStyles: ButtonProps = {
  ml: { lg: "-8" },
  _hover: { bg: "transparent", textColor: "black" },
  size: "sm",
  transition: "all 0.2s ease-in-out",
  textColor: "blackAlpha.800",
  gap: 2,
  letterSpacing: 'wide',
  bg: 'transparent !important',
  fontSize: "base",
  fontWeight: "normal !important",
  fontFamily: "grotesk",
  px: 0,
  py: 0,
};

export const $linkButtonFlexStyles: FlexProps = {
  gap: 4,
  px: { base: 6, lg: 0 },
};

export const $proposalDetailsFlexStyles: FlexProps = {
  direction: { base: "column-reverse", lg: "row" },
  mt: { base: 4, lg: 4 },
  gap: { base: 8, lg: 0 },
  w: "full",
  maxW: { lg: "90vw" },
  mx: { lg: "auto" },
  alignItems: { base: "center", lg: "start" },
  justifyContent: "space-between",
  px: { base: 8, lg: 0 },
};

export const $proposalDetailsInnerFlexStyles: FlexProps = {
  px: { base: 8, lg: 0 },
  gap: 4,
  mt: { base: 5, lg: "-52" },
  direction: "column",
};

export const $titleStyles: TextProps = {
  fontWeight: "normal",
  fontSize: { base: "4xl", lg: "5xl" },
  fontFamily: "mono",
};

export const $headingStyles: TextProps = {
  textColor: "gray.800",
  fontWeight: 600,
  letterSpacing: "normal",
  fontSize: "xs",
  fontFamily: "inter",
};

export const $typographyStyles: TextProps = {
  textColor: "blackAlpha.800",
  fontFamily: "work",
  fontSize: "sm",
};

export const $descriptionTypographyStyles: TextProps = {
  textColor: "blackAlpha.800",
  maxW: { lg: "50%" },
  fontFamily: "grotesk",
  fontSize: "sm",
};

export const $voteRequirementsTypographyStyles: TextProps = {
  textColor: "blackAlpha.800",
  maxW: { lg: "50%" },
  fontFamily: "grotesk",
  fontSize: "sm",
};

export const $timeFlexStyles: FlexProps = {
  direction: { base: "column", lg: "row" },
  gap: 4,
};

export const $flexHeaderDescriptionGroupStyles: FlexProps = {
  gap: 0.5,
};

export const $skeletonHeadingStyles: TextProps = {
  fontFamily: "grotesk",
  fontWeight: "normal",
  mt: 1,
  maxW: { base: "20ch", lg: "30ch" },
  minH: { base: "3.75ch", lg: "5ch" },
  minW: { base: "20ch", lg: "30ch" },
};

export const $skeletonVoteRequirementsTextStyles: TextProps = {
  fontFamily: "grotesk",
  fontWeight: "normal",
  mt: 1,
  maxW: { base: "100%", lg: "50%" },
  minH: "1.5ch",
  minW: { base: "100%", lg: "50%" },
};

export const $skeletonDescriptionFlexStyles: FlexProps = {
  direction: "column",
  gap: "2px",
  minW: { base: "100%", lg: "50%" },
};

export const $skeletonDescriptionTextStyles: TextProps = {
  fontFamily: "grotesk",
  fontWeight: "normal",
  mt: "4px",
  maxW: { base: "100%", lg: "50%" },
  minH: "1.5ch",
  minW: { base: "100%", lg: "50%" },
};

export const $skeletonDescriptionTextStyles2: TextProps = {
  fontFamily: "grotesk",
  fontWeight: "normal",
  mt: "4px",
  maxW: { base: "100%", lg: "50%" },
  minH: "1.5ch",
  minW: { base: "100%", lg: "50%" },
};

export const $skeletonCreatedByTextStyles: TextProps = {
  fontFamily: "grotesk",
  fontWeight: "normal",
  mt: "4px",
  maxW: { base: "100%", lg: "50%" },
  minH: "1.5ch",
  minW: { base: "100%", lg: "50%" },
};

export const $skeletonStartTimeTextStyles: TextProps = {
  fontFamily: "grotesk",
  fontWeight: "normal",
  mt: "4px",
  maxW: { base: "100%", lg: "15ch" },
  minH: "1.5ch",
  minW: { base: "100%", lg: "15ch" },
};
export const $skeletonEndTimeTextStyles: TextProps = {
  fontFamily: "grotesk",
  fontWeight: "normal",
  mt: "4px",
  maxW: { base: "100%", lg: "15ch" },
  minH: "1.5ch",
  minW: { base: "100%", lg: "15ch" },
};

export const $profilePictureStyles = {
  height: { base: "200px", lg: "300px" },
  width: { base: "200px", lg: "300px" },
};

export const $bgOverlayBoxStyles = (cover?: string): BoxProps => ({
  position: "absolute",
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center center",
  filter: "blur(40px)",
  opacity: 0.35,
  zIndex: "-1",
  backgroundImage: `url(${cover})`,
});
