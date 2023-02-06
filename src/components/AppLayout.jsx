import React from "react";
import { Box } from "@chakra-ui/react";

import { AppHeader } from "./AppHeader";
import { AppFooter } from "./AppFooter";

export function AppLayout({ children }) {
  return (
    <Box textAlign="center">
      <AppHeader />
      <Box margin={4}>{children}</Box>
      <AppFooter />
    </Box>
  );
}
