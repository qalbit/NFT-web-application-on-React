import React from "react";
import { assetUrl } from "../../utils/constant";

function Second_Result({secondSelectedCoinDetail,isSecondDeatilLoading}) {

    if(isSecondDeatilLoading == true){
        return <div className="result-box">
          <div className="mt-4">
            <div className="box-wrapper bg-transparent">
                <div className="nftdetail-loading">
                    
                </div>
            </div>
          </div>
    </div>
    }
    if(secondSelectedCoinDetail == null || secondSelectedCoinDetail == ''){
        return (
            <div className="result-box"></div>
        ); 
    }
  return (
    <div className="result-box last-box">
      <div className="mt-4">
        <div className="box-wrapper">
          <div className="header">
            <div className="image">
              {secondSelectedCoinDetail && secondSelectedCoinDetail.unsafeOpenseaImageUrl ? (
                <>
                  <img src={secondSelectedCoinDetail.unsafeOpenseaImageUrl} alt="User image" height="62" width="62" />
                </>
              ) : (
                <>
                  <img src={assetUrl + "images/user-dp.png"} alt="User image" height="62" width="62" />
                </>
              )}
            </div>
            <h3>{secondSelectedCoinDetail && secondSelectedCoinDetail.name ? secondSelectedCoinDetail.name : "NaN"}</h3>
          </div>
          <div className="body">
            <div className="stats">
              {/* <div className="item">
                <div className="title">Market Cap</div>
                <div className="number"> -
                </div>
              </div> */}
              <div className="item">
                <div className="title">Volume</div>
                <div className="number">
                  {secondSelectedCoinDetail && secondSelectedCoinDetail.stats
                    ? secondSelectedCoinDetail.stats.volume.toFixed(2)
                    : "0"}
                </div>
              </div>
              <div className="item br-none">
                <div className="title">Average</div>
                <div className="number">
                  {secondSelectedCoinDetail && secondSelectedCoinDetail.stats
                    ? secondSelectedCoinDetail.stats.average.toFixed(2)
                    : "0"}
                </div>
              </div>
              <div className="item">
                <div className="title">Floor</div>
                <div className="number">
                  {secondSelectedCoinDetail && secondSelectedCoinDetail.stats
                    ? secondSelectedCoinDetail.stats.floor.toFixed(2)
                    : "0"}
                </div>
              </div>
              <div className="item">
                <div className="title">Sale</div>
                <div className="number">
                  {secondSelectedCoinDetail && secondSelectedCoinDetail.stats
                    ? secondSelectedCoinDetail.stats.totalSales
                    : "0"}
                </div>
              </div>
              {/* <div className="item"></div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Second_Result;
