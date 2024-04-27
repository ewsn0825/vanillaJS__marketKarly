import {
  bannerData,
  numberOfSlide,
  currentSlideIndex,
  handleArrowButtons,
} from "../index.js";

import {getNode} from "../../../lib/index.js"
// 배너
export const bannerSlide = () => {
  const mainBannerContainer = getNode(".swiper_banner");
  const bannerSwiper = new Swiper(".swiper_banner", {
    direction: "horizontal",
    loop: true, // 슬라이드 루프
    autoplay: {
      delay: 2500,
    },
    navigation: {
      nextEl: ".main_banner_right_arrow",
      prevEl: ".main_banner_left_arrow",
    },
    keyboard: {
      enabled: true, // 키보드 단축키 사용 가능하게 설정
      onlyInViewport: true, // 슬라이더가 뷰포트 내에 있을 때만 작동하도록 설정
      pageUpDown: true, // Page Up 및 Page Down 키도 작동하도록 설정
    },
    on: {
      init: function () {
        numberOfSlide(currentSlideIndex(this), bannerData.length);
      },

      slideChangeTransitionStart: function () {
        let slideChanged = false;
        if (!slideChanged) {
          slideChanged = true;
          setTimeout(() => {
            numberOfSlide(currentSlideIndex(this), bannerData.length), // 슬라이드 전환 후 슬라이드 번호 출력
              (slideChanged = false);
          }, 50);
        }
      },
    },
  });

  mainBannerContainer.addEventListener("mouseenter", function () {
    bannerSwiper.autoplay.stop();
  });

  mainBannerContainer.addEventListener("mouseleave", function () {
    bannerSwiper.autoplay.start();
  });
};

// // 프로덕트 스와이퍼

export const goodPriceSlide = () => {
  const goodPrice = new Swiper(".good_price", {
    slidesPerView: 4,
    spaceBetween: 20,
    slidesPerGroup: 4,
    navigation: {
      nextEl: ".good_price_right_arrow",
      prevEl: ".good_price_left_arrow",
    },
    on: {
      init: function () {
        handleArrowButtons(
          this,
          ".good_price_right_arrow",
          ".good_price_left_arrow",
        );
      },
      slideChange: function () {
        handleArrowButtons(
          this,
          ".good_price_right_arrow",
          ".good_price_left_arrow",
        );
      },
    },
  });
};

// // // ----------------------------------------------------------------------

export const todayRecommendSlide = () => {
  const todayRecommend = new Swiper(".today_recommend", {
    slidesPerView: 4,
    spaceBetween: 20,
    slidesPerGroup: 4,
    navigation: {
      nextEl: ".recommend_right_arrow",
      prevEl: ".recommend_left_arrow",
    },
    on: {
      init: function () {
        handleArrowButtons(
          this,
          ".recommend_right_arrow",
          ".recommend_left_arrow",
        );
      },
      slideChange: function () {
        handleArrowButtons(
          this,
          ".recommend_right_arrow",
          ".recommend_left_arrow",
        );
      },
    },
  });
};
