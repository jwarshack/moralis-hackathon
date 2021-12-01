import React from 'react'
import { Flex, Heading, HStack, Link, Button } from '@chakra-ui/react'
import { AiFillTwitterCircle, AiFillGithub } from 'react-icons/ai'

export default function Navbar() {
    return (
        <Flex justify="space-between" align="center">
            <Heading bgGradient='linear(to-l, green.400, #FF0080)' bgClip='text' >SonicHi</Heading>
            <HStack>
                <Link><AiFillTwitterCircle size={50}/></Link>
                <Link><AiFillGithub size={50}/></Link>
            </HStack>
            <Button>Connect</Button>
        </Flex>
    )
}
