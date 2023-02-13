import React, { useMemo, useState } from "react";
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

const MAX_CARD_WIDTH = 200;
const NUMBER_OF_IMAGES = 10;

function calculateRandomIndex() {
  const randomImageIndex = Math.floor(Math.random() * NUMBER_OF_IMAGES) + 1;
  return `/images/chuck${randomImageIndex}.jpeg`;
}

export type JokeCardProps = {
  joke: string;
  categories: string[]; // TODO RENAME
};

export function JokeCard({ joke, categories }: JokeCardProps) {
  const [showMore, setShowMore] = useState(false);
  const randomImage = useMemo(() => calculateRandomIndex(), [joke]);

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
          {joke?.length > MAX_CARD_WIDTH ? (
            <VStack>
              <Heading
                maxWidth={MAX_CARD_WIDTH}
                px="2"
                size="xs"
                textAlign="center"
              >
                {showMore ? joke : `${joke?.substring(0, MAX_CARD_WIDTH)}...`}
              </Heading>
              <Button
                variant="outline"
                size="xs"
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? " Show less" : " Show more"}
              </Button>
            </VStack>
          ) : (
            <Heading
              maxWidth={MAX_CARD_WIDTH}
              size="xs"
              textAlign="center"
              mt={2}
            >
              {joke}
            </Heading>
          )}
        </Flex>
      </CardBody>
      {categories.length > 0 && (
        <CardFooter>
          <Flex justifyContent="space-between" width="100%">
            <Text textAlign="center">
              Category: <b>{categories}</b>
            </Text>
          </Flex>
        </CardFooter>
      )}
    </Card>
  );
}
