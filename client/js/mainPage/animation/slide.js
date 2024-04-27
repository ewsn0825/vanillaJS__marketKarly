import {getNode,clearContents,insertLast} from "../../../lib/index.js";

export const currentSlideIndex=(swiper) =>{
  // console.log('현재 슬라이드 번호:', swiper.realIndex + 1); // 현재 슬라이드 번호 출력
  return swiper.realIndex + 1;
}

export const numberOfSlide=(curNum, length)=> {
  const slide = getNode(".main_banner_page");
  const templete = `
    ${curNum} / ${length}
  `;
  clearContents(slide);
  insertLast(slide, templete);
}


export function handleArrowButtons(swiperInstance, rightNode, leftNode) {
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