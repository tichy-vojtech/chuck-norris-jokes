import React, { useState } from "react";
import {
  Card,
  CardBody,
  Image,
  Heading,
  HStack,
  Text,
  Button,
  Spacer,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

const JokeCard = ({ theJoke, category, randomImage }) => {
  const [showMore, setShowMore] = useState(false);
  const maxCardWidth = 200;
  return (
    <Card maxW="sm" borderRadius="lg">
      <CardBody>
        <HStack>
          <Image
            src={randomImage}
            alt="Chuck Norris"
            borderRadius="lg"
            boxSize="150px"
            objectFit="cover"
          />

          {theJoke?.length > maxCardWidth ? (
            <VStack>
              <Heading size="xs">
                {showMore ? theJoke : `${theJoke?.substring(0, maxCardWidth)}`}
              </Heading>
              <Button
                variant="ghost"
                color="blue"
                size="xs"
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? "Show less" : "Show more"}
              </Button>
            </VStack>
          ) : (
            <Heading size="xs">{theJoke}</Heading>
          )}
        </HStack>

        <HStack>
          {category?.length && (
            <Text mt="2">
              Category: <b>{category}</b>
            </Text>
          )}
          <Spacer />
          <Tooltip label="Is this joke awesome? You can save it ...">
            <Button variant="ghost">
              <Text color="orange.300">
                <FaStar />
              </Text>
            </Button>
          </Tooltip>
        </HStack>
      </CardBody>
    </Card>
  );
};

export default JokeCard;
