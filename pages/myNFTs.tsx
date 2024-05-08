import React, { useContext, useEffect, useState } from "react";
import { useSpinner } from "@components/common/SpinnerContext";
import { getMarketContract } from "./api/blockchainService";
import { convertMarketItemStructs2MarketItems } from "../utils";
import { MarketItem } from "./nftindex";

import NFTCard from "@components/NFTCard";
import { BlockchainContext } from "../context/BlockchainContext";

import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import NFTNavHeader from '@components/NFTNavHeader';
import LeftNav from '@components/LeftNav';

import FooterMain from '@components/FooterMain';
import AllScript from './AllScript';

function MyNFTs({user}) {
  const { getProvider } = useContext(BlockchainContext);

  const { showSpinner, hideSpinner } = useSpinner();
  const [nfts, setNFTs] = useState<MarketItem[]>();
  useEffect(() => {
    showSpinner();
    fetchMyNFTs();
  }, []);

  async function fetchMyNFTs() {
    const provider = await getProvider();
    if (!provider) {
      hideSpinner();
      return;
    }

    const signer = provider.getSigner();

    const marketContract = getMarketContract(signer);
    const marketNFTs = await marketContract.getMyNFTs();
    const myNFTs = await convertMarketItemStructs2MarketItems(marketNFTs);
    setNFTs(myNFTs);
    hideSpinner();
  }

  return (

    <>

      <MetaDash />

      <SignedHeader user={user} />

      <LeftNav user={user} />

      <div className="main_middle profile_middle">

      <NFTNavHeader user={user}/>

    <div className="container mx-auto mt-28">
      <h1 className="text-4xl font-semibold text-center ">
        My <span className="text-primary">NTFs</span>
      </h1>
      <div className="grid grid-cols-1 gap-10 py-8 md:grid-cols-2 lg:grid-cols-3">
        {nfts && nfts.length > 0 ? (
          nfts.map((nft: MarketItem) => <NFTCard key={nft.itemId} nft={nft} />)
        ) : (
          <div>You don&apos;t have a NFT yet</div>
        )}
      </div>
    </div>



      </div>

      <AllScript />

    </>



  );
}

export default MyNFTs;
