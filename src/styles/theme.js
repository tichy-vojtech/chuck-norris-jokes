import { extendTheme } from "@chakra-ui/react";
import { buttonTheme } from "./button";
import { inputTheme } from "./input";

export const myNewTheme = extendTheme({
  components: { Button: buttonTheme, Input: inputTheme },
});
