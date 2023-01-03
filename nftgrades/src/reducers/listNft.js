const listNft = (state = null, action) => {
    switch (action.type) {
        case "UPDATE_LIST_NFT":
            return action.payload;

        default:
            return state;
    }
};

export default listNft;
