import React, { useState } from "react";
import {
  Card,
  CardBody,
  Image,
  Heading,
  Text,
  Button,
  Spacer,
  Tooltip,
  VStack,
  CardFooter,
  Flex,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

const JokeCard = ({ theJoke, category, randomImage }) => {
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
            pb={3}
          />

          {theJoke?.length > maxCardWidth ? (
            <VStack>
              <Heading
                maxWidth={maxCardWidth}
                px="2"
                size="xs"
                textAlign="center"
              >
                {showMore ? theJoke : `${theJoke?.substring(0, maxCardWidth)}`}
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
            <Heading maxWidth={maxCardWidth} size="xs" textAlign="center">
              {theJoke}
            </Heading>
          )}
        </Flex>
      </CardBody>

      {category.length > 0 ? (
        <CardFooter>
          <Flex justifyContent="space-between" width="100%">
            <Text mt="2" textAlign="center">
              Category: <b>{category}</b>
            </Text>
          </Flex>
        </CardFooter>
      ) : (
        <></>
      )}
    </Card>
  );
};

export default JokeCard;
