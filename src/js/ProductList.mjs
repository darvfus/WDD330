import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  console.table(product);
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
    // our dataSource will return a Promise...so we can use await to resolve it.
    const list = await this.dataSource.getData();
    // render the list
    this.renderList(list);
  }

  renderList(list) {
    let filteredList = this.filterList(list)
    renderListWithTemplate(productCardTemplate, this.listElement, filteredList);
  }

  filterList(list) {
    let filteredList = list.filter((name,i) => i < 4);

    return filteredList;
  }
}