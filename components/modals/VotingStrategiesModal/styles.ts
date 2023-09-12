import { BoxProps, ButtonProps, FlexProps } from "@chakra-ui/react";

export const $overlayDivClassNames = "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity";
export const $dialogDivClassNames = "relative z-10";

export const $transitionChildStyles = {
  enter: "ease-out duration-300",
  enterFrom: "opacity-0",
  enterTo: "opacity-100",
  leave: "ease-in duration-200",
  leaveFrom: "opacity-100",
  leaveTo: "opacity-0",
};

export const $backButtonStyles: ButtonProps = {
  fontWeight: "normal",
  fontFamily: "grotesk",
  color: "white",
  size: "sm",
  bg: "blackAlpha.400 !important",
  _hover: { bg: "blackAlpha.600 !important" },
};

export const $backButtonBoxStyles: BoxProps = {
  mt: 2,
  display: "flex",
  justifyContent: "end",
};
