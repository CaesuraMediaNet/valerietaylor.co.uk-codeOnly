// There is no image data post Stripe, just a description, so look it up in
// data/products.ts
//
import products from '../data/products';
export default function getProductFromDescription(name) {
   let productDetail;
   for (const product of products) {
      if (product.name == name) {
         productDetail = product;
         break;
      }
   }
   if (!productDetail) {
      console.log ("Error with getProductFromDescription : no product in data/products for " + name);
      productDetail = {
          name         : name,
          description  : name,
          id           : 'sku_VividOne',
          price        : 15000,
          image        : 'https://www.valerietaylor.co.uk/img/main/One.jpg',
          attribution  : 'Valerie Taylor',
          currency     : 'GBP',
      }
   }
   return productDetail;
}
