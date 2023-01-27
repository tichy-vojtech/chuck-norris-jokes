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
    <Card maxW="sm" borderRadius="lg">
      <CardBody>
        <Flex>
          <Image
            mr="2"
            src={randomImage}
            alt="Chuck Norris"
            borderRadius="lg"
            boxSize="150px"
            objectFit="cover"
          />

          {theJoke?.length > maxCardWidth ? (
            <VStack>
              <Heading maxWidth={maxCardWidth} px="2" size="xs">
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
                {showMore ? "Show less" : "Show more"}
              </Button>
            </VStack>
          ) : (
            <Heading maxWidth={maxCardWidth} size="xs">
              {theJoke}
            </Heading>
          )}
        </Flex>
      </CardBody>

      {category.length > 0 ? (
        <CardFooter>
          <Flex justifyContent="space-between" width="100%">
            <Text mt="2">
              Category: <b>{category}</b>
            </Text>
            <Spacer />
            <Tooltip label="Is this joke awesome? You can save it ...">
              <Button variant="ghost">
                <Text color="orange.300">
                  <FaStar />
                </Text>
              </Button>
            </Tooltip>
          </Flex>
        </CardFooter>
      ) : (
        <CardFooter h="20">
          <Flex
            justifyContent="space-between"
            alignItems="flex-start"
            width="100%"
          >
            {/* <Text></Text> */}
            <Spacer />
            <Tooltip label="Is this joke awesome? You can save it ...">
              <Button variant="ghost">
                <Text color="orange.300">
                  <FaStar />
                </Text>
              </Button>
            </Tooltip>
          </Flex>
        </CardFooter>
      )}
    </Card>
  );
};

export default JokeCard;
