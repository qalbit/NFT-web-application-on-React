import React from "react";
import { assetUrl } from "../../utils/constant";

function First_Result({firstSelectedCoinDetail,isFirstDeatilLoading}) {

    if(isFirstDeatilLoading == true){
        return <div className="result-box">
          <div className="mt-4">
            <div className="box-wrapper bg-transparent">
                <div className="nftdetail-loading">
                    
                </div>
            </div>
          </div>
        </div>
    }
    if(firstSelectedCoinDetail == null || firstSelectedCoinDetail == ''){
        return (
            <div className="result-box"></div>
        );   
    }
  return (
    <div className="result-box">
      <div className="mt-4">
        <div className="box-wrapper">
          <div className="header">
            <div className="image">
              {firstSelectedCoinDetail && firstSelectedCoinDetail.unsafeOpenseaImageUrl  ? (
                <>
                  <img src={firstSelectedCoinDetail.unsafeOpenseaImageUrl} alt="User image" height="62" width="62" />
                </>
              ) : (
                <>
                  <img src={assetUrl + "images/user-dp.png"} alt="User image" height="62" width="62" />
                </>
              )}
            </div>
            <h3>{firstSelectedCoinDetail && firstSelectedCoinDetail.name ? firstSelectedCoinDetail.name : "NaN"}</h3>
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
                  {firstSelectedCoinDetail && firstSelectedCoinDetail.stats
                    ? firstSelectedCoinDetail.stats.volume.toFixed(2)
                    : "0"}
                </div>
              </div>
              <div className="item br-none">
                <div className="title">Average</div>
                <div className="number">
                  {firstSelectedCoinDetail && firstSelectedCoinDetail.stats
                    ? firstSelectedCoinDetail.stats.average.toFixed(2)
                    : "0"}
                </div>
              </div>
              <div className="item">
                <div className="title">Floor</div>
                <div className="number">
                  {firstSelectedCoinDetail && firstSelectedCoinDetail.stats ? firstSelectedCoinDetail.stats.floor.toFixed(2) : "0"}
                </div>
              </div>
              <div className="item">
                <div className="title">Sale</div>
                <div className="number">
                  {firstSelectedCoinDetail && firstSelectedCoinDetail.stats
                    ? firstSelectedCoinDetail.stats.totalSales
                    : "0"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default First_Result;
