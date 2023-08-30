import { FlexProps, TextProps } from "@chakra-ui/react";

export const $proposalHeaderTextStyles: TextProps = {
  fontFamily: "inter",
  fontSize: "xl",
  fontWeight: "semibold",
  textColor: "blackAlpha.800",
  letterSpacing: "wide",
};

export const $parentFlexStyles: FlexProps = {
  mt: 12,
  px: { base: 8, lg: 0 },
  w: "full",
  alignItems: "center",
  justifyContent: "space-between",
};
