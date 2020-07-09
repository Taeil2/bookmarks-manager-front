import React from 'react';
import './features.scss';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import screenshotImg from '../../../img/screenshot.png';
import mobileScreenshotImg from '../../../img/mobile-screenshot.png';

export default function Login() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <h2>Your new bookmarks manager and new tab screen</h2>
        </div>
        <div>
          <h2>Organize bookmarks in pages and folders</h2>
          {/* <img src={screenshotImg} alt="screenshot" className="screenshot"></img>
          <img src={mobileScreenshotImg} alt="screenshot" className="mobile-screenshot"></img> */}
        </div>
        <div>
          <h2>Store additional bookmarks in a drawer</h2>
        </div>
        <div>
          <h2>Jot down notes</h2>
        </div>
      </Slider>
    </div>
  );
}
