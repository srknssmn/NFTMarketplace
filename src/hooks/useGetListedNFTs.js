import { Network, Alchemy } from "alchemy-sdk";
import { NFTMarketplace_ABI } from "../constants/abi";
import { NFTMarketplace_ADDRESS } from "../constants/address";
import { ethers } from "ethers";
import { useSelector, useDispatch } from "react-redux";
import { setListedNFTs } from "../store/slicers/accounts";
import { getTokenUri } from "../utils/getTokenUri";


export const useGetListedNFTs = () => {

    const dispatch = useDispatch();
    const {account} = useSelector(state => state.accounts)
    
    const getListedNFTs = async () => {

        if (account) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(NFTMarketplace_ADDRESS, NFTMarketplace_ABI, signer);
        
            const numberListedNFTs = await contract.idForSale();

            if (!(numberListedNFTs > 0)) {
                return;
            }

            let listedNFTsArray = []

            for (let i = 0; i < numberListedNFTs; i++) {
                let info = await contract.idToItemForSale(i)

                if(!info.state) {
                    let newItem = {
                        0: info.contractAddress,
                        1: info.tokenId.toString(),
                        2: info.price.toString(),
                        3: info.seller,
                        4: i
                    }
                    await listedNFTsArray.push(newItem)
                }
            }
            console.log(listedNFTsArray)
            dispatch(setListedNFTs(listedNFTsArray))
        
        }
    };

    return {
        getListedNFTs
      };
}