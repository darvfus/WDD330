import { setLocalStorage, getLocalStorage } from './utils.mjs';
import ProductData from './ProductData.mjs';
 
const dataSource = new ProductData('tents');
 
function addProductToCart(product) {
  // Verificar si ya hay productos en el carrito
  let cart = getLocalStorage('so-cart') || [];
  // Agregar el nuevo producto al carrito
  cart.push(product);
  // Actualizar el localStorage con el carrito actualizado
  setLocalStorage('so-cart', cart);
}
 
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}
 
// add listener to Add to Cart button
document
  .getElementById('addToCart')
  .addEventListener('click', addToCartHandler);