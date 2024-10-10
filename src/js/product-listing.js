import ProductData from '../js/ProductData.mjs';
import ProductList from '../js/ProductList.mjs';
import { loadHeaderFooter, getParam } from './utils.mjs';

loadHeaderFooter();

const category = getParam('category');
const dataSource = new ProductData();
const listElement = document.querySelector('.product-list');
const categoryNameElement = document.querySelector('.category-name');

// Update the category name in the heading
categoryNameElement.textContent = category.charAt(0).toUpperCase() + category.slice(1);

const myList = new ProductList(category, dataSource, listElement);
myList.init();