// Keep current order in Cookies for redirect when session_id is validated.
//
import Cookies from 'js-cookie';
const EXPIRETIME = 365 * 24 * 60 * 60 * 1000; // Hmm, do we expire this at all? A year then, for now.

export function addItemToOrders(item, price, orderNumber, quantity) {
   let orders = getOrders ();
   orders.push ({
      timestamp   : new Date().getTime(),
      item        : item,
      price       : price,
      orderNumber : orderNumber,
      quantity    : quantity,
   });
   let hash      = {};
   let newOrders = [];
   for (let i=0; i < orders.length; i++) {
      if (!hash[orders[i].orderNumber + orders[i].item]) { // Unique orderNumberItem key.
         hash[orders[i].orderNumber + orders[i].item] = 1;
         newOrders.push (orders[i]);
      }
   }
   Cookies.set('orders', JSON.stringify (newOrders));
   return newOrders;
}
export function deleteOrdersItem(item) {
   let orders = Cookies.get('orders');
   if (!orders?.length) {
      return [];
   } else {
      orders    = JSON.parse (orders);
      let index = orders.map(e => e.item).indexOf(item);
      if (index !== -1) {
         orders.splice(index, 1);
      }
      Cookies.set('orders', JSON.stringify (orders));
      return orders;
   }
}
export function getOrders() {
   let orders = Cookies.get('orders');
   if (!orders?.length) {
      return [];
   }
   orders  = JSON.parse (orders);
   let now = new Date().getTime();
   orders = orders.filter((item) => now < item.timestamp + EXPIRETIME);
   return orders;
}
export function clearOrders() {
   Cookies.set('orders', JSON.stringify ([]));
}
