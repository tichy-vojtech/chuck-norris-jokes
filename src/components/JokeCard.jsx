import React, { useState } from "react";
import {
  Card,
  CardBody,
  Image,
  Heading,
  Text,
  Button,
  VStack,
  CardFooter,
  Flex,
} from "@chakra-ui/react";

export function JokeCard({ joke, category, randomImage }) {
  const [showMore, setShowMore] = useState(false);
  const maxCardWidth = 200;

  return (
    <Card maxW="sm" borderRadius="lg" width="100%">
      <CardBody>
        <Flex flexDirection={["column", "row"]} alignItems="center">
          <Image
            mr={["0", "2"]}
            src={randomImage}
            alt="Chuck Norris"
            borderRadius="lg"
            boxSize={["100%", "150px"]}
            objectFit="cover"
          />

          {joke?.length > maxCardWidth ? (
            <VStack>
              <Heading
                maxWidth={maxCardWidth}
                px="2"
                size="xs"
                textAlign="center"
              >
                {showMore ? joke : `${joke?.substring(0, maxCardWidth)}...`}
              </Heading>
              <Button
                variant="ghost"
                background="white"
                color="black"
                size="xs"
                _hover={{
                  background: "gray.300",
                }}
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? " Show less" : " Show more"}
              </Button>
            </VStack>
          ) : (
            <Heading
              maxWidth={maxCardWidth}
              size="xs"
              textAlign="center"
              mt={2}
            >
              {joke}
            </Heading>
          )}
        </Flex>
      </CardBody>

      {category.length > 0 ? (
        <CardFooter>
          <Flex justifyContent="space-between" width="100%">
            <Text textAlign="center">
              Category: <b>{category}</b>
            </Text>
          </Flex>
        </CardFooter>
      ) : (
        <></>
      )}
    </Card>
  );
}
