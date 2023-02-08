import React from "react";
import Link from "next/link";
import { Center, Heading, VStack, Button } from "@chakra-ui/react";

export default function NotFoundPage() {
  return (
    <Center h="calc(100vh - 200px)">
      <VStack>
        <Heading as="h1">🔍 Nenalezeno!</Heading>
        <Heading as="h2" size="md">
          Toto není stránka, kterou hledáš.
        </Heading>
        <Link href={"/"}>
          <Button mt={4}>Přejít na domovskou stránku!</Button>
        </Link>
      </VStack>
    </Center>
  );
}
