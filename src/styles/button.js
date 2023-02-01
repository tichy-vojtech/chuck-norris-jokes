import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const outline = defineStyle({
  backgroundColor: "gray.200",
  _dark: {
    backgroundColor: "white",
  },
  _hover: {
    _dark: {
      bg: "gray.100",
    },
  },
});

export const buttonTheme = defineStyleConfig({
  variants: { outline },
});
