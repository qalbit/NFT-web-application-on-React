import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import React, { useRef } from "react";
import OwlCarousel from 'react-owl-carousel';
// import Carousel from "react-elastic-carousel";
import CarouselItem from "./CarouselItem";
function TrendingNfts({ data, ...props }) {

  if (props.is_trending_nft_loading) {
    return (
      <>
        <section className="trending-block">
          <div className="container-lg">
            <div className="heading">
              <h1>
                <span className="highlight"> Trending </span> NFTs
              </h1>
            </div>
            <div className="carousel">
                <div className="skeleton">
                  <br /><br /><br /><br /><br /><br /><br /><br /><br />
                </div>
            </div>
          </div>
        </section>
      </>
    );
  } else {
    if (data && data.length > 0) {
      var itemsPerPage = 3;
      var totalPages = 3;
      var carouselRef = useRef(null);
      var resetTimeout;
      var breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 767, itemsToShow: 2 },  
        { width: 1100, itemsToShow: 3 }  
      ]
    }
    const getTotalPage = () => {
        let width = window.innerWidth;
        if(width >= 1200){
            return 2
        }
        else if(width >= 767){
            return 3
        }
        else{
            return 4
        }
    }

    const owlresponsive = {
        0 : {
            items : 1
        },
        768 : {
            items : 2
        },
        1200 : {
            items : 3
        }
    };
    return (
      <>
        <section className="trending-block">
          <div className="container-lg">
            <div className="heading">
              <h1>
                <span className="highlight"> Trending </span> NFTs
              </h1>
            </div>
            <div className="carousel">
              {data && data.length > 0 ? (
                <>
                  {/* <Carousel
                    breakPoints={breakPoints}
                    ref={carouselRef}
                    pagination={false}
                    enableAutoPlay={true}
                    showArrows={false}
                    itemPadding={[0, 10, 0, 10]}
                    autoPlaySpeed={4000}
                    onNextEnd={({ index }) => {
                      clearTimeout(resetTimeout);
                      if (index === getTotalPage()) {
                        resetTimeout = setTimeout(() => {
                          carouselRef.current.goTo(0);
                        }, 3000); // same time
                      }
                    }}
                  >
                    {data.map((item, index) => {
                      return (
                        <div key={index}>
                          <CarouselItem data={item} />
                        </div>
                      );
                    })}
                  </Carousel> */}
                  <OwlCarousel items={3} loop={true} autoplay={true} autoplayTimeout={4000} responsive={owlresponsive} dots={false}>
                    {data.map((item, index) => {
                      return (
                        <div key={index} className='custom-carasol-min-height'>
                          <CarouselItem data={item} />
                        </div>
                      );
                    })}
                  </OwlCarousel>
                </>
              ) : (
                <>
                  <h3>No data Found</h3>
                </>
              )}
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default TrendingNfts;
