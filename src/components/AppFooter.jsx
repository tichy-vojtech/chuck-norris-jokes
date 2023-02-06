import React from "react";
import { Box, Divider } from "@chakra-ui/react";

export function AppFooter() {
  return (
    <Box
      as="footer"
      h="50px"
      display="flex"
      alignItems="center"
      flexDirection="column"
    >
      <Divider />
      <Box as="footer" p={4}>
        &copy; {new Date().getFullYear()} &middot; DVD Company a.s.
      </Box>
    </Box>
  );
}
