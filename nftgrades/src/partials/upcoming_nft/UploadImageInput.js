import React from 'react';

function UploadImageInput({saveNftImages, uploadImagesData, setuploadImagesData, deleteNftImages, validate, upcommingNftDataError, ...props}) {
    return (
      <div className="form-group">
        <div className="form-control file-upload">
            <div className='selected-file-wrapper'>
                {
                    (uploadImagesData && uploadImagesData.length) > 0 ?  <>
                        {
                            uploadImagesData.map((item , index)=>{
                                return <span className='selected-file' key={index}>{item.name} &nbsp; <a href onClick={()=>{deleteNftImages(index)}}> <i class="fas fa-times"></i> </a> </span>
                            })
                        }
                    </>
                    :<>
                        <span className='selected-file'> No file selected</span>
                    </>
                }
            </div>
            <input type="file" name="upcoming_nft_image" id="upcoming_nft_image" onChange={saveNftImages} onBlur={(e)=>{validate(e.target)}} accept=".jpg,.jpeg,.png"/>
            <label htmlFor="upcoming_nft_image" className='file-label'>
                <a className='form-control form-btn d-flex align-items-center'>
                    Choose File
                </a>
            </label>
        </div>
        <div className="error-message">{upcommingNftDataError.upcoming_nft_image || upcommingNftDataError.upcoming_nft_images}</div>
      </div>
    );
}

export default UploadImageInput
