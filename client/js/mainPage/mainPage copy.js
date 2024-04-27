/* global gsap */

import {
  getNode,
  getNodes,
  invisibleElement,
  addClass,
  clearContents,
  tiger,
  insertLast,
} from "../../lib/index.js";

import { bannerData, productsData } from "./manageDate/useData.js";
// import {} from "./recommend.js";


// 팝업 버튼
const [closeNotToday, close] = getNodes(".main_popup > button");

const bannerClose = getNode(".header_banner_button");
const mainBannerContainer = getNode(".swiper_banner");
const mainBannerWrap = getNode(".swiper_banner_wrap");

const mainBanner = getNode(".main_banner");

const recommendList = getNodes(".recommend_today_list");
// const bannerContainer = getNode(".swiper_banner");
// const recommendWrap = getNode(".recommend_today_list_wrap");

const [recommendWrapFirst, recommendWrapSecond] = getNodes(
  ".recommend_today_list_wrap",
);

// console.log(recommendWrapFirst);
// console.log(recommendWrapSecond);
// 메인 스와이퍼

//데이터 구조분해할당
bannerData.forEach(({ src, alt, figcaption }) => {
  const templete = /*html*/ `
      <figure class="main_banner_image_box swiper-slide">
      
      <img
        class="main_banner_image"
        src=${src}
        alt=${alt}
      />
      <figcaption class="sr-only">
        ${figcaption}
      </figcaption>
      </figure>
  
    `;

  insertLast(mainBannerWrap, templete);
});

// 프로덕트 데이터 구조분해할당
productsData.forEach(
  ({ name, description, price, saleRatio, salePrice, image }) => {
    const recommendForSale = /*html*/ `
    <li class="recommend_today_product swiper-slide" >
      <a href="/">
        <figure class="recommend_today_image">
          <img
            src="../assets/${image.thumbnail}"
            alt=${image.alt}
          />
          <figcaption class="sr-only">
            ${description}
          </figcaption>
        </figure>
        
      </a>
      <a
        class="recommend_today_name"
        href="/"
        
        >${name}</a
      >
      <span
        class="recommend_today_price"
        
        >${price} 원</span
      >
      <button
        class="recommend_today_cart"
        aria-label="장바구니 버튼"
      ></button>
    </li>

    `;

    const recommendOnSale = /*html*/ `
    <li class="recommend_today_product swiper-slide">
      <a href="/">
        <figure class="recommend_today_image">
          <img 
            src="../../assets/${image.thumbnail}"
  
            alt=${image.alt}
          />
          <figcaption class="sr-only">
            ${description}
          </figcaption>
        </figure>
        
      </a>
      <a
        class="recommend_today_name"
        href="/"
      
        >${name}</a
      >
      <span class="recommend_today_sale" 
        >${saleRatio}&#37;</span
      >
      <span class="recommend_today_price">${salePrice} 원</span>
      <span class="recommend_today_before_price" aria-hidden="true">${price} 원</span>

      

      
      <button
        class="recommend_today_cart"
        aria-label="장바구니 버튼"
      ></button>
    </li>
    `;

    if (!salePrice) {
      insertLast(recommendWrapFirst, recommendForSale);
      insertLast(recommendWrapSecond, recommendForSale);
    } else {
      insertLast(recommendWrapFirst, recommendOnSale);
      insertLast(recommendWrapSecond, recommendOnSale);
    }
  },
);

//팝업 닫기
const handlePopupClose = (e) => {
  const popup = getNode(".main_popup");

  invisibleElement(popup);
};

//배너 닫기
const handleBannerClose = (e) => {
  const banner = getNode(".header_banner");

  
  gsap.to(banner, {
    marginTop: -banner.clientHeight,
    opacity: 0,
    maxHeight: 1,
    duration: 0.5, // 애니메이션 지속 시간을 설정합니다(옵션).

    onComplete: function () {
      banner.style.display = "none";
    },
  });

};

// 호버 함수
function fadeIn() {
  const node = getNodes(".main_banner_button");
  gsap.to(node, { duration: 1, opacity: 1, ease: "expo.out" });
}
function fadeout() {
  const node = getNodes(".main_banner_button");
  gsap.to(node, { duration: 1, opacity: 0, ease: "expo.out" });
}

function CurrentSlideIndex(swiper) {
  // console.log('현재 슬라이드 번호:', swiper.realIndex + 1); // 현재 슬라이드 번호 출력
  return swiper.realIndex + 1;
}

function slideNum(curNum, length) {
  const slide = getNode(".main_banner_page");
  const templete = `
    ${curNum} / ${length}
  `;
  clearContents(slide);
  insertLast(slide, templete);
}

// 배너
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
      slideNum(CurrentSlideIndex(this), bannerData.length);
    },

    slideChangeTransitionStart: function () {
      let slideChanged = false;
      if (!slideChanged) {
        slideChanged = true;
        setTimeout(() => {
          slideNum(CurrentSlideIndex(this), bannerData.length), // 슬라이드 전환 후 슬라이드 번호 출력
            (slideChanged = false);
        }, 50);
      }
    },
  },
});

// 프로덕트 스와이퍼

function handleNavigationButtons(swiperInstance, rightNode, leftNode) {
  const nextButton = getNode(rightNode)
  const prevButton =getNode(leftNode)
  const animationDuration = 0.1; // 애니메이션 지속 시간을 초 단위로 설정합니다.

  if (swiperInstance.isBeginning) {
    gsap.to(prevButton, {
      opacity: 0,
      pointerEvents: "none",
      duration: animationDuration,
    });
  } else {
    gsap.to(prevButton, {
      opacity: 1,
      pointerEvents: "auto",
      duration: animationDuration,
    });
  }

  if (swiperInstance.isEnd) {
    gsap.to(nextButton, {
      opacity: 0,
      pointerEvents: "none",
      duration: animationDuration,
    });
  } else {
    gsap.to(nextButton, {
      opacity: 1,
      pointerEvents: "auto",
      duration: animationDuration,
    });
  }
}

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
      handleNavigationButtons(
        this,
        ".good_price_right_arrow",
        ".good_price_left_arrow",
      );
    },
    slideChange: function () {
      handleNavigationButtons(
        this,
        ".good_price_right_arrow",
        ".good_price_left_arrow",
      );
    },
  },
});

// ----------------------------------------------------------------------
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
      handleNavigationButtons(
        this,
        ".recommend_right_arrow",
        ".recommend_left_arrow",
      );
    },
    slideChange: function () {
      handleNavigationButtons(
        this,
        ".recommend_right_arrow",
        ".recommend_left_arrow",
      );
    },
  },
});

// 이미지 확대
function onMouseEnter(e) {
  gsap.to(e.target, { duration: 0.3, scale: 1.05, ease: "power2.out" });
}

function onMouseLeave(e) {
  gsap.to(e.target, { duration: 0.3, scale: 1, ease: "power2.out" });
}

const images = getNodes(".recommend_today_image img");
images.forEach((img) => {
  img.addEventListener("mouseenter", onMouseEnter);
  img.addEventListener("mouseleave", onMouseLeave);
});

close.addEventListener("click", handlePopupClose);
bannerClose.addEventListener("click", handleBannerClose);

mainBanner.addEventListener("mouseenter", fadeIn);

mainBanner.addEventListener("mouseleave", fadeout);

mainBannerContainer.addEventListener("mouseenter", function () {
  bannerSwiper.autoplay.stop();
});

mainBannerContainer.addEventListener("mouseleave", function () {
  bannerSwiper.autoplay.start();
});

// 스와이퍼 사용하기
