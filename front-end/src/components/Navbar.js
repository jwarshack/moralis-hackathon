import React from 'react'
import { Flex, Heading, HStack, Link, Button } from '@chakra-ui/react'
import { AiFillTwitterCircle, AiFillGithub } from 'react-icons/ai'
import { useMoralis } from 'react-moralis'
import { shortAddress } from '../utils/helpers'

export default function Navbar() {
    const { authenticate, isAuthenticated, isAuthenticating, user, logout} = useMoralis()
    return (
        <Flex direction="column" w="100%">
            <Flex justify="space-between" align="center">
                <Heading bgGradient='linear(to-l, green.400, #FF0080)' bgClip='text' >SonicHi</Heading>
                <HStack>
                    <Link><AiFillTwitterCircle size={50}/></Link>
                    <Link><AiFillGithub size={50}/></Link>
                </HStack>
                {
                    !isAuthenticated ? <Button onClick={authenticate} isLoading={isAuthenticating}>Connect</Button>
                    : <Button onClick={logout}>{shortAddress(user.get("username"))}</Button>
                }
            </Flex>
            <Flex justify="center" py={7}>
                <Button as="a" href="/">Purchase</Button>
                <Button as="a" href="redeem">Redeem</Button>
            </Flex>
        </Flex>
    )
}
