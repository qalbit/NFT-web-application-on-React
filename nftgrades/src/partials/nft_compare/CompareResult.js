import React, { useEffect, useState } from "react";

function CompareResult({ firstSelectedCoinDetail, secondSelectedCoinDetail }) {
  const [compareResult, setcompareResult] = useState(null);
  useEffect(() => {
    if (firstSelectedCoinDetail != null && secondSelectedCoinDetail != null) {
      if (secondSelectedCoinDetail.stats) {
        var secondSelectedCoinDetail_stats_ceiling =
          secondSelectedCoinDetail.stats.ceiling;
        var secondSelectedCoinDetail_stats_average =
          secondSelectedCoinDetail.stats.average;
        var secondSelectedCoinDetail_stats_volume =
          secondSelectedCoinDetail.stats.volume;
        var secondSelectedCoinDetail_stats_totalSales =
          secondSelectedCoinDetail.stats.totalSales;
      } else {
        // var market_cap_percentage = 0;
        // var average_percentage = 0;
        // var volume_percentage = 0;
        // var totalSales_percentage = 0;
        var secondSelectedCoinDetail_stats_ceiling = 0;
        var secondSelectedCoinDetail_stats_average = 0;
        var secondSelectedCoinDetail_stats_volume = 0;
        var secondSelectedCoinDetail_stats_totalSales = 0;
      }

      if (firstSelectedCoinDetail.stats) {
        var firstSelectedCoinDetail_stats_ceiling =
          firstSelectedCoinDetail.stats.ceiling;
        var firstSelectedCoinDetail_stats_average =
          firstSelectedCoinDetail.stats.average;
        var firstSelectedCoinDetail_stats_volume =
          firstSelectedCoinDetail.stats.volume;
        var firstSelectedCoinDetail_stats_totalSales =
          firstSelectedCoinDetail.stats.totalSales;
      } else {
        var firstSelectedCoinDetail_stats_ceiling = 0;
        var firstSelectedCoinDetail_stats_average = 0;
        var firstSelectedCoinDetail_stats_volume = 0;
        var firstSelectedCoinDetail_stats_totalSales = 0;
      }

      var market_cap_percentage =
        (secondSelectedCoinDetail_stats_ceiling || 0) >
        (firstSelectedCoinDetail_stats_ceiling || 0)
          ? (secondSelectedCoinDetail_stats_ceiling || 0) /
            (firstSelectedCoinDetail_stats_ceiling || 0)
          : (firstSelectedCoinDetail_stats_ceiling || 0) /
            (secondSelectedCoinDetail_stats_ceiling || 0);
      var average_percentage =
        (secondSelectedCoinDetail_stats_average || 0) >
        (firstSelectedCoinDetail_stats_average || 0)
          ? (secondSelectedCoinDetail_stats_average || 0) /
            (firstSelectedCoinDetail_stats_average || 0)
          : (firstSelectedCoinDetail_stats_average || 0) /
            (secondSelectedCoinDetail_stats_average || 0);
      var volume_percentage =
        (secondSelectedCoinDetail_stats_volume || 0) >
        (firstSelectedCoinDetail_stats_volume || 0)
          ? (secondSelectedCoinDetail_stats_volume || 0) /
            (firstSelectedCoinDetail_stats_volume || 0)
          : (firstSelectedCoinDetail_stats_volume || 0) /
            (secondSelectedCoinDetail_stats_volume || 0);
      var totalSales_percentage =
        (secondSelectedCoinDetail_stats_totalSales || 0) >
        (firstSelectedCoinDetail_stats_totalSales || 0)
          ? (secondSelectedCoinDetail_stats_totalSales || 0) /
            (firstSelectedCoinDetail_stats_totalSales || 0)
          : (firstSelectedCoinDetail_stats_totalSales || 0) /
            (secondSelectedCoinDetail_stats_totalSales || 0);

      setcompareResult({
        title: [firstSelectedCoinDetail.name, secondSelectedCoinDetail.name],
        market_cap:
          secondSelectedCoinDetail_stats_ceiling -
          firstSelectedCoinDetail_stats_ceiling,
        market_cap_percentage: market_cap_percentage,
        average:
          secondSelectedCoinDetail_stats_average -
          firstSelectedCoinDetail_stats_average,
        average_percentage: average_percentage,
        volume:
          secondSelectedCoinDetail_stats_volume -
          firstSelectedCoinDetail_stats_volume,
        volume_percentage: volume_percentage,
        totalSales:
          secondSelectedCoinDetail_stats_totalSales -
          firstSelectedCoinDetail_stats_totalSales,
        totalSales_percentage: totalSales_percentage,
      });
    } else {
      setcompareResult(null);
    }
    return () => {};
  }, [firstSelectedCoinDetail, secondSelectedCoinDetail]);

  useEffect(() => {}, [compareResult]);

  //   tubby cats by tubby collective
  return (
    <div className="result-box">
      {compareResult != null ? (
        <>
          <div className="mt-4">
            <div className="box-wrapper">
              <div className="header diff-head">
                <div className="small-heading">Difference</div>
                <h3 className="heading">
                  <span className="nft-name">{compareResult.title[0]}</span>
                  <span className="highlight">vs</span>
                  <span className="nft-name">{compareResult.title[1]}</span>
                </h3>
              </div>
              <div className="body">
                <div className="stats diff-stats">
                  {/* <div className="item">
                    <div className="title">Market Cap</div>
                    <div className="number">
                      {compareResult.market_cap < 0 ? (
                        <>
                          <span className="minus-val">
                            {Math.abs(compareResult.market_cap).toFixed(2)}
                            <small>
                              (
                              {compareResult.market_cap_percentage ==
                                Infinity ||
                              isNaN(compareResult.market_cap_percentage)
                                ? "0"
                                : compareResult.market_cap_percentage.toFixed(
                                    2
                                  )}
                              )
                            </small>
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="plus-val">
                            {Math.abs(compareResult.market_cap).toFixed(2)}{" "}
                            <small>
                              (
                              {compareResult.market_cap_percentage ==
                                Infinity ||
                              isNaN(compareResult.market_cap_percentage)
                                ? "0"
                                : compareResult.market_cap_percentage.toFixed(
                                    2
                                  )}
                              )
                            </small>
                          </span>
                        </>
                      )}
                    </div>
                  </div> */}
                  <div className="item">
                    <div className="title">Average</div>
                    <div className="number">
                      {compareResult.average < 0 ? (
                        <>
                          <span className="minus-val">
                            {Math.abs(compareResult.average).toFixed(2)}{" "}
                            <small>
                              (
                              {compareResult.average_percentage == Infinity ||
                              isNaN(compareResult.average_percentage)
                                ? "0"
                                : compareResult.average_percentage.toFixed(2)}
                              )
                            </small>
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="plus-val">
                            {Math.abs(compareResult.average).toFixed(2)}{" "}
                            <small>
                              (
                              {compareResult.average_percentage == Infinity ||
                              isNaN(compareResult.average_percentage)
                                ? "0"
                                : compareResult.average_percentage.toFixed(2)}
                              )
                            </small>
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="item br-none">
                    <div className="title">Volume</div>
                    <div className="number">
                      {compareResult.volume < 0 ? (
                        <>
                          <span className="minus-val">
                            {Math.abs(compareResult.volume).toFixed(2)}{" "}
                            <small>
                              (
                              {compareResult.volume_percentage == Infinity ||
                              isNaN(compareResult.volume_percentage)
                                ? "0"
                                : compareResult.volume_percentage.toFixed(2)}
                              )
                            </small>
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="plus-val">
                            {Math.abs(compareResult.volume).toFixed(2)}{" "}
                            <small>
                              (
                              {compareResult.volume_percentage == Infinity ||
                              isNaN(compareResult.volume_percentage)
                                ? "0"
                                : compareResult.volume_percentage.toFixed(2)}
                              )
                            </small>
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="item">
                    <div className="title">Sale</div>
                    <div className="number">
                      {compareResult.totalSales < 0 ? (
                        <>
                          <span className="minus-val">
                            {Math.abs(compareResult.totalSales).toFixed()}{" "}
                            <small>
                              (
                              {compareResult.totalSales_percentage ==
                                Infinity ||
                              isNaN(compareResult.totalSales_percentage)
                                ? "0"
                                : compareResult.totalSales_percentage.toFixed(
                                    2
                                  )}
                              )
                            </small>
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="plus-val">
                            {Math.abs(compareResult.totalSales).toFixed()}{" "}
                            <small>
                              (
                              {compareResult.totalSales_percentage ==
                                Infinity ||
                              isNaN(compareResult.totalSales_percentage)
                                ? "0"
                                : compareResult.totalSales_percentage.toFixed(
                                    2
                                  )}
                              )
                            </small>
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="item"></div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default CompareResult;
