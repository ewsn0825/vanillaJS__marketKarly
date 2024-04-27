import {invisibleElement } from "../../../lib/index.js";

//팝업 닫기
export const handlePopupClose = (e) => {
  
  const target = e.target.closest(".main_popup");
  
  invisibleElement(target);
};

//배너 닫기
export const handleBannerClose = (e) => {

  const banner = e.target.closest(".header_banner");
  

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
