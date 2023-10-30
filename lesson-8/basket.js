'use strict';

let cartCount = document.querySelector('.cartIconWrap > span');
let cartTotalValue = document.querySelector('.basketTotalValue');
let cartTotal = document.querySelector('.basketTotal');
document.querySelector('.cartTotalCount').style.display = "none";
cartCount.textContent = '';

let cartList = document.querySelector('.basket');
let cartIcon = document.querySelector('.cartIconWrap');
cartIcon.addEventListener('click', event => {
    cartList.classList.toggle('hidden');
});

let basket = {};

let toCartBtns = document.querySelectorAll('.addToCart');
toCartBtns.forEach(toCartBtn => {
    toCartBtn.addEventListener('click', event => {
        document.querySelector('.cartTotalCount').style.display = "inline-block";
        const featuredItem = event.target.closest('.featuredItem');
        const id = +featuredItem.dataset.id;
        const name = featuredItem.dataset.name;
        const price = +featuredItem.dataset.price;
        addToCart(id, name, price);
    });
});

function addToCart(id, name, price) {
    if (!(id in basket)) {
        basket[id] = {id: id, name: name, price: price, count: 0};
    }
    basket[id].count++;
    cartCount.textContent = getTotalBasketCount();
    cartTotalValue.textContent = getTotalBasketPrice();
    renderProductInBasket(id);
}

function getTotalBasketCount() {
    const productsArr = Object.values(basket);
    let count = 0
    for (const product of productsArr) {
        count += product.count;
    }
    return count;
}

function getTotalBasketPrice() {
    const productsArr = Object.values(basket);
    let total = 0
    for (const product of productsArr) {
        total += product.count * product.price;
    }
    return total;
}

function renderProductInBasket(id) {
    const basketRowEl = cartList.querySelector(`.basketRow[data-id="${id}"]`);
    if (!basketRowEl) {
        renderNewProuductInBasket(id);
        return;
    }
    basketRowEl.querySelector('.productCount').textContent = basket[id].count;
    basketRowEl.querySelector('.productTotalRow').textContent = basket[id].count * basket[id].price;
}

function renderNewProuductInBasket(productId) {
    const productRow = `
    <div class="basketRow" data-id="${productId}">
      <div>${basket[productId].name}</div>
      <div>
        <span class="productCount">${basket[productId].count}</span> шт.
      </div>
      <div>$${basket[productId].price}</div>
      <div>
        $<span class="productTotalRow">${(basket[productId].price * basket[productId].count).toFixed(2)}</span>
      </div>
    </div>
    `;
    cartTotal.insertAdjacentHTML("beforebegin", productRow);
}