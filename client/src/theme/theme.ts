import { extendTheme } from "@chakra-ui/react";

import { buttonTheme } from "./button";
import { cardTheme } from "./card";
import { inputTheme } from "./input";

export const cnJokesTheme = extendTheme({
  components: { 
    Button: buttonTheme, 
    Input: inputTheme, 
    Card: cardTheme,
  },
});
