// imports
import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function productDetailsTemplate(product) {
    return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
      <h2 class="divider">${product.NameWithoutBrand}</h2>
      <img
        class="divider"
        src="${product.Image}"
        alt="${product.NameWithoutBrand}"
      />
      <p class="product-card__price">$${product.FinalPrice}</p>
      <p class="product__color">${product.Colors[0].ColorName}</p>
      <p class="product__description">
      ${product.DescriptionHtmlSimple}
      </p>
      <div class="product-detail__add">
        <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
      </div></section>`;
}

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;

    }
    async init() {
        // use our datasource to get the details for the current product. findProductById will return a promise!
        this.product = await this.dataSource.findProductById(this.productId);
        
        // render out the HTML
        this.renderProductDetails("main");

        // add a listener to Add to Cart button
        document
          .getElementById("addToCart")
          .addEventListener("click", this.addToCart.bind(this));
    }
    addToCart() {
      let cart = getLocalStorage("so-cart");
      if (!Array.isArray(cart)) {
          cart = cart ? [cart] : [];
      }
      // Check if the product is already in the cart
      const existingProductIndex = cart.findIndex(item => item.Id === this.product.Id);
      if (existingProductIndex >= 0) {
          // If the product exists, increment its quantity
          cart[existingProductIndex].quantity = (cart[existingProductIndex].quantity || 1) + 1;
      } else {
          // If it's a new product, add it with quantity 1
          this.product.quantity = 1;
          cart.push(this.product);
      }
      setLocalStorage("so-cart", cart);

    }
    renderProductDetails(selector) {
        const element = document.querySelector(selector);
        element.insertAdjacentHTML(
          "afterBegin",
          productDetailsTemplate(this.product)
        );
    }
}