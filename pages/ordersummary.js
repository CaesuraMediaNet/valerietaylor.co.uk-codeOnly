// React.js
//
import { useState }  from 'react';
import { useEffect } from 'react';

// Next.js
//
import Link          from 'next/link';

// Local components.
//
import Layout        from '../components/layout';
import Header        from '../components/Header';

// Local functions.
//
import calcColumnsH1 from '../functions/calcColumnsH1';
import { getOrders } from '../functions/orderSummaryCookies';
import getProductFromName from '../functions/getProductFromName';

// MUI
//
import Masonry                from '@mui/lab/Masonry';

export default function OrderSummary() {
   const [numColumns, setNumColumns] = useState(3);
   const [h1FontSize, setH1FontSize] = useState(65);
   const [orders,     setOrders    ] = useState([]);
   const [total,      setTotal     ] = useState(0);

   const updateSize = () => {
      setH1FontSize(calcColumnsH1(window).thisH1FontSize);
   }

   useEffect(() => {
      const thisOrders = getOrders();
      setOrders(thisOrders);
      let thisTotal = 0;
      thisOrders.forEach((order, index) => {
         thisTotal += order.price * order.quantity;
      });
      setTotal(thisTotal);
      setH1FontSize(calcColumnsH1(window).thisH1FontSize);
      setNumColumns(calcColumnsH1(window).thisNumColumns);
      window.onresize = updateSize;
   }, []);

   return (
      <Layout title={"Valerie Taylor | Art | Order Summary"}>
         <Header h1FontSize={h1FontSize} title={"Valerie Taylor | Art | Order Summary"} home={false} />
         <div style={{marginTop:-25, marginBottom:25}}>
            <div style={{ fontSize:h1FontSize/3}}>Thank you for your order, most appreciated! Please allow 14 days for delivery, thank you.</div>
            {orders[0]?.orderNumber && 
               <div style={{ fontSize:h1FontSize/4}}><i>Your order number is {orders[0].orderNumber}</i></div>
            }
         </div>
         <Masonry
            style={{marginLeft : 'auto', marginRight : 'auto'}}
            columns={numColumns}
            spacing={
               numColumns > 1 ? 5 : 2
            }
         >
         {orders.map((order, index) => (
            <div
               key={index}
               style={{
                  display      : 'flex',
                  flexDirection : 'column',
                  border       : '1px solid lightgrey',
                  textAlign    : 'left',
                  alignItems   : 'center',
               }}
            >
               <img
                  style={{
                     padding : 10,
                  }}
                  width={120}
                  src={getProductFromName(order.item).image}
               />
               <p>
                  "{order.item}"
               </p>
               <p>
                  {getProductFromName(order.item).size}
               </p>
               <p>
                  &#64; &pound;{order.price / 100} each
               </p>
               {order.quantity > 1 &&
                  <p>
                     {order.quantity} prints, total &pound;{((order.price * order.quantity) / 100).toFixed(2)}
                  </p>
               }
            </div>
         ))}
         </Masonry>
         <h5>Total : &pound;{(total/100).toFixed(2)} including VAT</h5>
         <h2>Thank you!</h2>
      </Layout>
   );
}
