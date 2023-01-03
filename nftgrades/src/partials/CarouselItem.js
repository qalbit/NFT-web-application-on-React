import React from "react";
import { calculate_average, calculate_grade } from "../utils/common";
import { nftAssetUrl } from "../utils/constant";
import DotBar from "./DotBar";

function CarouselItem({ data, ...props }) {
  var nft_images = JSON.parse(data.image);
  return (
    <div className="custom-carasol-min-height">
      <div className="carousel-items">
        <div className="item nft-block">
          <div className="content">
            <div className="row m-0">
              <div className="col-5 nft-info-col">
                <div className="nft-info">
                  <div className="image">
                    <a>
                      <img src={nftAssetUrl + nft_images[0]} alt="Nft profile image" height="90px" width="90px" />
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
                </div>
              </div>
              <div className="col-7 nft-stat-col d-flex flex-column justify-content-around">
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

                  {/* <div className="item">
                    <div className="text">
                      <span>NFTs Growth Evaluation</span>
                    </div>
                    <div className="stat">
                      <span>{data.originality || 'NaN'}</span>
                    </div>
                  </div>
                  <div className="item">
                    <div className="text">
                      <span>NFTs Resell Evaluation</span>
                    </div>
                    <div className="stat">
                      <span>{data.originality || 'NaN'}</span>
                    </div>
                  </div>
                  <div className="item">
                    <div className="text">
                      <span>Potential Blue Chip</span>
                    </div>
                    <div className="stat">
                      <span>{data.originality || 'NaN'}</span>
                    </div>
                  </div> */}

                  
                </div>
              </div>
              <div className="col-12 mt-3">
                <div className="nft-stats">
                  <div className="item">
                  </div>
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
                    {/* style={{display: 'block'}} */}
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
                      <span>
                      {calculate_average(data.popularity, data.originality, data.community, data.growth_evaluation, data.resell_evaluation, data.potential_blue_chip)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarouselItem;
