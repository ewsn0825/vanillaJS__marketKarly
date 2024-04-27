import {
  attr,
  bindEvent,
  clearContents,
  getNode,
  insertLast,
} from "../../lib/index.js";

await fetch("http://localhost:3000/db")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    // JSON 파일 내용을 JavaScript 객체로 변환한 데이터 사용
    const productId = getQueryStringValue("id");
    const products = data.products.find((item) => item.id === productId);

    // 상품 타이틀 설정
    const titleNode = getNode(".product_detail_title");

    clearContents(titleNode);
    insertLast(titleNode, products.name);

    // 상품 상세페이지에 타이틀 설정
    const descriptionTitleNode = getNode(".description_title");

    clearContents(descriptionTitleNode);
    insertLast(descriptionTitleNode, products.name);

    // 상품 서브 타이틀 설정
    const subTitle = getNode(".product_detail_sub_title");

    clearContents(subTitle);
    insertLast(subTitle, products.description);

    // 상품 상세에 서브 타이틀 설정
    const descriptionSubTitle = getNode(".description_sub_title");

    clearContents(descriptionSubTitle);
    insertLast(descriptionSubTitle, products.description);

    // 썸네일 이미지 경로 설정
    const thumbnailImageNode = getNode(".product_detail_image");

    thumbnailImageNode.src = `/assets/${products.image.thumbnail}`;
    thumbnailImageNode.alt = products.image.alt;

    // 상품 디테일 이미지
    const descriptionImageNode = getNode(".description_image");

    descriptionImageNode.src = `/assets/${products.image.banner}`;
    descriptionImageNode.alt = products.image.alt;

    // 상품 설명 이미지
    const productInfoImageNode = getNode(".description_detail_second_image");

    productInfoImageNode.src = `/assets/${products.image.info}`;
    productInfoImageNode.alt = `${products.image.alt}의 영양정보 이미지`;

    // 상품 가격 설정
    const productPriceNode = getNode(".product_detail_price");

    clearContents(productPriceNode);
    insertLast(productPriceNode, `${products.price} 원`);

    // 상품선택칸의 네임 설정
    const selectTitleNode = getNode(".product_select_title");

    clearContents(selectTitleNode);
    insertLast(selectTitleNode, products.name);

    // 상품선택칸의 가격 설정
    const selectProductPriceNode = getNode(".product_detail_select_price");

    clearContents(selectProductPriceNode);
    insertLast(selectProductPriceNode, `${products.price} 원`);

    // 상품 선택 후 총 금액의 기본 가격 설정
    const selectTotalPriceNode = getNode(".product_total_price");

    clearContents(selectTotalPriceNode);
    insertLast(selectTotalPriceNode, `${products.price} 원`);
  })
  .catch((error) => {
    console.error("JSON 데이터를 가져오는 도중 오류가 발생했습니다.", error);
  });

/* ------------------------------------- */
// 상품 선택 카운트 기능
const selectCount = getNode(".product_detail_select_count");

const plusButton = getNode(".product_detail_plus");

const minusButton = getNode(".product_detail_minus");

const productTotalPrice = getNode(".product_detail_all_price");

// 값에서 숫자만 찾아오는 코드
const selectPrice = getNode(".product_total_price");
const productPrice = parseInt(
  selectPrice.textContent
    .split("")
    .filter((char) => !isNaN(char))
    .join(""),
);

// + 버튼을 누르면 카운트값이 증가하는 기능
function handlerPlus(e) {
  e.preventDefault();

  countPlusNumber();
}

function countPlusNumber() {
  let countNumber = +selectCount.innerText + 1;
  if (countNumber === 0) {
    return alert("최소 주문수량은 1 입니다.");
  }

  clearContents(selectCount);
  insertLast(selectCount, `${countNumber}`);

  // 총 상품금액
  function totalPrice(countNumber) {
    let totalProductPrice = countNumber * productPrice;

    clearContents(productTotalPrice);
    insertLast(
      productTotalPrice,
      `총 상품금액: ${totalProductPrice.toLocaleString()} 원`,
    );
  }

  totalPrice(countNumber);
}

bindEvent(plusButton, "click", handlerPlus);

// - 버튼을 누르면 값이 카운트값이 감소하는 기능
function handlerMinus(e) {
  e.preventDefault();
  countMiusNumber();
}

function countMiusNumber() {
  let countNumber = +selectCount.innerText - 1;
  if (countNumber === 0) {
    return alert("최소 주문수량은 1 입니다.");
  }
  clearContents(selectCount);
  insertLast(selectCount, `${countNumber}`);

  // 총 상품금액
  function totalPrice(countNumber) {
    let totalProductPrice = countNumber * productPrice;

    clearContents(productTotalPrice);
    insertLast(
      productTotalPrice,
      `총 상품금액: ${totalProductPrice.toLocaleString()} 원`,
    );
  }
  totalPrice(countNumber);
}

bindEvent(minusButton, "click", handlerMinus);

/* ------------------------------------- */
// 현재 URL에서 쿼리 문자열을 가져오는 함수
function getQueryStringValue(key) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(key);
}

/* ------------------------------------- */
// 장바구니 담기를 누르면 로컬스토리지에 상품명, 갯수, 상품가격이 들어감

const selectProductName = getNode(".product_select_title");
const countNumber = getNode(".product_detail_select_count");
const selectTotalPrice = getNode(".product_total_price");
const selectProductPrice = parseInt(
  selectTotalPrice.textContent
    .split("")
    .filter((char) => !isNaN(char))
    .join(""),
);

const addToCartButton = document.getElementById("addToCartButton");

addToCartButton.addEventListener("click", () => {
  const productName = selectProductName.innerText; // 상품 이름
  const productPrice = selectProductPrice + ""; // 상품 가격
  const quantity = countNumber.textContent; // 상품 갯수

  // 로컬 스토리지에 상품 정보를 저장
  saveProductToLocalStorage(productName, productPrice, quantity);

  alert("장바구니에 추가되었습니다.");
});

function saveProductToLocalStorage(name, price, quantity) {
  // 이전에 저장된 상품 정보가 있다면 가져옴
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  // 동일한 상품이 있는지 확인
  const existingProductIndex = cartItems.findIndex(
    (item) => item.name === name && item.price === price,
  );

  if (existingProductIndex !== -1) {
    // 이미 존재하는 상품이면 수량을 합침
    cartItems[existingProductIndex].quantity = (
      parseInt(cartItems[existingProductIndex].quantity) + parseInt(quantity)
    ).toString();
  } else {
    // 새로운 상품을 추가
    const newItem = { name, price, quantity };
    cartItems.push(newItem);
  }

  // 중복된 상품을 합친 후, 새로운 배열에 저장
  const mergedItems = [];
  for (const item of cartItems) {
    const existingItemIndex = mergedItems.findIndex(
      (i) => i.name === item.name && i.price === item.price,
    );
    if (existingItemIndex !== -1) {
      mergedItems[existingItemIndex].quantity = (
        parseInt(mergedItems[existingItemIndex].quantity) +
        parseInt(item.quantity)
      ).toString();
    } else {
      mergedItems.push(item);
    }
  }

  // 로컬 스토리지에 업데이트된 상품 정보를 저장
  localStorage.setItem("cartItems", JSON.stringify(mergedItems));
}
