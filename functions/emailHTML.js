import getProductFromName from '../functions/getProductFromName';

export default function emailHTML (checkout_session, customer) {
   // console.log ("emailHTML : checkout_session.line_items.data : ", checkout_session.line_items.data);
   let heading ='';
   let returns = '';
   if (customer) {
      heading = 
         `<h3>Thankyou for your order from Valerie Taylor Artworks</h3>
         <p>Please allow up to 14 days for delivery, we are working as fast as we can! </p>
         `;
      returns =
         `<p style="font-size:10px">
            Any claims of return or damage to an order, where not damaged in transit, will need to be
            reported within 24 hours of receiving the goods. Please notify our terrific printers, Spectrum Photo,
            on 01273 708222 to report any damage. If you are unable to get through to a member of staff, please
            email studio@spectrumphoto.co.uk. Damaged print(s) need to be returned to Spectrum in their
            original state to : <i>Lower Ground Floor, Frederick House, 42 Frederick Place, Brighton. BN1 4EA. United
            Kingdom.</i>  It is your responsibility to verify the product, but all accepted claims will be handled with the
            highest priority.
         </p>
         `;
   } else {
      heading = 
         `<h3>Hello Spectrum! Here is an Online Order from 
         ${checkout_session.shipping_details.name}
         at
         ${checkout_session.customer_details.email}</h3>`;
   }

   let address = '';
   address += `<div>${checkout_session.customer_details.address.line1}</div>`;
   address += `<div>${checkout_session.customer_details.address.line2}</div>`;
   address += `<div>${checkout_session.customer_details.address.city}</div>`;
   address += `<div>${checkout_session.customer_details.address.postal_code}</div>`;
   address += `<div>${checkout_session.customer_details.address.state || ''}</div>`;
   address += `<div>${checkout_session.customer_details.address.country}</div>`;

   let items = '';
   checkout_session.line_items.data.forEach((item, index) => {
      let image    = `<img width="100" src="${getProductFromName(item.description).image}" />`;
      let postfix  = '';
      if (item.quantity > 1) postfix = 's';
      let quantity = `${item.quantity} print${postfix}, total &pound;${(item.amount_total/100).toFixed(2)}`;

      items += `<div style="padding:10px;">
         ${image}
         "${item.description}" : 
         ${getProductFromName(item.description).size} : 
         ${quantity}
      </div>`;

   });
   let total = `<p><b>Total : &pound;${(checkout_session.amount_total / 100).toFixed(2)} including VAT</b></p>`;

   let orderNumber = checkout_session?.payment_intent?.id;

   return `<div style="padding:10px,margin:10px;">
              ${heading}
              <div style="margin:10px">
                 <h4>Delivery Address</h4>
                 ${address}
                 <h4>Order details</h4>
                 ${items}
                 ${total}
                 <p>Please take a note of the order number : ${orderNumber}</p>
                 <p>All prints will be on Hahnemühle Fine Art Pearl paper.  The prints will be actual sizes above on A4 paper sheets.</p>
                 <h3>Thank you!</h3>
                 ${returns}
              </div>
           </div>
   `;
}
