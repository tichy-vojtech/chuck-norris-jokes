import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const outline = defineStyle({
  backgroundColor: "blue.200",
  _dark: {
    backgroundColor: "blue.400",
  },
  _hover: {
    bg: "blue.200",
    _dark: {
      bg: "blue.500",
    },
  },
});

export const buttonTheme = defineStyleConfig({
  variants: { outline },
});
