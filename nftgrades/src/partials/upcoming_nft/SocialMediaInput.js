import React from "react";

function SocialMediaInput({
  addSocialMediaField,
  deleteSocialMediaField,
  socialMediaData,
  socialMediaDataError,
  upcommingNftDataError,
  ...props
}) {
    return (
        <div className="col-12">
          <div className="row">
            <div className="col-md-4 col-12">
              <div className="form-group">
                <select
                  name="social_media"
                  id="social_media"
                  className="form-control"
                  defaultValue={""}
                >
                  <option disabled value={""}>Social media</option>
                  <option value="twitter">Twitter</option>
                  <option value="discord">Discord</option>
                  <option value="facebook">Facebook</option>
                </select>
                <div className="error-message">{upcommingNftDataError.social_media ? upcommingNftDataError.social_media : socialMediaDataError.social_media}</div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="form-group">
                <input
                  type="text"
                  name="social_media_link"
                  id="social_media_link"
                  className="form-control"
                  placeholder="Social media link"
                  // onBlur={(e) => validate(e.target)}
                />
                <div className="error-message">{upcommingNftDataError.social_media_link ? upcommingNftDataError.social_media_link : socialMediaDataError.social_media_link}</div>
              </div>
            </div>
            <div className="col-md-2 col-12 mb-3">
              <div className="form-group">
                <button type="button" className="form-btn mt-0 px-4 h-100" onClick={addSocialMediaField}>
                  Add
                </button>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
                {
                  (socialMediaData && socialMediaData.length > 0) && <>
                  <div className="col-12">
                    <ul className="socialmedia-list">
                    {
                      socialMediaData.map((item, index)=>{
                        return (
                          <>
                            <li><span className="highlight">{item.media}: </span> {item.media_link}  &nbsp; &nbsp;<span className="float-right highlight imp" onClick={()=>{deleteSocialMediaField(index)}}><i class="fas fa-times"></i></span></li>
                          </>
                        );
                      })
                    }
                  </ul>
              </div>
                  </>
                }
            </div>
          </div>
        </div>
    );
}

export default SocialMediaInput;
