import React from 'react'
import Footer from './Footer'
import Header from './Header'

function NoMatch() {
    return (
        <div className='body-wrapper'>
            <Header />
            <div className="admin-container">
                <div className="container-lg">
                    <div className="page-404-error text-center">
                        <div className="error">
                            <h1 className="display-1 font-weight-bold">404</h1>
                            <h2 className="peak text-uppercase">Seems you are lost !</h2>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default NoMatch
