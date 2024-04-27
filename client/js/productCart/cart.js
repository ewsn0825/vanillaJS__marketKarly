import { clearContents, getNode } from "../../lib/index.js";

const cartList = getNode(".cart_contents");
const showPrice = getNode(".show_price_product");

// 로컬 스토리지에서 상품 정보를 가져오는 함수
function getProductsFromLocalStorage() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  return cartItems;
}

function renderProductsFromLocalStorage() {
  const products = getProductsFromLocalStorage();

  // 이전에 랜더링된 상품 정보를 지우고, 새로운 상품 정보를 랜더링할 컨테이너 요소를 가져옴
  const productInfoContainer = getNode(".product_info");
  productInfoContainer.innerHTML = "";

  // 각 상품 정보를 랜더링
  for (const product of products) {
    const productElement = document.createElement("div");
    productElement.classList.add("product_item");

    // 상품명
    const productName = document.createElement("span");
    productName.innerText = `상품명: ${product.name}`;
    productElement.appendChild(productName);

    // 상품금액
    const productPrice = document.createElement("span");
    productPrice.innerText = ` | 가격: ${product.price} 원`;
    productElement.appendChild(productPrice);

    // 상품수량
    const productQuantity = document.createElement("span");
    productQuantity.innerText = ` | 수량: ${product.quantity}`;
    productElement.appendChild(productQuantity);

    // 새로 생성한 상품 정보를 추가
    productInfoContainer.appendChild(productElement);
  }
}

// 페이지가 로드되면 로컬스토리지에서 상품 정보를 가져와서 랜더링
renderProductsFromLocalStorage();

/* ------------------------------- */

// 상품금액을 계산하고 랜더링하는 함수
function renderProductPrice() {
  const products = getProductsFromLocalStorage();
  let totalPrice = 0;

  // 상품 금액 합산
  for (const product of products) {
    totalPrice += parseInt(product.price) * parseInt(product.quantity);
  }

  // 랜더링할 요소
  const showPriceProductElement = getNode(".show_price_product");

  // 상품금액 업데이트
  showPriceProductElement.textContent = `${totalPrice.toLocaleString()} 원`;
}

// 페이지가 로드되면 상품금액을 랜더링
renderProductPrice();
/* ------------------------------- */
// 배송비
const deliveryPrice = getNode(".show_price_delivery");
const deliveryPriceValue = parseInt(
  deliveryPrice.textContent
    .split("")
    .filter((char) => !isNaN(char))
    .join(""),
);

// 상품금액
const showProductPrice = getNode(".show_price_product");
const showProductPriceValue = parseInt(
  showProductPrice.textContent
    .split("")
    .filter((char) => !isNaN(char))
    .join(""),
);

// 결제금액
const showPaymentPrice = getNode(".price_total_final");
let showPaymentPriceValue = parseInt(
  showPaymentPrice.textContent
    .split("")
    .filter((char) => !isNaN(char))
    .join(""),
);

function renderTotalPrice() {
  // 상품 금액 값이 비어있으면 0을 반환, 아니면 계산
  if (showProductPriceValue === 0) {
    showPaymentPriceValue = 0;
    console.log(showPaymentPrice);
  } else {
    showPaymentPriceValue = showProductPriceValue + deliveryPriceValue;
  }

  showPaymentPrice.textContent = `${showPaymentPriceValue.toLocaleString()} 원`;
}

// 페이지가 로드되면 총 금액을 랜더링
renderTotalPrice();

/* ------------------------------- */

// 장바구니에서 카드에 담은 것을 로컬스토리지에 삭제할 수 있는 기능
const removeProductItem = getNode(".cart_button_click");
const productInfo = getNode(".product_info");

function handlerRemove(e) {
  e.preventDefault();

  const cartItems = localStorage.getItem("cartItems");

  // 로컬 스토리지에서 제거
  if (cartItems !== null) {
    localStorage.removeItem("cartItems");
    // 바뀐 값 랜더링
    clearContents(productInfo);
    showPaymentPrice.textContent = "0 원";
    renderProductPrice();
    alert("상품이 모두 취소되었습니다.");
  } else {
    alert("상품목록이 이미 비어있습니다.");
  }
}

removeProductItem.addEventListener("click", handlerRemove);
