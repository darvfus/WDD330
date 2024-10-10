import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "../js/shoppingCart.mjs";

loadHeaderFooter();

const cart = new ShoppingCart("so-cart", ".product-list");
cart.renderCartContents();