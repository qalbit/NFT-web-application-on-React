import React from 'react'

function Footer() {
    return (
        <>
            <footer>
                <div className="gemstool-footer">
                    <div className="container-lg">
                        <div className="credits">
                            <div className="copyright">
                                <span>Copyright 2022 | Gems Tools</span>
                            </div>
                            <div className="developed">
                                <span>Designed and Developed by <a href="https://qalbit.com/" target="_blank"> QalbIT Solution </a> </span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <div className="sticky-button">
                <a href="https://mobile.twitter.com/gemstoolsapp" target={"_blank"}>
                    <span className='icon'><i class="fab fa-twitter"></i></span><span>Follow us</span>
                </a>
            </div>
        </>
    )
}

export default Footer
