import ProductData from './ProductData.mjs';

const productData = new ProductData('tents');

productData.getData().then((data) => {
    console.log('All Products:', data);
  }).catch((error) => {
    console.error('Error fetching product data:', error);
  });
  productData.findProductById('880RR').then((product) => {
    if (product) {
      console.log('Product found:', product);
    } else {
      console.log('Product not found');
    }
  }).catch((error) => {
    console.error('Error finding product:', error);
  });