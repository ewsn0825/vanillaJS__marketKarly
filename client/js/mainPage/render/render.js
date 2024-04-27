import { bannerData, productsData } from "../index.js";
import { getNode,getNodes, insertLast } from "../../../lib/index.js";

// //데이터 구조분해할당

export const renderBanner = () => {
  const mainBannerWrap = getNode(".swiper_banner_wrap");

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
};

// 프로덕트 데이터 구조분해할당

export const renderProductImage = () => {
  const [recommendWrapFirst, recommendWrapSecond] = getNodes(
    ".recommend_today_list_wrap",
  );
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
};
