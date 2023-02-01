import { inputAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

const pill = definePartsStyle({
  field: {
    border: "2px solid",
    borderColor: "gray.200",
    borderRadius: "full",
    color: "black",
    _placeholder: { color: "black" },
    _dark: {
      borderColor: "gray.500",
      color: "white",
      _placeholder: { color: "white" },
    },
  },
});

export const inputTheme = defineMultiStyleConfig({
  variants: { pill },
});
