import React from 'react'
import { useGetListedNFTs } from '../hooks/useGetListedNFTs';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ListedNFT from '../components/ListedNFT';

function ListedItems() {
  const { getListedNFTs } = useGetListedNFTs();
  const {listedNFTs} = useSelector(state => state.accounts)

  useEffect(() => {
    const work = async () => {
      getListedNFTs();
    };
    work();
  }, []);

  return (
    <div>
      <div>
        {listedNFTs && listedNFTs?.map((nft, index) => {
          return (
              <ListedNFT nftData={nft} key={index} />
          )
        })}
      </div>
    </div>
  )
}

export default ListedItems