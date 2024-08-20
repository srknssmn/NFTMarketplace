import React from 'react'
import { useNFTMarketplaceContract } from '../contracts/useNFTMarketplaceContract';
import { useSelector } from 'react-redux';

function ListedNFT({nftData}) {
  const {account} = useSelector(state => state.accounts)
  const { buyNFT, cancelNFTSale } = useNFTMarketplaceContract();
  
  return (
    <div>
        <p>NFT Contract: {nftData[0]}</p>
        <p>NFT TokenID: {nftData[1]}</p>
        <p>Seller: {nftData[3]}</p>
        <p>Price: {nftData[2]} ETH</p>
        <div>
        <button onClick={() => {buyNFT(nftData[3], nftData[2])}}>BUY</button>
            {
            (() => {

                if (nftData[3].toLowerCase() == account){
                  console.log("deneme")
                    return (
                      <button onClick={() => {cancelNFTSale(nftData[4])}}>CANCEL</button>
                    )
                }
                })()
            }

        </div> 
    </div>
  )
}

export default ListedNFT;