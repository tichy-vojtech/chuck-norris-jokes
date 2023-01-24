import React from "react";
import {
  Card,
  CardBody,
  Image,
  Heading,
  HStack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import chuck1 from "../assets/chuck1.jpeg";
import chuck2 from "../assets/chuck2.jpeg";
import chuck3 from "../assets/chuck3.jpeg";
import chuck4 from "../assets/chuck4.jpeg";
import chuck5 from "../assets/chuck5.jpeg";
import chuck6 from "../assets/chuck6.jpeg";
import chuck7 from "../assets/chuck7.jpeg";
import chuck8 from "../assets/chuck8.jpeg";
import chuck9 from "../assets/chuck9.jpeg";
import chuck10 from "../assets/chuck10.jpeg";

const JokeCard = ({ imageSrc, theJoke, category }) => {
  const images = [
    chuck1,
    chuck2,
    chuck3,
    chuck4,
    chuck5,
    chuck5,
    chuck6,
    chuck7,
    chuck8,
    chuck9,
    chuck10,
  ];

  let randomImage = images[Math.floor(Math.random() * images.length)];

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
          <Heading size="xs">{theJoke}</Heading>
        </HStack>
        {category.length !== 0 && (
          <Text mt="2">
            Category: <b>{category}</b>
          </Text>
        )}
      </CardBody>
    </Card>
  );
};

export default JokeCard;
