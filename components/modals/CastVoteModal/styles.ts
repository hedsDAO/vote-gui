import { AvatarProps, ButtonProps, FlexProps, ModalProps, TextProps } from "@chakra-ui/react";

export const $headingTextStyles: TextProps = {
  fontWeight: "normal",
  fontFamily: "grotesk",
  fontSize: { base: "base", lg: "xl" },
  color: "whiteAlpha.900",
};

export const $subheadingTextStyles: TextProps = {
  pl: "1px",
  fontWeight: "normal",
  fontFamily: "grotesk",
  fontSize: { base: "xs", lg: "xs" },
  color: "whiteAlpha.600",
};

export const $modalCloseButtonStyles: ButtonProps = {
  color: "white",
  size: "md",
};

export const $submitButtonFlexContainerStyles: FlexProps = {
  mt: 2,
  justifyContent: "end",
};

export const $submitButtonStyles: ButtonProps = {
  letterSpacing: "wider",
  fontFamily: "grotesk",
  fontWeight: "semibold",
  px: "2.5 !important",
  minH: "unset !important",
  py: "2 !important",
  size: "xs",
  rounded: "sm",
  textColor: "whiteAlpha.800",
  _hover: { bg: "green.600 !important", textColor: "whiteAlpha.900 !important" },
  bg: "green.700 !important",
};

export const $modalContentStyles = {
  pb: 4,
  maxW: { base: "95%", lg: "lg" },
  bg: "heds.bg_dark",
};

export const $modalOverlayStyles = {
  bg: "heds.bg_dark",
  opacity: "0.9 !important",
};

export const $modalStyles: Partial<ModalProps> = {
  size: "lg",
  isCentered: true,
};

export const $modalBodyFlexStyles: FlexProps = {
  gap: 1.5,
  direction: "column",
};

export const $voteSelectionFlexStyles: FlexProps = {
  bg: "heds.bg_light",
  p: 1.5,
  rounded: "sm",
  alignItems: "center",
  gap: 2.5,
};

export const $avatarStyles: AvatarProps = {
  size: "xs",
  borderRadius: "sm",
};

export const $proposalChoiceTextStyles: TextProps = {
  fontFamily: "grotesk",
  fontSize: { base: "xs", lg: "sm" },
  color: "whiteAlpha.700",
};

export const $voteChoiceValueFlexStyles: FlexProps = {
  ml: "auto",
  textAlign: "center",
  pr: 2,
};

export const $voteChoiceValueTextStyles: TextProps = {
  fontFamily: "grotesk",
  fontSize: { base: "xs", lg: "sm" },
  color: "whiteAlpha.900",
};
