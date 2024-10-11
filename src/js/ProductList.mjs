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
      (item) => this.productCardTemplate(item),
      this.listElement,
      filteredList
    );
    this.displayTotalAmount(filteredList);
  }

  filterProducts(list, count = 4) {
    return list
      .filter(item => item.category === 'tents')
      .slice(0, count);
  }

  productCardTemplate(product) {
    return `<li class="product-card">
      <a href="product_pages/index.html?product=${product.Id}">
        <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}">
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.NameWithoutBrand}</h2>
        <p class="product-card__price">$${product.FinalPrice}</p>
        ${this.getDiscountHTML(product)}
      </a>
    </li>`;
  }

  getDiscountHTML(product) {
    if (product.SuggestedRetailPrice > product.FinalPrice) {
      const discount = ((product.SuggestedRetailPrice - product.FinalPrice) / product.SuggestedRetailPrice * 100).toFixed(0);
      const discountPrice = (product.FinalPrice * 0.9).toFixed(2);
      return `
        <p class="product-card__discount">
          <s>$${product.SuggestedRetailPrice}</s>
        </p>
        <p class="product-card__discount-price">
          $${discountPrice}
          <span class="discount-percent">${discount}% off</span>
        </p>
      `;
    }
    return '';
  }

  displayTotalAmount(products) {
    const totalAmount = products.reduce((total, product) => total + product.FinalPrice, 0);
    const totalElement = document.createElement('div');
    totalElement.classList.add('total-amount');
    totalElement.innerHTML = `<h3>Total Amount: $${totalAmount.toFixed(2)}</h3>`;
    this.listElement.after(totalElement);
  }
}