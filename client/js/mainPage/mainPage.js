/* global gsap */

import { getNode, getNodes } from '../../lib/index.js';

import {
  handleBannerClose,
  handlePopupClose,
  renderBanner,
  renderProductImage,
  fadeIn,
  fadeout,
  bannerSlide,
  todayRecommendSlide,
  goodPriceSlide,
  onMouseEnter,
  onMouseLeave,

  // productImages,
} from './index.js';

// 변수 지정
const [closeNotToday, close] = getNodes('.main_popup > button');

const bannerClose = getNode('.header_banner_button');

const mainBanner = getNode('.main_banner');

const mainBannerContainer = getNode('.swiper_banner');

//렌더링
renderBanner();
renderProductImage();

const images = getNodes('.recommend_today_image img');


//스와이퍼
bannerSlide();
todayRecommendSlide();
goodPriceSlide();




//함수 실행

// 이벤트

close.addEventListener('click', handlePopupClose);
bannerClose.addEventListener('click', handleBannerClose);

images.forEach((img) => {
  img.addEventListener('mouseenter', onMouseEnter);
  img.addEventListener('mouseleave', onMouseLeave);
});

mainBanner.addEventListener('mouseenter', fadeIn);
mainBanner.addEventListener('mouseleave', fadeout);
