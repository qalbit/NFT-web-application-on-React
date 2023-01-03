const trendingNft = (state = null, action) => {
    switch (action.type) {
        case "UPDATE_TRENDING_NFT":
            return action.payload;

        default:
            return state;
    }
};

export default trendingNft;
