import React from "react";
import Slider from "react-slick";

export default function LogosPartners() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    swipeToSlide: true,

    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        }
      ]
  
  };
  return (
    <Slider {...settings}>
      <div>
        <img src="/assets/images/partner/coinbase.svg" alt="" className="img-fluid"/>
      </div>
      <div>
        <img src="/assets/images/partner/elrond.svg" alt="" className="img-fluid"/>
      </div>
      <div>
        <img src="/assets/images/partner/kucoin.png" alt="" className="img-fluid"/>
      </div>
      <div>
        <img src="/assets/images/partner/moon-logo.svg" alt="" className="img-fluid"/>
      </div>
      <div>
        <img src="/assets/images/partner/outer.png" alt="" className="img-fluid outer"/>
      </div>
      <div>
        <img src="/assets/images/partner/velas.png" alt="" className="img-fluid velas"/>
      </div>
      <div>
        <img src="/assets/images/partner/bitbase.svg" alt="" className="img-fluid"/>
      </div>
      <div>
        <img src="/assets/images/partner/Sushiswap.png" alt="" className="img-fluid"/>
      </div>
      <div>
        <img src="/assets/images/partner/coinbase.svg" alt="" className="img-fluid"/>
      </div>
    </Slider>
  );
}