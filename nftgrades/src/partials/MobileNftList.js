import $ from 'jquery';
import React from "react";
import axios from "../utils/axios";
import { calculate_average, calculate_grade } from '../utils/common';
import { nftAssetUrl } from "../utils/constant";
import requests from "../utils/Requests";
import DotBar from './DotBar';

var liked = JSON.parse(localStorage.getItem('likedItems'));
if(liked == null){
  liked = [];
}

function MobileNftList({data, ...props}) { 
  
  const addLike = (id, totalLike) => {
    liked.push(id)
    localStorage.setItem('likedItems', JSON.stringify(liked))

    let elm = document.getElementsByClassName('like'+id)[0];
    elm.closest('td').getElementsByClassName('count')[0].innerHTML = totalLike+1
    elm.getElementsByTagName('span')[0].innerHTML = 'Liked&nbsp;'
    elm.classList.remove('like')
    elm.classList.add('liked')
    
    let elm2 = document.getElementsByClassName('like'+id)[1];
    elm2.closest('.mobile-like-container').getElementsByClassName('count')[0].innerHTML = totalLike+1
    elm2.getElementsByTagName('span')[0].innerHTML = 'Liked&nbsp;'
    elm2.classList.remove('like')
    elm2.classList.add('liked')

  }
  

  const likeNft = (id, totalLike) => {
    if(!liked.includes(id)){
      axios.post(requests.do_like, {
        id: id
      } )
        .then(response => response.data)
        .then((data)=>{
          addLike(id, totalLike)
        })
        .catch(function (error) {})
    }
  }

  let nft_images = JSON.parse(data.image);
  return (
    <div>
      <div className="content">
        <div className="row m-0">
          <div className="col-5 nft-info-col">
            <div className="nft-info">
              <div className="image">
                <a>
                  <img src={nftAssetUrl+nft_images[0]} alt="Nft profile image" height="90px" width="90px" />
                </a>
              </div>
              <div className="nft-title">
                <h2 className="highlight">{data.nft_name}</h2>
              </div>
              <div className="nft-user">
                <h3 className="peak">{data.fname}</h3>
              </div>
              <div className="nft-redirect-btn">
                <a href={data.nft_link} target={"_blank"}>
                  <i className="fas fa-external-link-alt"></i> Visit now
                </a>
              </div>
              <div>
                <a className="highlight imp bold-14 mt-2" onClick={
                  (e)=>{
                    e.preventDefault();
                    if(e.target.innerHTML == "Read more"){
                      $(".more-detail"+data.id).slideDown('fast');
                      e.target.innerHTML = "Read less";
                    }
                    else{
                      $(".more-detail"+data.id).slideUp('fast');
                      e.target.innerHTML = "Read more";
                    }
                  }
                }>Read more</a>
              </div>
            </div>
          </div>
          <div className="col-7 nft-stat-col">
          <div className="action-btns">
              <div className="mb-2 mobile-like-container">
                <button className="total_liks_count">
                  <i className="fas fa-heart"></i> <span className="count">{data.total_likes}</span>
                </button>
                {
                  liked.includes(data.id) ? <>
                    <button className="action liked">
                      <span>
                      Liked&nbsp;
                      </span>
                      <i className="fas fa-thumbs-up"></i>
                      <i className="fas fa-thumbs-up shadow"></i>
                    </button>
                  </> : <>
                    <button className={"action like "+ 'like'+data.id} onClick={()=>likeNft(data.id, data.total_likes)}>
                      <span>
                        Like&nbsp;
                      </span>
                      <i className="fas fa-thumbs-up"></i>
                      <i className="fas fa-thumbs-up shadow"></i>
                    </button>
                  </>
                }
              </div>
            </div>
            <div className="nft-stats">
              <div className="item">
                <div className="text">
                  <span>% NFTs Sold</span>
                </div>
                <div className="stat">
                  <span>{calculate_grade(data.popularity)}</span>
                </div>
              </div>
              <div className="item">
                <div className="text">
                  <span>Social media</span>
                </div>
                <div className="stat">
                  <span>{calculate_grade(data.community)}</span>
                </div>
              </div>
              <div className="item">
                <div className="text">
                  <span>Design</span>
                </div>
                <div className="stat">
                  <span>{calculate_grade(data.originality)}</span>
                </div>
              </div>
              
            </div>
            
          </div>
          
          <div className="col-12 mt-2">
            <div className="nft-stats">
              <div className="item"></div>
              <div className="item">
                <div className="text">
                  <span>NFTs Growth Evaluation</span>
                </div>
                <div className="stat">
                  <span>{data.growth_evaluation || "0"}</span>
                </div>
              </div>
              <div className="item">
                <div className="text">
                  <span>NFTs Resell Evaluation</span>
                </div>
                <div className="stat">
                  <span>{data.resell_evaluation || "0"}</span>
                </div>
              </div>
              <div className="item">
                <div className="text">
                  <span>Potential Blue Chip</span>
                </div>
                <div className="stat">
                  <div className="potential-blue-chip-graph">
                    <DotBar bars={data.potential_blue_chip} />
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="text">
                  <span>Average</span>
                </div>
                <div className="stat">
                  <span>{calculate_average(data.popularity, data.originality, data.community, data.growth_evaluation, data.resell_evaluation, data.potential_blue_chip)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12">
              <div className={"mobile-more-detail more-detail"+data.id} style={{display:'none'}}>
                <div className="social-media my-2">
                  <span className="highlight">Social media: </span>
                  <span>
                    {data.twitter_link && <a href={data.twitter_link} target="_blank" rel="noopener noreferrer" className='twitter'><i className="fab fa-twitter"></i></a>}
                    {data.discord_link && <a href={data.discord_link} target="_blank" rel="noopener noreferrer" className='discord'><i className="fab fa-discord"></i></a>}
                  </span>
                </div>  
                <div className="mb-2">
                  <span className='highlight'>Collection blockchain: </span> <span>{data.collection_blockchain  || 'NaN'}</span>
                </div>
                <div className="mb-2">
                  <span className='highlight'>Maximum number in collection: </span> <span>{data.maximum_number_in_collection || 'NaN'}</span>
                </div>
                <div className='nft-images'>
                  <span className='highlight'>Images: </span>
                    <div>
                      {
                          nft_images.map((item, index)=>{
                            return <a href={nftAssetUrl+item} key={index} target={"_blank"}>
                                    <img src={nftAssetUrl+item} alt="User profile image" width="50px" />
                                </a>
                          })
                        }
                    </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileNftList;
