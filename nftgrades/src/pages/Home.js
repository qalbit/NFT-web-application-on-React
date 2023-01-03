import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { trendingNft } from '../actions/index';
import NftList from '../partials/NftList';
import TrendingNfts from '../partials/TrendingNfts';
import axios from '../utils/axios';
import requests from '../utils/Requests';
function Home() {
    const trending_nft = useSelector(state => state.trendingNft)
    const dispatch = useDispatch();
    const [is_trending_nft_loading, set_is_trending_nft_loading] = useState(true)
    
    useEffect(() => {
        axios.get(requests.trending_nft)
            .then(response => response.data)
            .then((data)=>{
                set_is_trending_nft_loading(false);
                if(data.status === 'success'){
                    dispatch(trendingNft(data.data));
                    set_is_trending_nft_loading(false);
                }
            })
            .catch(function (error) {
                set_is_trending_nft_loading(false);
            })
    }, [])

    return (
        <div>
            <main className="main-spacing">
                <TrendingNfts data={trending_nft} is_trending_nft_loading={is_trending_nft_loading}/>
                <NftList />
            </main>
        </div>
    )
}

export default Home
