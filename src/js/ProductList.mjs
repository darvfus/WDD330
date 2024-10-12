
import cart from './cart.js';
import { baseURL } from '../js/ProductData.mjs';

import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `<li class="product-card">
  <a href="product_pages/index.html?product=${product.Id}">
  <img
    src="${product.Image}"
    alt="Image of ${product.Name}"
  />
  <h3 class="card__brand">${product.Brand.Name}</h3>
  <h2 class="card__name">${product.Name}</h2>
  <p class="product-card__price">$${product.FinalPrice}</p></a>
  </li>`;
}


export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);
  }

  renderList(list) {
    const filteredList = this.filterProducts(list);
    renderListWithTemplate(
      (item) => productCardTemplate(item),
      this.listElement,
      filteredList
    );
    this.displayTotalAmount(filteredList);
  }

  filterProducts(list, count = 4) {
    return list
      .filter((item, i) => i < count);
  }

  productCardTemplate(product) {
    return `<li class="product-card">
      <a href="../product_pages/index.html?product=${product.Id}">
        <img 
          src="${baseURL}${product.Images.PrimaryMedium}" 
          alt="${product.Name}"
        >
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.NameWithoutBrand}</h2>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
      <button class="add-to-cart" data-id="${product.Id}">Add to Cart</button>
    </li>`;
  }
  getProductById(productId) {
    return this.dataSource.getData(this.category).then(products => {
      return products.find(product => product.Id === productId);
    });
  }
}