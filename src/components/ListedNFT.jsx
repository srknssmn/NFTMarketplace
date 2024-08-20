import React from 'react'

function ListedNFT({nftData}) {
  return (
    <div>
        <p>NFT Contract: {nftData[0]}</p>
        <p>NFT TokenID: {nftData[1]}</p>
        <p>Price: {nftData[2]} ETH</p>
    </div>
  )
}

export default ListedNFT;