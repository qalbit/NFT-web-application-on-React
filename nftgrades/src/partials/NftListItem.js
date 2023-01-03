import $ from 'jquery';
import React from "react";
import { v4 as uuidv4 } from 'uuid';
import axios from "../utils/axios";
import { calculate_average, calculate_grade } from '../utils/common';
import { nftAssetUrl } from "../utils/constant";
import requests from "../utils/Requests";
import DotBar from './DotBar';

var liked = JSON.parse(localStorage.getItem('likedItems'));
if(liked == null){
  liked = [];
}
function NftListItem({ data, uniquekey, ...props }) {
  
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

  var nft_images = JSON.parse(data.image);

  return (
      <>
          <tr key={uuidv4()} className='border-0'>
            <td>
              <div className="nft-detail">
                <div className="image">

                  {
                    (nft_images && nft_images.length) > 0 ? <>
                        <a href={nftAssetUrl+nft_images[0]} target={"_blank"}>
                            <img src={nftAssetUrl+nft_images[0]} alt="User profile image" width="90px" height="90px" />
                        </a>
                    </>
                    :
                    <>
                    </>
                  }

                  {/* {
                    data.image && <>
                      {
                        nft_images.map((item, index)=>{
                          return <>
                              <a href={nftAssetUrl+item} target={"_blank"}>
                                  <img src={nftAssetUrl+item} alt="User profile image" width="90px" height="90px" />
                              </a>
                            </>
                        })
                      }
                    </>
                  } */}
                </div>
                <div className="nft-content">
                    <div className="nft-name">
                        <span>{data.nft_name}</span>
                    </div>
                    {/* <div className="nft-user-name">
                        <span>{data.fname}</span>
                    </div> */}
                    <div className="nft-detail-btn">
                        <a href={data.nft_link} target={'_blank'}>
                            <i className="fas fa-external-link-alt"></i> Visit now
                        </a>
                    </div>
                    <div>
                        <a onClick={
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
                        } className="highlight imp bold-14 mt-2">Read more</a>
                    </div>
                </div>
            </div>
            
            </td>
            <td>{data.utility}</td>
            <td>
              <div>
                <div className="table-detail-column-data">
                  <span className="text-left">% NFTs Sold</span>
                  <span className="color-orange">{calculate_grade(data.popularity)}</span>
                </div>
                <div className="table-detail-column-data">
                  <span className="text-left">Social media</span>
                  <span className="color-orange">{calculate_grade(data.community)}</span>
                </div>
                <div className="table-detail-column-data">
                  <span className="text-left">Design</span>
                  <span className="color-orange">{calculate_grade(data.originality)}</span>
                </div> 

                <div className="table-detail-column-data">
                  <span className="text-left">NFTs Growth Evaluation</span>
                  <span className="color-orange">{data.growth_evaluation || "0"}</span>
                </div>            
                <div className="table-detail-column-data">
                  <span className="text-left">NFTs Resell Evaluation</span>
                  <span className="color-orange">{data.resell_evaluation || "0"}</span>
                </div>            
                <div className="table-detail-column-data">
                  <div className="text-left">Potential Blue Chip </div>
                  <div className="potential-blue-chip-graph text-left">
                    <DotBar bars={data.potential_blue_chip} />
                  </div>
                </div>            
              </div>
            </td>
            <td>{calculate_average(data.popularity, data.originality, data.community, data.growth_evaluation, data.resell_evaluation, data.potential_blue_chip)}</td>
            <td>
                <div className="action-btns">
                  <div>
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
            </td>
          </tr>
          <tr key={uuidv4()} className="text-left">
            <td colSpan={6} className="p-0">
              <div className={"more-detail"+data.id} style={{display: 'none'}}>

                {
                  (data.twitter_link || data.discord_link) ? <>
                    <div className='social-media mb-2'>
                        <span className='highlight'>Social media: </span> 
                        <span>
                          {data.twitter_link && <a href={data.twitter_link} target="_blank" rel="noopener noreferrer" className='twitter'><i className="fab fa-twitter"></i></a>}
                          {data.discord_link && <a href={data.discord_link} target="_blank" rel="noopener noreferrer" className='discord'><i className="fab fa-discord"></i></a>}
                        </span>
                    </div>
                  </>
                  :<>
                  </>
                }
                <div className='other-detail'>
                    <div className='mb-2'>
                      <span className='highlight'>Collection blockchain: </span> <span>{data.collection_blockchain  || 'NaN'}</span>
                    </div>
                    <div className='mb-2'>
                      <span className='highlight'>Maximum number in collection: </span> <span>{data.maximum_number_in_collection || 'NaN'}</span>
                    </div>
                </div>
                <div className='nft-images'>
                  <span className='highlight'>Images: </span>
                    <div>
                      {
                          nft_images.map((item, index)=>{
                            return <a href={nftAssetUrl+item} key={index} target={"_blank"}>
                                    <img src={nftAssetUrl+item} alt="User profile image" width="90px" />
                                </a>
                          })
                        }
                    </div>
                </div>
              </div>
            </td>     
          </tr>
      </>
  );
}

export default NftListItem;
