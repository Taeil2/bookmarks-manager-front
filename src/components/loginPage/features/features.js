import React from 'react';
import './features.scss';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import screenshotImg1 from '../../../img//screenshots/screenshot1.png';
import screenshotImg2 from '../../../img//screenshots/screenshot2.png';
import screenshotImg3 from '../../../img//screenshots/screenshot3.png';
import screenshotImg4 from '../../../img//screenshots/screenshot4.png';
import mobileScreenshotImg1 from '../../../img/screenshots/mobile-screenshot1.png';
import mobileScreenshotImg2 from '../../../img/screenshots/mobile-screenshot2.png';
import mobileScreenshotImg3 from '../../../img/screenshots/mobile-screenshot3.png';
import mobileScreenshotImg4 from '../../../img/screenshots/mobile-screenshot4.png';

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
          <img src={screenshotImg1} alt="screenshot" className="screenshot"></img>
          <img src={mobileScreenshotImg1} alt="screenshot" className="mobile-screenshot"></img>
          <h2>Your new bookmarks manager and new tab screen</h2>
        </div>
        <div>
          <img src={screenshotImg2} alt="screenshot" className="screenshot"></img>
          <img src={mobileScreenshotImg2} alt="screenshot" className="mobile-screenshot"></img>
          <h2>Organize bookmarks in pages and folders</h2>
        </div>
        <div>
          <img src={screenshotImg3} alt="screenshot" className="screenshot"></img>
          <img src={mobileScreenshotImg3} alt="screenshot" className="mobile-screenshot"></img>
          <h2>Store additional bookmarks in a drawer</h2>
        </div>
        <div>
          <img src={screenshotImg4} alt="screenshot" className="screenshot"></img>
          <img src={mobileScreenshotImg4} alt="screenshot" className="mobile-screenshot"></img>
          <h2>Jot down notes</h2>
        </div>
      </Slider>
    </div>
  );
}
