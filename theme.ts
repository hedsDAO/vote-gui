import { extendTheme } from "@chakra-ui/react";

export const defaultTheme = extendTheme({
  fonts: {
    grotesk: "var(--font-space-grotesk)",
    inter: "var(--font-space-inter)",
  },
  colors: {
    heds: {
      bg: "#2D2934",
      bg_dark: '#28242D',
      bg_light: "#3C3644",
    },
  },
});
