import React, { useEffect, useState } from 'react';
import UploadImageInput from '../partials/submit_nft/UploadImageInput';
import axios from '../utils/axios';
import { resolve_loading, set_loading } from '../utils/common';
import { assetUrl } from '../utils/constant';
import requests from '../utils/Requests';

var loadingId = null;
function SubmitNft() {
    const [nftData, setNftData] = useState({});
    const [nftDataError, setNftDataError] = useState({});
    const [thankyou, setThankyou] = useState(false)
    const [uploadImagesData, setUploadImagesData] = useState([])

    useEffect(() => {
        document.getElementById("submit_nft_image").value = "";
    }, [uploadImagesData])

    const resetForm = () => {
        document.getElementById('nft-submit-form').reset();
        setNftData({});
        setNftDataError({});
    }

    const nftSubmitHandler = (e) => {
        e.preventDefault();
        var flag = true;
        var form = document.getElementById( 'nft-submit-form' );
        var allFormControls = Array.from(form.elements);
        allFormControls.forEach(element => {
            if(!validate(element)){
                flag = false
            }
        });

        if(flag){
            var formData = new FormData(form);
            uploadImagesData.forEach((item, index) => {
                formData.append(`nft_image[${index}]`, item.file);
            });
            loadingId = set_loading("Please wait...")
            document.getElementById('submit-nft-button').disabled = true;
            
            axios.post(requests.submit_nft, formData)
                .then(response => response.data)
                .then((data)=>{
                    if(data.status == "success"){
                        resolve_loading(loadingId, "success", data.message)
                        resetForm();
                        setUploadImagesData([]);
                        setThankyou(true);
                    }
                    else{
                        resolve_loading(loadingId, "error", 'Unwanted error')
                    }

                })
                .catch(function (error) {
                    var data = error.response.data;
                    if(data.status == 'validation_error' && Object.keys(data.message).length > 0 ){
                        
                        resolve_loading(loadingId, "error", 'Validation Error');
                        for (var [key, value] of Object.entries(
                            data.message
                        )) {

                            var keys = key.split('.');
                            if(keys.length > 1){
                                key = keys[0];
                            }

                            setNftDataError((prev) => {
                                return {
                                    ...prev,
                                    [key]: value,
                                };
                            });
                        }
                    }
                    else{
                        resolve_loading(loadingId, "error", 'Unwanted error');
                    }
                })
                .finally(()=>{
                    document.getElementById('submit-nft-button').disabled = false;
                })
        }
    }
    const saveNftData = (e) => {
        if(e.target.name == "nft_image"){
            validate(e.target)
        }
        setNftData((prev)=>{
            if (e.target.type == "file") {
                var value = e.target.files[0];
            } else {
                var value = e.target.value;
            }
            return {
                ...prev, 
                [e.target.name] : (value == "" ? null : value)
            }
        })
    }
    const validate = (el) => {
        if((
            // el.name == 'fname' || 
            // el.name == 'lname' ||
            el.name == 'eth_address' || 
            el.name == 'nft_name' || 
            el.name == 'nft_link' || 
            el.name == 'maximum_number_in_collection' || 
            el.name == 'collection_blockchain' ||
            el.name == 'twitter_link' 
            // || el.name == 'wallet_address' 
        ) && el.value.trim() == ""){
            setNftDataError((prev)=>{
                return {
                    ...prev, 
                    [el.name] : 'Field required'
                }
            })
            return false;
        }
        // else if(el.name == 'phone' && (el.value.trim()  != "" && !(el.value.match(/^\d{10,12}$/))) ){
        //     setNftDataError((prev)=>{
        //         return {
        //             ...prev, 
        //             [el.name] : 'Invalid phone number'
        //         }
        //     })
        //     return false;
        // }
        else if(el.name == 'email' && el.value != "" && !(el.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))){
            setNftDataError((prev)=>{
                return {
                    ...prev, 
                    [el.name] : 'Invalid email format'
                }
            })
            return false;
        }
        else if(el.name == 'email' && el.value != ""){
            checkEmail(el.value, el.name)
            return true;
        }
        // else if(el.name == 'nft_image' && typeof el.files[0] === 'undefined'){
        //     setNftDataError((prev)=>{
        //         return {
        //             ...prev, 
        //             [el.name] : 'Field required'
        //         }
        //     })
        //     return false;
        // }
        else if(el.name == 'submit_nft_image' && uploadImagesData.length <= 0){
            setNftDataError((prev)=>{
                return {
                    ...prev, 
                    [el.name] : 'Field required'
                }
            })
            return false;
        }
        else{
            setNftDataError((prev)=>{
                return {
                    ...prev, 
                    [el.name] : null
                }
            })
            return true;
        }
    }
    const checkEmail = (email, field_name) => {
        axios.post(requests.check_email_exist, {
            email : email    
        })
        .then(response => response.data)
        .then((data)=>{
            setNftDataError((prev)=>{
                return {
                    ...prev, 
                    [field_name] : data.message
                }
            })
        })
        .catch((error)=> {

        })
    }

    const saveNftImages = (e) => {
        if(e.target.files && e.target.files.length > 0){
            setUploadImagesData((prev) => {
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
        setUploadImagesData((prev)=>{
            var data = prev.filter((item, i)=>{
                return index !== i
            })
        return data
        })
    }
    
    return (
        <div>
            <main className='main-spacing'>
                <section className="submit-nft">
                    <div className="nft-container">
                        <div className="container-lg">
                            <div className="row m-0">
                                <h4 className='submit-nft-text-message mb-3'>
                                    Listings (Grading NFTs): Submit your NFT for grading, we will run your project through our algorithm and your project will be listed in 24 hours.
                                    <br/> <span className='text-white'>Wallet to send ETH: 0x81f62Dc678F243251Ed734894E6bf080e58A99EB</span>
                                </h4>
                                <div className="col-12 heading p-0">
                                    <h1> <span className="highlight">Submit</span> NFTs </h1>
                                </div>
                                <div className="col-lg-9 col-md-8 left-block">
                                    <div className="nft-form">
                                        <form onSubmit={nftSubmitHandler} method="post" id="nft-submit-form" encType="multipart/form-data">
                                            <div className="row m-0">
                                                <div className="col-lg-6 pl-lg-0 left-box">
                                                    <div className="box-modal">
                                                        <div className="title">
                                                            <h3>About yourself</h3>
                                                        </div>
                                                        {/* <div className="full-name form-group">
                                                            <div className="first-name form-group">
                                                                <input type="text" name="fname" id="fname" onChange={saveNftData} onBlur={(e)=>validate(e.target)} className="form-control" placeholder="First Name" />
                                                                <div className="error-message">{nftDataError.fname}</div>
                                                            </div>
                                                            <div className="last-name form-group">
                                                                <input type="text" name="lname" id="lname" onChange={saveNftData} onBlur={(e)=>validate(e.target)} className="form-control" placeholder="Last Name" />
                                                                <div className="error-message">{nftDataError.lname}</div>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <input type="tel" name="phone" id="phone" onChange={saveNftData} onBlur={(e)=>validate(e.target)} className="form-control" placeholder="Phone Number" />
                                                            <div className="error-message">{nftDataError.phone}</div>
                                                        </div> */}
                                                        <div className="form-group">
                                                            <input type="text" name="project_name" id="project_name" onChange={saveNftData} onBlur={(e)=>validate(e.target)} className="form-control" placeholder="Project name" />
                                                            <div className="error-message">{nftDataError.project_name}</div>
                                                        </div>
                                                        <div className="form-group">
                                                            <input type="email" name="email" id="email" onChange={saveNftData} onBlur={(e)=>validate(e.target)} className="form-control" placeholder="Email" />
                                                            <div className="error-message">{nftDataError.email}</div>
                                                        </div>
                                                        <div className="form-group">
                                                            <input type="text" name="opensea_link" id="opensea_link" onChange={saveNftData} onBlur={(e)=>validate(e.target)} className="form-control" placeholder="Collection Link (Important)" />
                                                            <div className="error-message">{nftDataError.opensea_link}</div>
                                                        </div>
                                                        {/* <div className="form-group">
                                                            <input type="text" name="wallet_address" id="wallet_address" onChange={saveNftData} onBlur={(e)=>validate(e.target)} className="form-control" placeholder="Wallet address (sent ETH from)" />
                                                            <div className="error-message">{nftDataError.wallet_address}</div>
                                                        </div> */}
                                                        <div className="form-group">
                                                            <input type="text" name="twitter_link" id="twitter_link" onChange={saveNftData} onBlur={(e)=>validate(e.target)} className="form-control" placeholder="Project's Official Twitter" />
                                                            <div className="error-message">{nftDataError.twitter_link}</div>
                                                        </div>
                                                        <div className="form-group">
                                                            <input type="url" name="discord_link" id="discord_link" onChange={saveNftData} onBlur={(e)=>validate(e.target)} className="form-control" placeholder="Project's Official Discord" />
                                                            <div className="error-message">{nftDataError.discord_link}</div>
                                                        </div>
                                                        <div className='form-group border-dashed mb-2'>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="">What is the maximum number of items in your collection?</label>
                                                            <input type="number" min={1} name="maximum_number_in_collection" id="maximum_number_in_collection" onChange={saveNftData} onBlur={(e)=>validate(e.target)} className="form-control"/>
                                                            <div className="error-message">{nftDataError.maximum_number_in_collection}</div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="">How much have you sold items have you sold from your collection?</label>
                                                            <input type="text" name="item_sold" id="item_sold" onChange={saveNftData} onBlur={(e)=>validate(e.target)} className="form-control"/>
                                                            <div className="error-message">{nftDataError.item_sold}</div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="">What is your collection's blockchain?</label>
                                                            <input type="text" name="collection_blockchain" id="collection_blockchain" onChange={saveNftData} onBlur={(e)=>validate(e.target)} className="form-control"/>
                                                            <div className="error-message">{nftDataError.collection_blockchain}</div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="">What is your collection's contract address(es)? (If available)</label>
                                                            <input type="text" name="collection_contract_address" id="collection_contract_address" onChange={saveNftData} onBlur={(e)=>validate(e.target)} className="form-control"/>
                                                            <div className="error-message">{nftDataError.collection_contract_address}</div>
                                                        </div>
                                                        {/* <div className="form-group">
                                                            <input type="text" name="eth_address" id="eth_address" onChange={saveNftData} onBlur={(e)=>validate(e.target)} className="form-control" placeholder="ETH Address" />
                                                            <div className="error-message">{nftDataError.eth_address}</div>
                                                        </div> */}
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 right-box">
                                                    <div className="box-modal">
                                                        <div className="title">
                                                            <h3>About your NFTs</h3>
                                                        </div>
                                                        <div className="form-group">
                                                            <input type="text" name="nft_name" id="nft_name" onChange={saveNftData} onBlur={(e)=>validate(e.target)} className="form-control" placeholder="Project name" />
                                                            <div className="error-message">{nftDataError.nft_name}</div>
                                                        </div>
                                                        <div className="form-group">
                                                            <input type="url" name="nft_link" id="nft_link" onChange={saveNftData} onBlur={(e)=>validate(e.target)} className="form-control" placeholder="Link" />
                                                            <div className="error-message">{nftDataError.nft_link}</div>
                                                        </div>
                                                        {/* <div className="form-group">
                                                            <input type="file" name="nft_image" id="nft_image" onChange={saveNftData} onBlur={(e)=>validate(e.target)} className="d-none"/>
                                                            <label htmlFor="nft_image" className="file-label form-control"> 
                                                                {nftData.nft_image ? nftData.nft_image.name : "Image"}
                                                            </label>
                                                            <div className="error-message">{nftDataError.nft_image}</div>
                                                        </div> */}
                                                        <UploadImageInput 
                                                            uploadImagesData={uploadImagesData}
                                                            saveNftImages={saveNftImages}
                                                            deleteNftImages={deleteNftImages}
                                                            validate={validate}
                                                            nftDataError={nftDataError}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <button type="submit" id="submit-nft-button" className="form-btn nft-submit-btn">Submit</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-4 right-block">
                                    {/* <div className="image">
                                        <img src={assetUrl+"images/img3.png"} alt="dummy image" />
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* overlay for thankyou */}
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
                
            </main>

        </div>
    )
}

export default SubmitNft
