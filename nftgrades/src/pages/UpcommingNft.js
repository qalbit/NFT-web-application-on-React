import React from 'react'
import UpcommingNftForm from '../partials/UpcommingNftForm'
import UpcommingNftList from '../partials/UpcommingNftList'

function UpcommingNft() {
    

    return (
        <div>
            <main className='main-spacing'>
            <section className="submit-nft">
                <div className="nft-container">
                    <div className="container-lg">
                        <UpcommingNftForm />
                        <UpcommingNftList />
                    </div>
                </div>
            </section>
            </main>
        </div>
    )
}

export default UpcommingNft
