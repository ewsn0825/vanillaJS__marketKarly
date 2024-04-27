import { insertLast } from "../../lib/dom/insert.js";

function createProductList({
  id,
  name,
  description,
  price,
  saleRatio,
  salePrice,
  image,
  badge_karly,
  badge_text,
}) {
  const template = /* html */ `
      <li class="product_list"><a href="../../html/ProductDetail.html?id=${id}" class="product_link">
        <span class="product_info">
          <span class="tag" aria-label="상품태그 샛별배송">샛별배송</span>
          <span aria-label="${name}">${name}</span>
          ${
            saleRatio
              ? `<span class="discount">
                  <span class="discount_rate" aria-label="할인율">${saleRatio}%</span>
                  <span class="discount_price" aria-label="할인된 가격">${salePrice} 원</span>
                </span>
                <span class="non_discount" aria-label="할인전 가격">${price} 원</span>`
              : `<span class="product_price" aria-label="${price}">${price} 원</span>`
          }
          <span class="product_summary">${description}</span>
          <span class="product_badge">
          ${
            badge_karly
              ? `<span class="badge_karly" aria-label="칼리 온리 뱃지">karly _only</span>`
              : ``
          }
          ${
            badge_text
              ? ` <span class="badge_text" aria-label="한정수량">한정수량</span>`
              : ``
          }          
          </span>
        </span>

        <figure class="img_box">
          <figcaption class="a11y" aria-hidden="true">${name}</figcaption>
          <img src="../assets/${image.thumbnail}" class="product_img" alt="${
            image.alt
          }">

        </figure>
        <span class="cart_icon"></span>
      </a></li>
      `;
  return template;
}

export function renderProductList(target, data) {
  insertLast(target, createProductList(data));
}
