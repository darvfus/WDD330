class Cart {
  constructor() {
    this.items = JSON.parse(localStorage.getItem("cart")) || [];
  }

  addItem(product) {
    this.items.push(product);
    this.save();
  }

  removeItem(productId) {
    this.items = this.items.filter((item) => item.Id !== productId);
    this.save();
  }

  getItems() {
    return this.items;
  }

  save() {
    localStorage.setItem("cart", JSON.stringify(this.items));
  }
}

export default new Cart();
import cart from "./cart.js";

document.addEventListener("DOMContentLoaded", () => {
  const cartListElement = document.querySelector(".cart-list");
  const items = cart.getItems();

  if (items.length === 0) {
    cartListElement.innerHTML = "<li>Your cart is empty.</li>";
  } else {
    items.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${item.NameWithoutBrand} - $${item.FinalPrice}`;
      cartListElement.appendChild(listItem);
    });
  }
});
