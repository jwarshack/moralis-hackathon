import { useState, useEffect } from 'react'
import { VStack, Button, Input, Text } from '@chakra-ui/react'
import { ethers } from 'ethers'

import {Moralis} from 'moralis'
import { useMoralisWeb3Api } from 'react-moralis'
import { contractAddress, contractABI } from '../config';

export default function Purchase() {

    const Web3Api = useMoralisWeb3Api()


    const options = { address: "0x8D146E49652Ff254122E05fe3Efb8fA2f32dFbA3", chain: "rinkeby" };



    const [tokenId, setTokenId] = useState(null)
    const [amount, setAmount] = useState(null)

    async function getTokens() {
        const result = await Web3Api.token.getAllTokenIds(options)
        console.log(result.result)
 
    }





    async function purchase() {
        const options = { chain: "rinkeby", addresses: "0x8D146E49652Ff254122E05fe3Efb8fA2f32dFbA3" };
        const tokenMetadata = await Moralis.Web3API.token.getTokenMetadata(options);
        console.log(amount)
        if (!amount || !tokenId) return
        try {
            const { ethereum } = window;

            if (ethereum) {
                await ethereum.request({ method: 'eth_accounts' })
                const provider = new ethers.providers.Web3Provider(ethereum)
                const signer = provider.getSigner()
                const contract = new ethers.Contract(contractAddress, contractABI, signer)
                let price = await contract.price()
                price = Number(price)

                console.log(amount)

                // const fee = price * Number(amount)
                console.log(price)
                
                
                let tx = await contract.issue(tokenId, amount, { value: String(price * amount)})
                await tx.wait()
                // let tx = await contract.issue(tokenId, amount, { value: ethers.utils.parseEther("0.5").toString() })




            }

        } catch (error) {
            console.log(error)
        }

    }
    return (
        <VStack w="50%" mx="auto">
            <Input placeholder="TokenId" onChange={e => setTokenId(e.target.value)}></Input>
            <Input placeholder="Amount" onChange={e => setAmount(e.target.value)}></Input>
            <Button onClick={purchase}>Purchase</Button>
            <Button onClick={getTokens}>Get Tokens</Button>
            <Text></Text>
        </VStack>
    )
}
