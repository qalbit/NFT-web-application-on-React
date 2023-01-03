import React, { useState } from "react";
import { assetUrl } from "../../utils/constant";

function First_Nft_Search({
  firstCoin,
  setfirstCoin,
  firstSelectedCoin,
  setfirstSelectedCoin,
  firstSearchList,
  setfirstSearchList, ...prop
}) {
  const [showfirstlist, setshowfirstlist] = useState(false);
  return (
    <div className="form-group nft-search-container"
        
    >
      <label>Select A</label>
      <div  tabIndex={1} 
        onFocus={()=>{
          setshowfirstlist(true)
        }}
        onBlur={()=>{
            setshowfirstlist(false)
        }}
      >
        <input
          type="text"
          name="select_a"
          id="select_a"
          value={firstCoin}
          className="form-control"
          placeholder="Eg. Etherneum"
          onChange={(e) => {
            if (e.target.value == "") {
              setfirstCoin(null);
            } else {
              setfirstCoin(e.target.value);
            }
          }}
          autoComplete="off"
        />
        <div className="nft-search-result-container first" style={{ display: (firstSearchList == null || !showfirstlist) ? "none" : "block" }}>
          { firstSearchList != null ? (
            <>
              {firstSearchList == "loading" ? (
                <>
                  <ul>
                    <li>
                      <div className="text-center">
                        Loading...
                      </div>
                    </li>
                  </ul>
                </>
              ) : (
                <>
                  <ul>
                    
                  {
                    firstSearchList.edges.length > 0 ? <>
                      {firstSearchList.edges.map((item, index) => {
                        return (
                          <li key={index} onClick={(e)=>{
                            setfirstSelectedCoin({
                                address: item.node.address
                            })
                            setshowfirstlist(false)
                            setfirstCoin(item.node.name);

                          }}>
                            <span className="detail">
                              <span className="image"><img src={item.node.unsafeOpenseaImageUrl || (assetUrl + "images/user-dp.png")} alt={item.node.name} /></span>
                              <span>{item.node.name}</span> <span className="code">{item.node.symbol}</span>
                            </span>
                            
                          </li>
                          
                        );
                      })}
                    </> :
                    <>
                      <li>
                        <div className="detail">No record found.</div>
                      </li>
                    </>
                  }
                    
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

export default First_Nft_Search;
