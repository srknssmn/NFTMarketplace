import React from 'react'

function NFT({nftData}) {
  return (
    <div>
        <p>{nftData.contract}</p>
        <p>{nftData.tokenName}</p>
        <p>{nftData.tokenId}</p>
        <p>{nftData.tokenURI}</p>
    </div>
  )
}

export default NFT;