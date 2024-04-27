import { getNodes } from "../../../lib/index.js";
// 이미지 확대
export const onMouseEnter = (e) => {
  gsap.to(e.target, { duration: 0.3, scale: 1.05, ease: "power2.out" });
};

export const onMouseLeave = (e) => {
  gsap.to(e.target, { duration: 0.3, scale: 1, ease: "power2.out" });
};

