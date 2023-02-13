import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  useColorMode,
  Heading,
} from "@chakra-ui/react";
import Link from "next/link";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";

import { CategoryMenu } from "./CategoryMenu";

export function AppHeader() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box bg={useColorModeValue("blue.100", "blue.900")} px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Link href="/">
          {" "}
          <Heading p={2} py={4}>
            DVD Jokes
          </Heading>
        </Link>
        <Flex alignItems="center">
          <Button onClick={toggleColorMode} variant="ghost">
            {colorMode === "light" ? <BsFillMoonFill /> : <BsFillSunFill />}
          </Button>
          <CategoryMenu />
        </Flex>
      </Flex>
    </Box>
  );
}
