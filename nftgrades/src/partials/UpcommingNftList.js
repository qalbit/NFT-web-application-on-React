import $ from 'jquery';
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import axios from "../utils/axios";
import { nftAssetUrl } from "../utils/constant";
import requests from "../utils/Requests";

function UpcommingNftList() {
  const [upcomming_nft, setupcomming_nft] = useState(false);
  let upcoming_social_media = null;
  useEffect(() => {
    axios
      .get(requests.upcomming_nft)
      .then((response) => response.data)
      .then((data) => {
        setupcomming_nft(data.data);
      })
      .catch(function(error) {});
  }, []);

  // let upcoming_social_media = JSON.parse(data.socialmedia);
  return (
    <>
      <section className="nft-group-section">
        <div className="container-lg">
          <div className="row custom-newnft-row">
            <div className="col-12">
              <div className="new-nft">
                <div className="heading">
                  <h1>
                    <span className="highlight">New</span> NFTs
                  </h1>
                </div>
                <div className="nft-table-wrapper d-block">
                  <div className="table-responsive">
                    <table className="nft-table table table-borderless text-left" id="nft-list-table">
                      <thead id="nft-list-table">
                        <tr>
                          <td>#</td>
                          <td className="nft-detail-col">Project name</td>
                          <td>Network</td>
                          <td className="nft-detail-column">Launch date</td>
                          <td></td>
                        </tr>
                      </thead>
                      <tbody>
                        {upcomming_nft ? (
                          upcomming_nft.map(function(item, index) {
                              return (
                                <>
                                  <tr className="border-0" key={uuidv4()}>
                                    <td>{index+1}</td>
                                    <td>{item.project_name}</td>
                                    <td>{item.network || 'NaN'}</td>
                                    <td>
                                      { item.release_date } { item.release_time }
                                    </td>
                                    <td><a className='highlight imp bold-14' 
                                      onClick={
                                        (e)=>{
                                          if(e.target.innerHTML == "Read more"){
                                            $('#desc'+index).slideDown('fast');
                                            e.target.innerHTML = "Read less";
                                          }
                                          else{
                                            $('#desc'+index).slideUp('fast');
                                            e.target.innerHTML = "Read more";
                                          }
                                        }
                                      }
                                    >Read more</a></td>
                                  </tr>
                                  <tr key={uuidv4()}>
                                    <td colSpan={5} className="text-left py-0 px-2">
                                      <div id={'desc'+index} style={{display: 'none'}}>
                                        <div className="social">
                                          <span className="highlight"> Social media: </span>
                                            {
                                              (item.socialmedia) ?  
                                                JSON.parse(item.socialmedia).map((item, index) => {
                                                    return <a href={item.media_link} key={uuidv4()} target="_blank" rel="noopener noreferrer" className={item.media}><i className={"fab fa-"+item.media}></i></a>
                                                })
                                              :<></>
                                            }
                                            {/* <span className="font-weight-normal"> {item.socialmedia} </span> */}
                                        </div>
                                        <div className="description">
                                          <span className="highlight"> Description: </span>
                                          <span className="font-weight-normal"> {item.briefdescription} </span>
                                        </div>
                                        <div className="description">
                                          <span className="highlight"> Unit price eth: </span>
                                          <span className="font-weight-normal"> {item.unit_price_eth || 'NaN'} </span>
                                        </div>
                                        <div className='nft-images'>
                                              {
                                                (item.images) ?
                                                  <>
                                                  <span className='highlight'>Images: </span>
                                                    <div>
                                                  {
                                                    JSON.parse(item.images).map((item, index)=>{
                                                      return <a href={nftAssetUrl+item} key={uuidv4()} target={"_blank"}>
                                                              <img src={nftAssetUrl+item} alt="User profile image" width="100px" className='mr-2' />
                                                          </a>
                                                    })
                                                  }
                                                  </div>
                                                  </>
                                                  :<></>
                                              }
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                </>
                              );
                            })
                        ) : (
                            <tr key={uuidv4()}>
                              <td colSpan={5}>
                                <div className='skeleton'>
                                  <br /><br />
                                </div>
                                <br />
                                <div className='skeleton'>
                                  <br /><br />
                                </div>
                                <br />
                                <div className='skeleton'>
                                  <br /><br />
                                </div>
                              </td>
                            </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mobile-nft-list"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default UpcommingNftList;
