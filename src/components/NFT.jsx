import React, {useState} from 'react'
import { useNFTMarketplaceContract } from '../contracts/useNFTMarketplaceContract';

function NFT({nftData}) {

  const { startNFTSale } = useNFTMarketplaceContract();

  const [sellData, setSellData] = useState({price: ""})

  const handleChange = (e) => {
    setSellData({...sellData, [e.target.name] : e.target.value})
  }

  const handleSell = () => {
    startNFTSale(nftData.contract, sellData, nftData.tokenId)
  }

  return (
    <div>
        <p>{nftData.contract}</p>
        <p>{nftData.tokenName}</p>
        <p>{nftData.tokenId}</p>
        <p>{nftData.tokenURI}</p>
        <div>
          <input value={sellData.price} name='price' onChange={handleChange} type="number" placeholder='Price'/>
          <button onClick={handleSell}>SELL</button>
        </div>
    </div>
  )
}

export default NFT;