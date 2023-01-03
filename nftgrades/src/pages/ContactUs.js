import React from 'react'
import { Link } from 'react-router-dom'

function ContactUs() {
    return (
        <main className="main-spacing">
            <section>
                <div className='container-lg'>
                    <h4 className='highlight bold-14 mb-3'>If you have any questions or concerns about your NFT, we offer 24 hour around the clock assistance, you can email or dm us on Twitter!</h4>
                    <div className="twitter-handler">
                        <div className="info"><span className='highlight bold-18' style={{color:'#F2911B'}}> Twitter </span>: <span>GemsToolsNFT</span> </div>
                    </div>
                    <div className="mail-handler">
                        <div className="info"><span className='highlight bold-18' style={{color:'#F2911B'}}> Email </span>: <a href='mailto:gemstoolsnft@gmail.com' className='text-white'> gemstoolsnft@gmail.com </a> </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default ContactUs
