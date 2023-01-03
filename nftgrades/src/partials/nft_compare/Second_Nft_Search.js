import React, { useState } from "react";
import { assetUrl } from "../../utils/constant";

function Second_Nft_Search({
  secondCoin,
  setsecondCoin,
  secondSelectedCoin,
  setsecondSelectedCoin,
  secondSearchList,
  setsecondSearchList,
  ...prop
}) {
  const [showsecondlist, setshowsecondlist] = useState(false);

  return (
    <div
      className="form-group nft-search-container"
    >
      <label>Select B</label>

      <div
        tabIndex={1}
        onFocus={() => {
          setshowsecondlist(true);
        }}
        onBlur={() => {
          setshowsecondlist(false);
        }}
      >
        <input
          type="text"
          name="select_b"
          id="select_b"
          value={secondCoin}
          className="form-control"
          placeholder="Eg. Etherneum"
          onChange={(e) => {
            if (e.target.value == "") {
              setsecondCoin(null);
            } else {
              setsecondCoin(e.target.value);
            }
          }}
          autoComplete="off"
        />

        <div
          className="nft-search-result-container second"
          style={{ display: secondSearchList == null || !showsecondlist ? "none" : "block" }}
        >
          {secondSearchList != null ? (
            <>
              {secondSearchList == "loading" ? (
                <>
                  <ul>
                    <li>
                      <div className="text-center">Loading...</div>
                    </li>
                  </ul>
                </>
              ) : (
                <>
                  <ul>
                    {secondSearchList.edges.length > 0 ? (
                      <>
                        {secondSearchList.edges.map((item, index) => {
                          return (
                            <li
                              key={index}
                              onClick={(e) => {
                                setsecondSelectedCoin({
                                  address: item.node.address,
                                });
                                setshowsecondlist(false);
                                setsecondCoin(item.node.name);
                              }}
                            >
                              <span className="detail">
                                <span className="image"><img src={item.node.unsafeOpenseaImageUrl || (assetUrl + "images/user-dp.png")} alt={item.node.name} /></span>
                                <span>{item.node.name}</span> <span className="code">{item.node.symbol}</span>
                              </span>
                            </li>
                          );
                        })}
                      </>
                    ) : (
                      <>
                        <li>
                          <div className="detail">No record found.</div>
                        </li>
                      </>
                    )}
                  </ul>
                </>
              )}
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default Second_Nft_Search;
