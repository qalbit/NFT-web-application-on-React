import ax from 'axios';
import React, { useEffect, useState } from 'react';
import CompareResult from '../partials/nft_compare/CompareResult';
import First_Nft_Search from '../partials/nft_compare/First_Nft_Search';
import First_Result from '../partials/nft_compare/First_Result';
import GraphDuration from '../partials/nft_compare/GraphDuration';
import NftComparisionGraph from '../partials/nft_compare/NftComparisionGraph';
import Second_Nft_Search from '../partials/nft_compare/Second_Nft_Search';
import Second_Result from '../partials/nft_compare/Second_Result';
import axios from "../utils/axios";
import { assetUrl } from '../utils/constant';
import requests from '../utils/Requests';

function CompareNfts({myclient}) {
  const [firstCoin, setfirstCoin] = useState(null)  //Input value from Select A
  const [firstSelectedCoin, setfirstSelectedCoin] = useState(null)
  const [firstSelectedCoinDetail, setfirstSelectedCoinDetail] = useState(null)
  const [firstSearchList, setfirstSearchList] = useState(null)
  const [isFirstDeatilLoading, setisFirstDeatilLoading] = useState(false)
  
  const [secondCoin, setsecondCoin] = useState(null)
  const [secondSelectedCoin, setsecondSelectedCoin] = useState(null)
  const [secondSelectedCoinDetail, setsecondSelectedCoinDetail] = useState(null)
  const [secondSearchList, setsecondSearchList] = useState(null)
  const [isSecondDeatilLoading, setisSecondDeatilLoading] = useState(false)
  let firstCoinTimeout = null;
  let secondCoinTimeout = null;


  const [firstNftGraphData, setfirstNftGraphData] = useState(null)
  const [firstNftGraphDataLoading, setfirstNftGraphDataLoading] = useState(false)

  const [secondNftGraphData, setsecondNftGraphData] = useState(null)
  const [secondNftGraphDataLoading, setsecondNftGraphDataLoading] = useState(false)
  const [nftdeatilCancelSourceFirst, setnftdeatilCancelSourceFirst] = useState(null)
  const [nftdeatilCancelSourceSecond, setnftdeatilCancelSourceSecond] = useState(null)

  const [graphDuration, setgraphDuration] = useState('Week')
  const [durationFilter, setDurationFilter] = useState("1 day")

  // https://graphql.icy.tools/graphql
  
  const searchByName = (e) => {
    // console.log(e.target.value);
  }

  // swip the Nft search box
  const swapCoin = () => {
    // setisFirstDeatilLoading(true)
    // setisSecondDeatilLoading(true)

    let temp = firstCoin == null ? '' : firstCoin;
    setfirstCoin(secondCoin == null ? '' : secondCoin)
    setsecondCoin(temp)

    setsecondSelectedCoinDetail(null)
    setfirstSelectedCoinDetail(null)
    
    temp = firstSelectedCoin == null ? '' : firstSelectedCoin;
    setfirstSelectedCoin(secondSelectedCoin == null ? '' : secondSelectedCoin);
    setsecondSelectedCoin(temp);
    
    setsecondNftGraphData(null)
    setfirstNftGraphData(null)

  }
  
  // get seatch data and store in state
  const get_search_data = async (param, callback) => {
    var result = null
    await axios.post(requests.search_nft, {
        name : param
      }).then((result) => {
        callback(result.data.data.data.contracts)
      })
      .catch((error)=>{
        callback(null)
      });
    return result
  }
  
  // get selected nft detail
  const get_selected_nft_details = (address, callback, loading_callback, callback2, loading_callback2, setCancelToken) => {
    let cancelTokenSource1 = ax.CancelToken.source();
    let cancelTokenSource2 = ax.CancelToken.source();
    axios.post(requests.get_nft_detail, {
      address : address.address,
      durationFilter: durationFilter
      }, {
        cancelToken: cancelTokenSource1.token
      }).then((result) => {
        loading_callback(false)
        callback(result.data.data)
      })
      .catch((error)=>{
        loading_callback(false)
      });

    loading_callback2(true);
    axios.post(requests.get_nft_history, {
      address : address.address,
      duration: graphDuration
      }, {
        cancelToken: cancelTokenSource2.token
      }).then(response => response.data)
      .then((result) => {
        callback2({
          average: result.data.average,
          x_axis: result.data.x_axis,
          tooltip: result.data.tooltip,
          floor: result.data.floor,
          ceiling: result.data.ceiling,
          name: result.data.name
        });        // callback2(result.data.data)
        loading_callback2(false);
      })
      .catch((error)=>{
        loading_callback2(false);
      });

      setCancelToken([cancelTokenSource1, cancelTokenSource2]);

  }
  
  // On first coin change
  useEffect(() => {
    if(firstCoin == null || firstCoin == ''){
      setfirstSearchList(null)
    }
    else{
      setfirstSearchList('loading')
      firstCoinTimeout = setTimeout(() => {
        get_search_data(firstCoin, setfirstSearchList);
      }, 500);
    }
    
    return () => {
      clearTimeout(firstCoinTimeout)
    }
  }, [firstCoin])

  // On second coin change
  useEffect(() => {
    if(secondCoin == null || secondCoin == ''){
      setsecondSearchList(null)
    }
    else{
      setsecondSearchList('loading')
      secondCoinTimeout = setTimeout(() => {
        get_search_data(secondCoin, setsecondSearchList);
      }, 500);
    }
    
    return () => {
      clearTimeout(secondCoinTimeout)
    }
  }, [secondCoin])
  

  useEffect(() => {
    if(firstSelectedCoin){
      setfirstNftGraphDataLoading(true)
      axios.post(requests.get_nft_history, {
        address : firstSelectedCoin.address,
        duration: graphDuration
        }).then(response => response.data)
        .then((result) => {
          setfirstNftGraphData({
            average: result.data.average,
            x_axis: result.data.x_axis,
            tooltip: result.data.tooltip,
            floor: result.data.floor,
            ceiling: result.data.ceiling,
            name: result.data.name
          });        // callback2(result.data.data)
          setfirstNftGraphDataLoading(false);
        })
        .catch((error)=>{
          setfirstNftGraphDataLoading(false);
        });
    }

    if(secondSelectedCoin){
      setsecondNftGraphDataLoading(true)
      axios.post(requests.get_nft_history, {
        address : secondSelectedCoin.address,
        duration: graphDuration
        }).then(response => response.data)
        .then((result) => {
          setsecondNftGraphData({
            average: result.data.average,
            x_axis: result.data.x_axis,
            tooltip: result.data.tooltip,
            floor: result.data.floor,
            ceiling: result.data.ceiling,
            name: result.data.name
          });        // callback2(result.data.data)
          setsecondNftGraphDataLoading(false);
        })
        .catch((error)=>{
          setsecondNftGraphDataLoading(false);
        });
    }
  }, [graphDuration])

  useEffect(() => {
    if(firstSelectedCoin != null && firstSelectedCoin != ''){
      setisFirstDeatilLoading(true);
      get_selected_nft_details(
        firstSelectedCoin, 
        setfirstSelectedCoinDetail, 
        setisFirstDeatilLoading, 
        setfirstNftGraphData, 
        setfirstNftGraphDataLoading, 
        setnftdeatilCancelSourceFirst
      )
    }
    else{
      setfirstSelectedCoin(null);
    }
    return () => {
      if(firstSelectedCoin != null && firstSelectedCoin != ''){
        if(nftdeatilCancelSourceFirst){
          nftdeatilCancelSourceFirst.forEach(element => {
            element.cancel('manually');
          });
        }
      }
    }
  }, [firstSelectedCoin, durationFilter])
  
  useEffect(() => {
    // console.log(secondSelectedCoin);
  }, [firstSearchList])

  useEffect(() => {
    if(secondSelectedCoin != null && secondSelectedCoin != ''){
      setisSecondDeatilLoading(true);
      get_selected_nft_details(
        secondSelectedCoin,
        setsecondSelectedCoinDetail,
        setisSecondDeatilLoading,
        setsecondNftGraphData,
        setsecondNftGraphDataLoading,
        setnftdeatilCancelSourceSecond
      )
    }
    else{
      setsecondSelectedCoin(null);
    }
    return () => {
      if(secondSelectedCoin != null && secondSelectedCoin != ''){
        if(nftdeatilCancelSourceSecond){
          nftdeatilCancelSourceSecond.forEach(element => {
            element.cancel('manually');
          });
        }
      }
    }
  }, [secondSelectedCoin, durationFilter])
  
  



  return (
    
    <main className="main-spacing">
    {/*  Submit NFTs form start  */}
    <section className="compare-nft">
        <div className="nft-container">
            <div className="container-lg">
                <div className="row m-0">
                  <div className="col-12">
                    <h1 className="h1-heading">
                      <span><span className="highlight">NFT</span> Analytics Charts</span>
                    </h1>
                  </div>
                    <div className="col-12 heading">
                        <h1> <span className="highlight">Compare</span> NFTs </h1>
                    </div>
                    <div className="col-lg-9 left-block">
                        <div className="compare-nft-form">
                          <form action="" method="post" id="compare-nft-form">
                            <div className="box-modal">
                              <div className="select-group">

    
                              <First_Nft_Search
                                firstCoin={firstCoin}
                                setfirstCoin={setfirstCoin}
                                firstSelectedCoin={firstSelectedCoin}
                                setfirstSelectedCoin={setfirstSelectedCoin}
                                firstSearchList={firstSearchList}
                                setfirstSearchList={setfirstSearchList}
                              />
                                
                                <div className="compare-sign">
                                  <button className='compare-btn' type='button' onClick={swapCoin}>
                                    <img src={assetUrl+"images/compare-icon.png"} alt="Compare icon" />
                                  </button>
                                </div>

                                <Second_Nft_Search
                                  secondCoin={secondCoin}
                                  setsecondCoin={setsecondCoin}
                                  secondSelectedCoin={secondSelectedCoin}
                                  setsecondSelectedCoin={setsecondSelectedCoin}
                                  secondSearchList={secondSearchList}
                                  setsecondSearchList={setsecondSearchList}
                                />
                              </div>

                              <div className="diff-result">
                                  {(firstSelectedCoinDetail || secondSelectedCoinDetail) ? <>
                                    <DurationFilter
                                      durationFilter={durationFilter}
                                      setDurationFilter={setDurationFilter}
                                    />
                                  </>: <></>}
                                <div className="result-containers">


                                  <First_Result 
                                    firstSelectedCoinDetail={firstSelectedCoinDetail}
                                    isFirstDeatilLoading={isFirstDeatilLoading}
                                    />
                                  
                                  <CompareResult 
                                    firstSelectedCoinDetail={firstSelectedCoinDetail}
                                    secondSelectedCoinDetail={secondSelectedCoinDetail}
                                  />

                                  <Second_Result 
                                    secondSelectedCoinDetail={secondSelectedCoinDetail}
                                    isSecondDeatilLoading={isSecondDeatilLoading}
                                  />

                                  
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>

                        <div className="comparison-graph">
                          <GraphDuration 
                            firstNftGraphDataLoading={firstNftGraphDataLoading}
                            secondNftGraphDataLoading={secondNftGraphDataLoading}
                            graphDuration={graphDuration}
                            setgraphDuration={setgraphDuration}
                          />
                          <div className="box-modal">
                            <div className="graph-wrapper">
                              <NftComparisionGraph 
                                firstNftGraphData={firstNftGraphData}
                                secondNftGraphData={secondNftGraphData}
                                firstNftGraphDataLoading={firstNftGraphDataLoading}
                                secondNftGraphDataLoading={secondNftGraphDataLoading}
                                firstSelectedCoinDetail={firstSelectedCoinDetail}
                                secondSelectedCoinDetail={secondSelectedCoinDetail}
                              />
                            </div>
                          </div>
                        </div>
                    </div>
                    <div className="col-lg-3 right-block mt-lg-0 mt-5">
                        <div className="image">
                            <img src={assetUrl+"images/img3.png"} alt="dummy image" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/*  Submit NFTs form end  */}

</main>
  )
}

const DurationFilter = ({
  durationFilter,setDurationFilter
}) => {
  return <>
    <div class="mt-2">
      <div class="form-check-inline">
        <input class="form-check-input" type="radio" name="duratio-filter" id="one-day" 
          onChange={()=>{
            setDurationFilter('1 day')
          }}
          checked={durationFilter == '1 day' ? true: false}
        />
        <label class="form-check-label" htmlFor="one-day">
          24 hour
        </label>
      </div>
      <div class="form-check-inline">
        <input class="form-check-input" type="radio" name="duratio-filter" id="seven-day" 
          onChange={()=>{
            setDurationFilter('7 days')
          }}
          checked={durationFilter == '7 days' ? true: false}
        />
        <label class="form-check-label" htmlFor="seven-day">
          Weekly
        </label>
      </div>
      <div class="form-check-inline">
        <input class="form-check-input" type="radio" name="duratio-filter" id="thirty-day"
          onChange={()=>{
            setDurationFilter('1 month')
          }}
          checked={durationFilter == '1 month' ? true: false}
        />
        <label class="form-check-label" htmlFor="thirty-day">
          Monthly
        </label>
      </div>
    </div>
  </>
}

export default CompareNfts