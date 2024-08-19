import React from 'react'
import { useGetNFTs } from '../hooks/useGetNFTs'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import NFT from '../components/NFT';

function MyProfile() {
  const { getNFTs } = useGetNFTs();
  const {account} = useSelector(state => state.accounts)
  const {accNFTs} = useSelector(state => state.accounts)

  useEffect(() => {
    const work = async () => {
      getNFTs();
    };
    work();
  }, [account]);
    
  return (
    <div>
      <div>
        {accNFTs && accNFTs?.map((nft, index) => {
                  return (
                      <NFT nftData={nft} key={index} />
                  )
                })}
      </div>
    </div>
  )
}

export default MyProfile