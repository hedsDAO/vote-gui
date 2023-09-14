import { ButtonProps } from "@chakra-ui/react";

export const $createProposalButtonStyles: ButtonProps = {
  display: "flex",
  alignItems: "center",
  gap: "2",
  px: "3",
  minH: "0 !important",
  py: "1",
  height: "unset",
  fontFamily: "grotesk",
  fontSize: "sm",
  fontWeight: "normal",
  textColor: "blackAlpha.800",
  transition: "all 0.5s ease-in-out",
  _hover: {
    bg: "transparent",
    textColor: "blackAlpha.900",
    textDecoration: "underline",
    textUnderlineOffset: "5px",
  },
};
