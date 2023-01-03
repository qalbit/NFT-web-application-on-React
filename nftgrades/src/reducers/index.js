import { combineReducers } from "redux";
import listNft from "./listNft";
// import defaultJobReducere from "./defaultJob";
// import updateCounter from "./updateCounter";
import trendingNft from "./trendingNft";
const allReducres = combineReducers({
    trendingNft: trendingNft,
    listNft: listNft
});

export default allReducres;
