import { ButtonProps, TextProps } from "@chakra-ui/react";

export const $loginButtonStyles: ButtonProps = {
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

export const $loginButtonTextStyles: TextProps = {
    fontSize: 'sm',
    color: 'whiteAlpha.800',
};

export const $loginButtonSmStyles: ButtonProps = {
  rounded: "md",
  bg: "blackAlpha.200 !important",
  px: "3",
  py: "1 !important",
  minH: '24.5px !important',
  maxH: '24.5px !important',
  fontFamily: "grotesk",
  transition: "all ease-in-out 200ms",
  fontSize:"xs",
  size: 'xs',
};

export const $loginButtonTextSmStyles: TextProps = {
    fontSize: 'xs',
    color: 'blackAlpha.700',
};
