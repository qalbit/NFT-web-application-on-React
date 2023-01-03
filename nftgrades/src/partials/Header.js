import React from 'react';
import { Link } from 'react-router-dom';
import { assetUrl } from '../utils/constant';
function Header({route}) {
    return (

        <>
        <header>
            <nav className="head-nav">
                <div className="container-lg">
                    <div className="wrapper">
                        <div className="brand-logo">
                            <Link to="/"><img src={assetUrl+"images/gemstool-logo.png"} alt="NFTs Grades image" width="180px" height="46px" /></Link>
                        </div>
                        <div className="nav-links">
                            <div className="hemburger">
                                <button >
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </button>
                            </div>
                            <div className="nav-links">
                                <ul className="user-list">
                                    <li>
                                        {/* <Link to="/" className={(route == '/') ? 'active' : ''}>NFT Grades</Link> */}
                                    </li>
                                    <li>
                                        {/* <Link to="/compare-nft" className={(route == '/compare-nft') ? 'active' : ''}>Dual NFT Charts</Link> */}
                                    </li>
                                    <li>
                                        {/* <Link to="/upcomming-nft" className={(route == '/upcomming-nft') ? 'active' : ''}>Upcoming NFTs</Link> */}
                                    </li>
                                    <li>
                                        {/* <Link to="/submit-nft" className={(route == '/submit-nft') ? 'active' : ''}>Submit NFTs</Link> */}
                                    </li>
                                    <li>
                                        <Link to="/contact-us" className={(route == '/contact-us') ? 'active' : ''}>Contact us</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="mobile-nav">
                            <ul className="mobile-userlist">
                                {/* <li>
                                    <Link to="/">NFT Grades</Link>
                                </li>
                                <li>
                                    <Link to="/compare-nft">Dual NFT Charts</Link>
                                </li>
                                <li>
                                    <Link to="/submit-nft">Submit NFTs</Link>
                                </li>
                                <li>
                                    <Link to="/upcomming-nft">Upcoming NFTs</Link>
                                </li> */}
                                <li>
                                    <Link to="/contact-us">Contact us</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
        </>
    )
}

export default Header
