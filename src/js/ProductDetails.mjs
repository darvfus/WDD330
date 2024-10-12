
import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import { baseURL } from './ProductData.js';

function productDetailsTemplate(product) {
  return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${product.Images.PrimaryLarge}"
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
    // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    this.product = await this.dataSource.findProductById(this.productId);
    // once we have the product details we can render out the HTML
    this.renderProductDetails("main");
    // once the HTML is rendered we can add a listener to Add to Cart button
    // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));
  }
  addToCart() {
    let cartContents = getLocalStorage("so-cart");
    //check to see if there was anything there
    if (!cartContents) {
      cartContents = [];
    }
    // then add the current product to the list
    cartContents.push(this.product);
    setLocalStorage("so-cart", cartContents);
  }
  renderProductDetails() {
    document.querySelector('#productName').innerText = this.product.Brand.Name;
    document.querySelector('#productNameWithoutBrand').innerText = this.product.NameWithoutBrand;
    document.querySelector('#productImage').src = `${baseURL}${this.product.Images.PrimaryLarge}`;
    document.querySelector('#productFinalPrice').innerText = this.product.FinalPrice;
    document.querySelector('#productColorName').innerText = this.product.Colors[0].ColorName;
    document.querySelector('#productDescriptionHtmlSimple').innerHTML = this.product.DescriptionHtmlSimple;
    document.querySelector('#addToCart').dataset.id = this.product.Id;
  }
}

// Sample product data (replace this with your actual data source)
const products = [
  {
    id: 1,
    name: "Cedar Ridge Rimrock 2-Person Tent",
    description: "The Cedar Ridge Rimrock tent is perfect for weekend camping trips. It offers easy setup and excellent weather resistance.",
    price: 149.99,
    image: "/public/images/rimrock-tent.jpg", // Adjust this path as necessary
    features: [
      "Easy setup in under 10 minutes",
      "Waterproof rainfly included",
      "Spacious for two people",
      "Durable and lightweight materials",
      "Ventilation ports to reduce condensation"
    ]
  },
  // Add more products as needed
];

// Function to simulate fetching a product by ID
async function findProductById(id) {
  return new Promise((resolve) => {
    const product = products.find(p => p.id === id);
    setTimeout(() => resolve(product), 100); // Simulating network delay
  });
}

class Product {
  constructor(productId) {
    this.productId = productId;
    this.productData = null;
  }

  async init() {
    try {
      // Use our datasource to get the details for the current product
      this.productData = await findProductById(this.productId);
      // Once we have the product details, render out the HTML
      this.renderProductDetails();
      // Add listener to Add to Cart button
      document.getElementById('addToCart')
        .addEventListener('click', this.addToCart.bind(this));
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  }

  renderProductDetails() {
    const mainElement = document.querySelector("main");
    mainElement.innerHTML = ''; // Clear existing content

    // Create product elements
    const productContainer = document.createElement("div");
    productContainer.className = "product-container";

    const productImage = document.createElement("img");
    productImage.src = this.productData.image;
    productImage.alt = `${this.productData.name} image`;

    const productName = document.createElement("h1");
    productName.textContent = this.productData.name;

    const productDescription = document.createElement("p");
    productDescription.textContent = this.productData.description;

    const productPrice = document.createElement("h2");
    productPrice.textContent = `$${this.productData.price.toFixed(2)}`;

    const featuresList = document.createElement("ul");
    this.productData.features.forEach(feature => {
      const listItem = document.createElement("li");
      listItem.textContent = feature;
      featuresList.appendChild(listItem);
    });

    const addToCartButton = document.createElement("button");
    addToCartButton.id = "addToCart";
    addToCartButton.textContent = "Add to Cart";

    // Append elements to the container
    productContainer.appendChild(productImage);
    productContainer.appendChild(productName);
    productContainer.appendChild(productDescription);
    productContainer.appendChild(productPrice);
    productContainer.appendChild(featuresList);
    productContainer.appendChild(addToCartButton);

    // Append product container to main element
    mainElement.appendChild(productContainer);
  }

  addToCart() {
    // Simulate adding the product to the cart
    console.log(`Added ${this.productData.name} to the cart.`);
    // Here you can implement more complex cart logic, e.g., updating cart state, notifying the user, etc.
  }
}

// Initialize the product page
const product = new Product(1); // Pass the product ID you want to display
product.init();

