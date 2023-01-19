import React from 'react'
import { Card, CardBody, Image, Stack, Heading, Divider, Center } from '@chakra-ui/react'

const JokeCard = ({ imageSrc, theJoke }) => {
  return (
    <div>
      <Center>
        <Card maxW='sm'>
          <CardBody>
            {/* <Image
              src={imageSrc}
              alt='Chuck Norris'
              borderRadius='lg'
              boxSize='200px'
              objectFit='cover'
            /> */}
            <Stack mt='6' spacing='3'>
              <Heading size='xs'>{theJoke}</Heading>
            </Stack>
          </CardBody>
          <Divider />
        </Card>
      </Center>
    </div>
  )
}

export default JokeCard