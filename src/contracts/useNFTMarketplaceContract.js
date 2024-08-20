import { NFTMarketplace_ABI } from "../constants/abi";
import { NFTMarketplace_ADDRESS } from "../constants/address";
import { ethers } from "ethers";
import { useERC721Contract } from "./useERC721Contract";
import { useGetListedNFTs } from '../hooks/useGetListedNFTs';
import { useGetNFTs } from '../hooks/useGetNFTs'

export const useNFTMarketplaceContract = () => {

    const { getListedNFTs } = useGetListedNFTs();
    const { getNFTs } = useGetNFTs();

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(NFTMarketplace_ADDRESS, NFTMarketplace_ABI, signer);
    

    const startNFTSale = async (_contractAddress, _price, _tokenId) => {

        console.log(_contractAddress, _price.price, _tokenId)

        // let priceValue = await String(_price.price)
        const priceValue = await ethers.utils.parseEther(_price.price)

        let NFTContract = await useERC721Contract(_contractAddress)

        const state = await NFTContract.getApproved(_tokenId)

        if (state !== NFTMarketplace_ADDRESS.toString()) {
            const txn = await NFTContract.approve(NFTMarketplace_ADDRESS.toString(), _tokenId);
            await txn.wait()
        }

        const txh = await contract.startNFTSale(_contractAddress, _price.price, _tokenId);
        await txh.wait();
        const hash = await txh.hash
        console.log(hash)
        await getNFTs();
    }

    const cancelNFTSale = async (_id) => {
        const txh = await contract.cancelNFTSale(_id);
        await txh.wait();
        const hash = await txh.hash
        console.log(hash)

        await getListedNFTs();
    }

    const buyNFT = async (_id, _price) => {
        console.log(_price)
        let priceValue = await String(_price)
        const _value = ethers.utils.parseEther(priceValue)
        console.log(_value)
        const txh = await contract.buyNFT(_id, {value: _value});
        await txh.wait();
        const hash = await txh.hash
        console.log(hash)

        await getListedNFTs();
    }

    return {startNFTSale, buyNFT, cancelNFTSale}

};