import { Heading, Image, VStack } from '@chakra-ui/react'
import React from 'react'

const Landing = () => {
    return (
        <VStack
            w={{ base: '90%', md: '500px' }}
            m="auto"
            pt="10"
            //justify="center"
            //h="100vh"
            spacing="1rem"
        >
            <Heading>Chat with your friends</Heading>
            <Image src=''/>
        </VStack>
    )
}

export default Landing
