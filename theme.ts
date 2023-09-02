import { extendTheme } from "@chakra-ui/react";

export const defaultTheme = extendTheme({
  fonts: {
    grotesk: "var(--font-space-grotesk)",
    inter: "var(--font-inter)",
    mono: "var(--font-space-mono)",
    work: "var(--font-work-sans)"
  },
  colors: {
    heds: {
      bg: "#2D2934",
      bg_dark: '#28242D',
      bg_light: "#3C3644",
    },
  },
});
