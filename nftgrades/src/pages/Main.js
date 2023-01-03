import React, { useEffect, useState } from 'react';
import { Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../partials/Footer';
import Header from '../partials/Header';
import CompareNfts from './CompareNfts';
import ContactUs from './ContactUs';
import Home from './Home';
import SubmitNft from './SubmitNft';
import UpcommingNft from './UpcommingNft';

function Main() {

    let location = useLocation();
    let [myRoute, setMyRoute] = useState(null)
    useEffect(()=>{
        setMyRoute(location.pathname)
    }, [location])

    
    

    return (
        <div className='body-wrapper'>
            <Header route={myRoute}/>
                
            {/* <Route exact path="/app/test">
                <CompareNfts/>
            </Route> */}

            {/* <Route exact path="/submit-nft">
                <SubmitNft/>
            </Route>
            <Route exact path="/upcomming-nft">
                <UpcommingNft/>
            </Route>
            <Route exact path="/compare-nft">
                <CompareNfts/>
            </Route> */}
            <Route exact path="/contact-us">
                <ContactUs/>
            </Route>


            <Route exact path="/">
                <CompareNfts/>
                {/* <Home/> */}
            </Route>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Footer />
        </div>
    )
}

export default Main
