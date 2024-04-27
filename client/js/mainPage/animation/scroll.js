import {getNode} from "../../../lib/index.js"

export const handelScrollPopup = () => {
  const popup = getNode(".main_popup");

  gsap.registerPlugin(ScrollTrigger);

  gsap.to(popup, {
    scrollTrigger: {
      trigger: popup,
      start: "top 0%", // 팝업의 상단이 viewport의 최상단에 도달하면 시작
      end: "bottom 0%", // 팝업이 viewport에서 사라지면 종료
      scrub: true, // 스크롤 속도와 일치시키기
      pin: true, // 스크롤 도중에 고정하기
    },
  });
};
