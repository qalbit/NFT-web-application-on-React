import { Slider, Typography } from "@material-ui/core";
import ax from 'axios';
import $ from 'jquery';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listNft } from "../actions";
import axios from "../utils/axios";
import requests from "../utils/Requests";
import MobileNftList from "./MobileNftList";
import NftListItem from "./NftListItem";
import NftRankGraph from "./NftRankGraph";


function NftList() {
  const list_nft = useSelector((state) => state.listNft);
  const dispatch = useDispatch();
  const [is_list_nft_loading, set_is_list_nft_loading] = useState(true);
  const [is_graph_nft_loading, set_is_graph_nft_loading] = useState(true);
  const [nftGraphData, setNftGraphData] = useState(null);
  const [searchAverageSort, setsearchAverageSort] = useState(null)
  const [search_average, setSearch_average] =  useState([0,100]);
  const [filterData, setfilterData] =  useState({});
  const [utilities, setutilities] =  useState(null);
  const [showFilter, setShowFilter] = useState(false)
  const [showMyCustomSelect, setshowMyCustomSelect] = useState(false)
  const [isFilterEnable, setisFilterEnable] = useState(false)

  const rangeSelector = (event, newValue) => {
    setfilterData((prev)=>{
      return {
        ...prev, 
        average : newValue
      }
    });
    setSearch_average(newValue);
  };

  useEffect(() => {
    if(showFilter === true){
      $('.nft-filter-wrapper').slideDown('fast');
    }
    else{
      $('.nft-filter-wrapper').slideUp('fast');
    }

    if(utilities == null && showFilter === true){
      axios
        .get(requests.get_utilities)
        .then((response) => response.data)
        .then((data) => {
          setutilities(data.data);
        })
        .catch(function(error) {
          // set_is_list_nft_loading(false);
        });
    }
  }, [showFilter])
  
  // const showFilter = (e) => {
    
  // };

  const filterChangeHandler = (e) => {
    setfilterData((prev)=>{
      return {
        ...prev, 
        [e.target.name] : e.target.value == '' ? null : e.target.value
      }
    });
  };

  useEffect(()=>{
    
  }, [search_average]);


  useEffect(() => {
    if(showFilter == false){
      set_is_list_nft_loading(true);
      axios
        .get(requests.all)
        .then((response) => response.data)
        .then((data) => {
          set_is_list_nft_loading(false);
          if (data.status === "success") {
            dispatch(listNft(data.data));
            set_is_list_nft_loading(false);
          }
        })
        .catch(function(error) {
          set_is_list_nft_loading(false);
        });
    }

    if(nftGraphData == null){
      axios
        .get(requests.tranding_chart)
        .then((response) => response.data)
        .then((data) => {
          set_is_graph_nft_loading(false);
          setNftGraphData(data.data)
        })
        .catch(function(error) {
          set_is_graph_nft_loading(false);
        });
    }


  }, [showFilter]);

  useEffect(() => {
    if(searchAverageSort){
      setfilterData((prev)=>{
        return {
          ...prev, 
          average_sort : searchAverageSort
        }
      });
    }
  }, [searchAverageSort])

  useEffect(() => {
    let cancelTokenSource = ax.CancelToken.source();

    if(showFilter === true){
      set_is_list_nft_loading(true);
      axios
        .get(requests.filter_nftlists,{
          cancelToken: cancelTokenSource.token,
          params: {
            ...filterData
          }
        })
        .then((response) => response.data)
        .then((data) => {
          set_is_list_nft_loading(false);
          if (data.status === "success") {
            dispatch(listNft(data.data));
          }
        })
        .catch(function(error) {
          if(error.message && error.message != "manually"){
            set_is_list_nft_loading(false);
          }
        });

    }
    
    if(Object.keys(filterData).length == 0){
      setisFilterEnable(false)
    }
    else if((typeof filterData.name == 'undefined' || filterData.name == null) &&
      (typeof filterData.utility == 'undefined' || filterData.utility == null) && 
      (typeof filterData.average == 'undefined' || (filterData.average[0] == 0 && filterData.average[1] == 100) ) && 
      (typeof filterData.average_sort == 'undefined' || filterData.average_sort == null)
    ){
      setisFilterEnable(false)
    }
    else if(Object.values(filterData).length > 0){
      setisFilterEnable(true)
    }
  
    return () => {
      if(showFilter === true){
        cancelTokenSource.cancel('manually');
      }
    }
  }, [filterData])
  
  const [utilities_name, setutilities_name] = useState([]);
  const utilityCheckHandler = (e) => {
    // const {
    //   target: { value },
    // } = event;
    // setutilities_name(
    //   typeof value === 'string' ? value.split(',') : value,
    // );
    // setfilterData((prev)=>{
    //   return {
    //     ...prev, 
    //     utility : value
    //   }
    // });
    if(e.target.checked){

      setfilterData((prev)=>{
          if(typeof prev.utility === 'undefined' || prev.utility == null){
            return {
              ...prev, 
              utility : [e.target.value]
            }
          }
          else{
            let utility = prev.utility;
            return {
              ...prev, 
              utility : [...utility, e.target.value]
            }
          }
      });
    }
    else{
      setfilterData((prev)=>{
        let tempprev = prev.utility.filter((item)=>{
          return e.target.value != item;
        })
        return {
          ...prev,
          utility: tempprev.length > 0 ? tempprev : null
        };

      });
    }


  };
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  

  return (
    <section className="nft-group-section">
      <div className="container-lg">
        <div className="row custom-newnft-row">
          <div className="col-xl-8">
            <div className="new-nft">
              <div>
                <h1 className="h1-heading">
                  <span><span className="highlight">NFT</span> Ranking</span>
                </h1>
              </div>
              <div className="heading">
                <h1 className="new-nft-heading">
                  <span><span className="highlight">New</span> NFTs</span>
                  <button className="btn btn-transparent filter-button" onClick={()=>{
                    if(showFilter) {$('.nft-filter-wrapper').slideToggle('fast')} else{setShowFilter(true)}
                  }}>
                    {isFilterEnable && <><span className="filter_active"></span></>}
                  Filters &nbsp; <i className="fa fa-filter" aria-hidden="true"></i></button>
                </h1>
              </div>

              <div className="nft-filter-wrapper" style={{display: 'none'}}>
                <div className="row">
                  <div className="col-12">
                    <div className="text-right">
                      <button className="cancel-filter" onClick={()=>{ 
                        setShowFilter(false)
                        setfilterData({})
                        $('.my_custom_select_item_container input').prop('checked', false);
                        setsearchAverageSort(null);
                        setSearch_average([0, 100])
                      }}>Reset ×</button>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-12">
                    <div className="form-group mb-0 mt-2">
                      <input type="text" name="name" id="search_nft_detail" className="form-control" placeholder="Search NFTs detail" value={filterData.name || ''} onChange={filterChangeHandler}/>
                      <div className="error-message"></div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-12">
                    <div className="form-group mb-0 mt-3 mt-md-2">
                      <div className="my_custom_select_container" tabIndex={999} 
                        onFocus={()=>{setshowMyCustomSelect(true)}}
                        onBlur={()=>{setshowMyCustomSelect(false)}} >
                        <input type="text" name="utility" id="search_utility" value={filterData.utility ? filterData.utility.join(', ') : ''} className="form-control"  placeholder="Search utility" readOnly/>
                        <div className="my_custom_select_item_container" style={{display: showMyCustomSelect ? 'block': 'none'}} onClick={()=>{document.getElementById('search_utility').focus()}}>
                          {
                            // showMyCustomSelect ? <>
                              <ul>
                                {
                                  utilities && utilities.map((item, index)=>{
                                    return <><li key={index} value={item}>
                                      <label htmlFor={item} className="mb-1">
                                        <input type="checkbox" name="utilities_check[]" id={item} value={item} onChange={utilityCheckHandler}/>
                                        <label htmlFor={item} className="custom-check-label m-0">{item}</label>
                                      </label>

                                      </li></>;
                                  })
                                }
                              </ul>
                          }
                        </div>

                      </div>
                      
                      {/* <select name="" id="" defaultValue={0} className="form-control" name="utility" id="search_utility" onChange={filterChangeHandler}>
                        <option value="0" disabled>Select utilities</option>
                        {
                          utilities && utilities.map((item, index)=>{
                            return <><option key={index} value={item}>{item}</option></>;
                          })
                        }
                      </select> */}



                      {/* <FormControl sx={{ m: 1, width: 300 }} style={{width:'100%'}} variant="standard">
                        <InputLabel id="demo-multiple-checkbox-label" variant="standard"><span className="my-custom-material-select-label">Select utlities</span></InputLabel>
                        <Select
                          labelId="demo-multiple-checkbox-label"
                          id="demo-multiple-checkbox"
                          multiple
                          value={utilities_name}
                          handleChange                        
                          onChange={handleChange}
                          input={<OutlinedInput label="Tag" variant="standard" className="text-white" />}
                          renderValue={(selected) => selected.join(', ')}
                          MenuProps={MenuProps}
                          className="my-custom-material-select"
                        >
                          {utilities && utilities.map((name) => (
                            <MenuItem key={name} value={name}>
                              <Checkbox checked={utilities_name.indexOf(name) > -1} />
                              <ListItemText primary={name} />
                            </MenuItem>
                          ))}
                        </Select>
                    </FormControl> */}


                      <div className="error-message"></div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-12">
                    <div className="form-group mb-0 px-1 mt-3 mt-lg-1">
                      <Typography id="range-slider" className="mb-0" gutterBottom style={{marginTop:'2px'}}>
                        &nbsp;&nbsp;Select Range: ({search_average[0]} - {search_average[1]})
                        <button id="sort_order_button" className="btn btn-transprant text-white p-0 ml-3" onClick={()=>{
                          setsearchAverageSort((prev)=>{
                            return (prev == 'high_to_low') ? 'low_to_high' : 'high_to_low'
                          })
                        }}>
                          {searchAverageSort ?
                          <>
                            {searchAverageSort == 'high_to_low' ? <>
                              <i className="fas fa-sort-amount-down"></i>
                            </> : <>
                              <i className="fas fa-sort-amount-down-alt"></i>
                            </>}
                          </>
                          :<>
                            <i class="fa fa-sort" aria-hidden="true"></i>
                          </>}
                          
                        </button>
                      </Typography>
                      <Slider
                        value={search_average}
                        onChange={rangeSelector}
                        valueLabelDisplay="auto"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="nft-table-wrapper">
                <div className="">
                  <table className="nft-table table table-borderless" id="nft-list-table">
                    <thead id="nft-list-table">
                      <tr>
                        <td className="nft-detail-col">NFTs Details</td>
                        <td>Utility</td>
                        {/* <td>Popularity</td>
                        <td>Community</td>
                        <td>Originality</td> */}
                        <td className="nft-detail-column">
                          Detail
                        </td>
                        <td>Average</td>
                        <td></td>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        is_list_nft_loading ? <>
                          <tr>
                            <td colSpan={6}>
                              <div className="skeleton">
                                <br /><br /><br />
                              </div><br />
                              <div className="skeleton">
                                <br /><br /><br />
                              </div><br />
                              <div className="skeleton">
                                <br /><br /><br />
                              </div><br />
                            </td>
                          </tr>
                        </> : <>
                          {list_nft && list_nft.length ? (
                              
                              list_nft.map((item, index) => {
                                return (
                                    <NftListItem data={item} key={index} />
                                );
                              })
                            
                          ) : (
                            <>
                              <tr>
                                <td colSpan={6}>
                                  <div className="text-center">No record found</div>
                                </td>
                              </tr>
                            </> 
                          )}
                        </>
                      }
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mobile-nft-list">

                {
                  is_list_nft_loading ? 
                  <>
                    <div>
                        <div className="skeleton">
                          <br /><br /><br /><br /><br /><br />
                        </div><br />
                        <div className="skeleton">
                          <br /><br /><br /><br /><br /><br />
                        </div><br />
                        <div className="skeleton">
                          <br /><br /><br /><br /><br /><br />
                        </div><br />
                        <div className="skeleton">
                          <br /><br /><br /><br /><br /><br />
                        </div>
                    </div>
                  </>
                  :
                    list_nft && list_nft.length ? (
                      <>
                        {list_nft.map((item, index) => {
                          return (
                            <div className="user-nft-block-mobile" key={index}>
                              <MobileNftList data={item}/>
                            </div>
                          );
                        })}
                      </>
                    ) : (
                      <>
                        <div>
                            <div className="text-center">No record found</div>
                        </div>
                      </>
                    )
                }
              </div>
            </div>
          </div>
          <div className="col-xl-4">
            <div className="right-block">
              {(nftGraphData == null) ? <>
                <div className="skeleton">
                  <br /><br /><br /><br /><br /><br />
                </div>
              </> :
              <>
                <NftRankGraph graphData={nftGraphData}/>
              </>}
              {/* <div className="gooogle-ads">
                <img src={assetUrl+"images/img1.png"} alt="dummy image" />
                <img src={assetUrl+"images/img2.png"} alt="dummy image" />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NftList;
