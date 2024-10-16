import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";
import cart from "./cart.js";

loadHeaderFooter();

const category = getParam("category");
const dataSource = new ProductData();
const listElement = document.querySelector(".product-list");
const categoryNameElement = document.querySelector(".category-name");

// Update the category name in the heading
if (category) {
  categoryNameElement.textContent =
    category.charAt(0).toUpperCase() + category.slice(1);
  const myList = new ProductList(category, dataSource, listElement);
  myList.init();

  // Add event listener for "Add to Cart" buttons
  listElement.addEventListener("click", (event) => {
    if (event.target.classList.contains("add-to-cart")) {
      const productId = event.target.getAttribute("data-id");
      const product = myList.getProductById(productId); // Assuming you have a method to get product details
      cart.addItem(product);
      alert(`${product.NameWithoutBrand} has been added to your cart!`);
    }
  });
}
