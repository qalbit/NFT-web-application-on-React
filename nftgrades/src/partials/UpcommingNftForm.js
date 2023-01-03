import moment from 'moment-timezone';
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SocialMediaInput from '../partials/upcoming_nft/SocialMediaInput';
import axios from '../utils/axios';
import { resolve_loading, set_loading } from '../utils/common';
import { assetUrl } from '../utils/constant';
import requests from "../utils/Requests";
import UploadImageInput from './upcoming_nft/UploadImageInput';

var loadingId = null;
function UpcommingNftForm() {
  const [startDate, setstartDate] = useState(null);
  const [upcommingNftData, setupcommingNftData] = useState({});
  const [upcommingNftDataError, setupcommingNftDataError] = useState({});
  const [thankyou, setThankyou] = useState(false)
  const [socialMediaData, setSocialMediaData] = useState([])
  const [socialMediaDataError, setsocialMediaDataError] = useState({});
  const [uploadImagesData, setuploadImagesData] = useState([])

  // timezone select 
  const timezoneSelectorOptions = [];
  moment.tz.names()
  .reduce((memo, tz) => {
    memo.push({
      name: tz,
      offset: moment.tz(tz).utcOffset()
    });
    
    return memo;
  }, [])
  .sort((a, b) => {
    return a.offset - b.offset
  })
  .reduce((memo, tz) => {
    const timezone = tz.offset ? moment.tz(tz.name).format('Z') : '';
    timezoneSelectorOptions.push({
      name: tz.name,
      option: `(GMT${timezone}) ${tz.name}`
    })
    return null;
  }, "");

  // -------------------

  const saveNftData = (e) => {
    setupcommingNftData((prev) => {
      if (e.target.type == "file") {
        var value = e.target.files[0];
      } else {
        var value = e.target.value;
      }
      return {
        ...prev,
        [e.target.name]: value == "" ? null : value,
      };
    });
  };

  const resetForm = () => {
      document.getElementById('submit-upcomming-nft-form').reset();
      setupcommingNftData({});
      setupcommingNftDataError({});
  }
  const onfocusLunchTime = (e) => {
    e.target.type = 'time';
  }
  const onblurLunchTime = (e) => {
    if(e.value == ""){
      e.type = 'text';
    }
    validate(e);
  }

  const nftUpcommingSubmitHandler = (e) => {
    e.preventDefault();
    var flag = true;
    var form = document.getElementById("submit-upcomming-nft-form");
    var allFormControls = Array.from(form.elements);
    allFormControls.forEach((element) => {
      if (!validate(element)) {
        flag = false;
      }
    });

    if (flag) {
      var formData = new FormData(form);
      uploadImagesData.forEach((item, index) => {
        formData.append(`upcoming_nft_images[${index}]`, item.file);
      });
      formData.append(`socialMediaData`, JSON.stringify(socialMediaData));
      loadingId = set_loading("Please wait...");
      document.getElementById("submit-upcomming-nft-button").disabled = true;

      axios
        .post(requests.submit_upcomming_nft, formData)
        .then((response) => response.data)
        .then((data) => {
          if (data.status == "success") {
            resolve_loading(loadingId, "success", data.message);
            resetForm();
            setSocialMediaData([]);
            setuploadImagesData([]);
            setThankyou(true);
          } else {
            resolve_loading(loadingId, "error", "Unwanted error");
          }
        })
        .catch(function(error) {
          var data = error.response.data;
          if (data.status == "validation_error" && Object.keys(data.message).length > 0) {
            resolve_loading(loadingId, "error", "Validation Error");
            for (var [key, value] of Object.entries(data.message)) {
              var keys = key.split('.');
              if(keys.length > 1){
                key = keys[0];
              }
              setupcommingNftDataError((prev) => {
                // console.log(key);
                // var keys = key.split('.');
                // if(keys.length > 1){
                //   key = keys;
                // }
                return {
                  ...prev,
                  [key]: value,
                };
              });
            }
          } else {
            resolve_loading(loadingId, "error", "Unwanted error");
          }
        })
        .finally(() => {
          document.getElementById("submit-upcomming-nft-button").disabled = false;
        });
    }
  };
  const validate = (el) => {
    if (
      (el.name == "project_name" ||
        el.name == "website" ||
        el.name == "socialmedia" ||
        el.name == "briefdescription" ||
        el.name == "network" ||
        el.name == "release_date" ||
        el.name == "timeZoneSelect" ||
        el.name == "release_time") &&
      (el.value.trim() == "" || el.value == null)
    ) {
      setupcommingNftDataError((prev) => {
        return {
          ...prev,
          [el.name]: "Field required",
        };
      });
      return false;
    } else if (el.name == "phone" && el.value.trim() != "" && !el.value.match(/^\d{10,12}$/)) {
      setupcommingNftDataError((prev) => {
        return {
          ...prev,
          [el.name]: "Invalid phone number",
        };
      });
      return false;
    } else if (el.name == "email" && !el.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setupcommingNftDataError((prev) => {
        return {
          ...prev,
          [el.name]: "Invalid email format",
        };
      });
      return false;
    }
     else if (el.name == "nft_image" && typeof el.files[0] === "undefined") {
      setupcommingNftDataError((prev) => {
        return {
          ...prev,
          [el.name]: "Field required",
        };
      });
      return false;
    } 
     else if (el.name == "upcoming_nft_image" && uploadImagesData.length <= 0) {
      setupcommingNftDataError((prev) => {
        return {
          ...prev,
          [el.name]: "Field required",
        };
      });
      return false;
    }
    else if((el.name == 'social_media' || el.name == 'social_media_link') && socialMediaData.length <= 0){
      setupcommingNftDataError((prev)=>{
          return {
              ...prev, 
              [el.name] : 'Field required'
          }
      })
      return false;
    }
    else if((el.name == 'unit_price_eth' && el.value != '') && (el.value * 1) <= 0){
      setupcommingNftDataError((prev)=>{
          return {
              ...prev, 
              [el.name] : 'Minimum value should be 0'
          }
      })
      return false;
    }
    else {
      setupcommingNftDataError((prev) => {
        return {
          ...prev,
          [el.name]: null,
        };
      });
      return true;
    }
  };

  const addSocialMediaField = () => {
    let social_media = document.getElementById('social_media').value;
    let social_media_link = document.getElementById('social_media_link').value;
    if(validate_social_media()){
      setSocialMediaData((prev)=>{
        return [
          ...prev,
          {media:social_media, media_link:social_media_link}
        ]
      })
      document.getElementById('social_media').value = "";
      document.getElementById('social_media_link').value = "";
    }
  }
  const deleteSocialMediaField = (index) => {
    setSocialMediaData((prev)=>{
      var data = prev.filter((item, i)=>{
        return index !== i
      })
      return data
    })
  }
  const validate_social_media = () => {
    let social_media = document.getElementById('social_media').value;
    let social_media_link = document.getElementById('social_media_link').value;
    let [social_media_message, social_media_link_message] = ["", ""];
    let flag = true;
    if(social_media == ""){
      flag = false
      social_media_message = 'Field required';
    }
    if(social_media_link == ""){
      flag = false
      social_media_link_message = 'Field required';
    }


    setupcommingNftDataError({
      social_media : social_media_message,
      social_media_link: social_media_link_message
    })
    return flag
  }

  const saveNftImages = (e) => {
    if(e.target.files && e.target.files.length > 0){
      setuploadImagesData((prev) => {
        return [
          ...prev,
          {
            name: e.target.files[0].name,
            file: e.target.files[0]
          }
        ]
      })
    }
  }
  const deleteNftImages = (index) => {
    setuploadImagesData((prev)=>{
      var data = prev.filter((item, i)=>{
        return index !== i
      })
      return data
    })
  }
  useEffect(() => {
    document.getElementById("upcoming_nft_image").value = "";
  }, [uploadImagesData])


  return (
    <>
      <div className="row m-0">
        <div className="col-12 heading p-0">
          <h1>
            {" "}
            <span className="highlight">Submit</span> Upcoming NFTs{" "}
          </h1>
        </div>
        <div className="col-12 px-0">
          <div className="nft-form">
            <form
              action=""
              method="post"
              id="submit-upcomming-nft-form"
              encType="multipart/form-data"
              onSubmit={nftUpcommingSubmitHandler}
            >
              <div className="row m-0">
                <div className="col-12 px-0">
                  <div className="box-modal">
                    <div className="row">
                      <div className="col-12">
                        <div className="title"><h3>About yourself</h3></div>
                      </div>
                      <div className="col-12">
                        <div className="row">
                          <div className="col-lg-4 col-md-6 col-12 pb-1">
                            <div className="form-group">
                              <div className="first-name form-group">
                                <input
                                  onChange={saveNftData}
                                  onBlur={(e) => validate(e.target)}
                                  type="text"
                                  name="project_name"
                                  id="project_name"
                                  className="form-control"
                                  placeholder="Project name"
                                />
                                <div className="error-message">{upcommingNftDataError.project_name}</div>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6 col-12 pb-1">
                            <div className="form-group">
                              <div className="last-name form-group">
                                <input
                                  onChange={saveNftData}
                                  onBlur={(e) => validate(e.target)}
                                  type="url"
                                  name="website"
                                  id="website"
                                  className="form-control"
                                  placeholder="Website"
                                />
                                <div className="error-message">{upcommingNftDataError.website}</div>
                              </div>
                            </div>
                          </div>
                          {/* <div className="col-lg-4 col-md-6 col-12 pb-1">
                            <div className="form-group">
                              <div className="form-group">
                                <input
                                  type="text"
                                  name="socialmedia"
                                  id="socialmedia"
                                  className="form-control"
                                  placeholder="Social Media"
                                  onChange={saveNftData}
                                  onBlur={(e) => validate(e.target)}
                                />
                                <div className="error-message">{upcommingNftDataError.socialmedia}</div>
                              </div>
                            </div>
                          </div> */}
                          <div className="col-lg-4 col-md-6 col-12 pb-1">
                            <div className="form-group">
                              <DatePicker
                                name="release_date"
                                id="release_date"
                                className="form-control"
                                selected={startDate}
                                onChange={(date) => {setstartDate(date)}}
                                onBlur={(e) => validate(e.target)}
                                minDate={new Date()}
                                placeholderText="Launch date"
                                onChangeRaw={(e) => e.preventDefault()}
                              />
                              <div className="error-message">{upcommingNftDataError.release_date}</div>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6 col-12 pb-1">
                            <div className="form-group">
                              <input
                                type="text"
                                name="release_time"
                                id="release_time"
                                className="form-control"
                                placeholder="Launch time"
                                onChange={saveNftData}
                                onBlur={(e) => onblurLunchTime(e.target)}
                                onFocus={onfocusLunchTime}
                              />


                              <div className="error-message">{upcommingNftDataError.release_time}</div>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6 col-12 pb-1">
                            <div className="form-group">
                              <select 
                                name="timeZoneSelect" 
                                id="timeZoneSelect" 
                                className="form-control" 
                                onChange={saveNftData} 
                                onBlur={(e) => validate(e.target)}
                                defaultValue={""}>
                                <option disabled value="">Select timezone</option>
                                  {
                                    timezoneSelectorOptions.map((item, index)=>{
                                      return <option value={item.name} key={index}>{item.option}</option>
                                    })
                                  }
                              </select>
                              <div className="error-message">{upcommingNftDataError.timeZoneSelect}</div>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6 col-12 pb-1">
                            <div className="form-group">
                              <input
                                type="text"
                                name="network"
                                id="network"
                                className="form-control"
                                placeholder="Network"
                                onChange={saveNftData}
                                onBlur={(e) => validate(e.target)}
                              />
                              <div className="error-message">{upcommingNftDataError.network}</div>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6 col-12 pb-1">
                            <div className="form-group">
                              <input
                                type="number"
                                min={0}
                                step={"any"}
                                name="unit_price_eth"
                                id="unit_price_eth"
                                className="form-control"
                                placeholder="Unit price in ETH"
                                onChange={saveNftData}
                                onBlur={(e) => validate(e.target)}
                              />
                              <div className="error-message">{upcommingNftDataError.unit_price_eth}</div>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6 col-12 pb-1">
                            <div className="form-group">
                              <input
                                type="number"
                                name="max_number_collection"
                                id="max_number_collection"
                                className="form-control"
                                placeholder="Max number in the collection"
                                onChange={saveNftData}
                                onBlur={(e) => validate(e.target)}
                              />
                              <div className="error-message">{upcommingNftDataError.max_number_collection}</div>
                            </div>
                          </div>
                          <div className="col-12 form-group border-dashed mb-3"></div>
                          <div className="col-12 pb-1">

                              <div className='row'>
                                <SocialMediaInput
                                  addSocialMediaField={addSocialMediaField}
                                  deleteSocialMediaField={deleteSocialMediaField}
                                  socialMediaData={socialMediaData}
                                  socialMediaDataError={socialMediaDataError}
                                  setsocialMediaDataError={setsocialMediaDataError}
                                  upcommingNftDataError={upcommingNftDataError}
                                  />
                              </div>
                          </div>
                          <div className="col-12 form-group border-dashed mb-3"></div>
                          <div className="col-12 pb-1">
                              <UploadImageInput
                                saveNftImages={saveNftImages}
                                deleteNftImages={deleteNftImages}
                                uploadImagesData={uploadImagesData}
                                setuploadImagesData={setuploadImagesData}
                                validate={validate}
                                upcommingNftDataError={upcommingNftDataError}
                              />
                          </div>


                          <div className="col-12">
                            <div className="form-group">
                              <textarea
                                name="briefdescription"
                                id="briefdescription"
                                cols="30"
                                rows="10"
                                className="form-control textarea"
                                placeholder="Description"
                                onChange={saveNftData}
                                onBlur={(e) => validate(e.target)}
                              ></textarea>
                              <div className="error-message">{upcommingNftDataError.briefdescription}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <button type="submit" className="form-btn nft-submit-btn" id="submit-upcomming-nft-button">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {
          thankyou ? <>
              <div className="custom-modal d-block">
                  <div className="wrapper">
                      <div className="content">
                          <div className="title">
                              <h4>Thank you</h4>
                          </div>
                          <div className="icon">
                              <img src={assetUrl+"images/checkmark-icon.png"} alt="Checkmark Icon" width="130px" height="130px" />
                          </div>
                          <div className="text">
                              <p>
                                  We received your NFTs Information We will verify your NFTs Information and approve it. We will email you once it is approved.
                              </p>
                          </div>
                          <div className="redirect">
                              <a href="#" onClick={()=>{setThankyou(false)}}>Continue Browsing Website</a>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="overlay d-block"></div>
          </> : <></>
      }
    </>
  );
}

export default UpcommingNftForm;
