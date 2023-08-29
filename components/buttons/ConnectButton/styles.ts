import { ButtonProps, TextProps } from "@chakra-ui/react";

export const $connectButtonStyles: ButtonProps = {
  rounded: "lg",
  bg: "whiteAlpha.200 !important",
  px: "4",
  py: "1 !important",
  minH: '0 !important',
  fontFamily: "grotesk",
  transition: "all ease-in-out 200ms",
  fontSize: { lg: "sm" },
  size: 'sm',
};

export const $connectButtonTextStyles: TextProps = {
    fontSize: 'sm',
    color: 'whiteAlpha.800',
};
