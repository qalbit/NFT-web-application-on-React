import React from 'react';

function UploadImageInput({ uploadImagesData, saveNftImages, deleteNftImages, validate, nftDataError, ...props }) {
    return (
      <div className="form-group">
        <div className="form-control file-upload">
            <div className='selected-file-wrapper'>
                {
                    (uploadImagesData && uploadImagesData.length) > 0 ?  <>
                        {
                            uploadImagesData.map((item , index)=>{
                                return <span className='selected-file mb-1' key={index}>{item.name} &nbsp; <a href onClick={()=>{deleteNftImages(index)}}> <i class="fas fa-times"></i> </a> </span>
                            })
                        }
                    </>
                    :<>
                        <span className='selected-file'> No file selected</span>
                    </>
                }
            </div>
                <input type="file" name="submit_nft_image" id="submit_nft_image" onChange={saveNftImages} onBlur={(e)=>{validate(e.target)}} accept=".jpg,.jpeg,.png"/>
                <label htmlFor="submit_nft_image" className='file-label'>
                    <a className='form-control form-btn'>
                        Choose File
                    </a>
                </label>
        </div>
        <div className="error-message">{nftDataError.submit_nft_image || nftDataError.nft_image}</div>
      </div>
    );
}

export default UploadImageInput
