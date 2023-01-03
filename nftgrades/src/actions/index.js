export const updateDefaultjob = (data = null) => {
    return {
        type: "UPDATE_DEFAULT_JOB",
        payload: data,
    };
};
export const updateCounter = (data = null) => {
    return {
        type: "UPDATE_COUNTER",
        payload: data,
    };
};

export const trendingNft = (data = null) => {
    return {
        type: "UPDATE_TRENDING_NFT",
        payload: data,
    };
};
export const listNft = (data = null) => {
    return {
        type: "UPDATE_LIST_NFT",
        payload: data,
    };
};