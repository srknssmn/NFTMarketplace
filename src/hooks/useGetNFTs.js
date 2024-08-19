import { Network, Alchemy } from "alchemy-sdk";
import { useSelector, useDispatch } from "react-redux";
import { setMyNFTs } from "../store/slicers/accounts";
import axios from 'axios';
import { getTokenUri } from "../utils/getTokenUri";


export const useGetNFTs = () => {

    const dispatch = useDispatch();
    const {account} = useSelector(state => state.accounts)

    // // Optional Config object, but defaults to demo api-key and eth-mainnet.
    // const settings = {
    //     apiKey: "ncP3LX3a7bw3JjX3Rb0KwpE7YFVGazWI", // Replace with your Alchemy API Key.
    //     network: Network.ETH_SEPOLIA, // Replace with your network.
    // };

    // const alchemy = new Alchemy(settings);
    
    const getNFTs = async () => {
        if (account) {

            // const nftsForOwner = await alchemy.nft.getNftsForOwner(account);
            // dispatch(setMyNFTs(nftsForOwner))

            const response = await axios.get(`https://api.scrollscan.com/api?module=account&action=tokennfttx&address=${account}&startblock=0&endblock=27025780&sort=asc&apikey=QA7NERXTM4BIHBYHKP9XJEGI6AXH8CYIX6`); 

            const dataArray = []

            for(let i = 0; i < response.data.result.length; i++) {
                if (response.data.result[i].from !== "0xa0bb394be5cc8783bd1f00e3843088791b5242a7") {
                    let tokenURI = await getTokenUri(response.data.result[i].contractAddress, response.data.result[i].tokenID)

                    await dataArray.push({
                        contract: response.data.result[i].contractAddress,
                        tokenId: response.data.result[i].tokenID,
                        tokenName: response.data.result[i].tokenName,
                        tokenURI: tokenURI
                    })
                }
            }
            await dispatch(setMyNFTs(dataArray))
            console.log(dataArray)
        }
    };

    return {
        getNFTs,
      };
    
}