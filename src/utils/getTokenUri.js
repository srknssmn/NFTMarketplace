import { useERC721Contract } from "../contracts/useERC721Contract";

export const getTokenUri = async (address, tokenId) => {

    let contract = await useERC721Contract(address)
    let tokenURI = await contract.tokenURI(tokenId)
    
    return tokenURI;
}