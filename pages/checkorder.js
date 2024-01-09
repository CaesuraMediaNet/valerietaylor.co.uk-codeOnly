// An interim loading page which checks the order is correct from Stripe and
// redirects to /ordersummary after setting the order detail cookie.
//

// React.js
//
import { useState }  from 'react';
import { useEffect } from 'react';

// Next.js
//
import Link          from 'next/link';
import { useRouter } from 'next/router';
import useSWR        from 'swr';

// https://github.com/vercel/next.js/tree/canary/examples/with-stripe-typescript
//
import { fetchGetJSON } from '../utils/api-helpers'

// Local components.
//
import Layout        from '../components/layout';
import Header        from '../components/Header';
import ErrorComponent from '../components/ErrorComponent';

// Local functions.
//
import calcColumnsH1 from '../functions/calcColumnsH1';
import {
   addItemToOrders,
   clearOrders,
}                    from '../functions/orderSummaryCookies';

// use-shopping-cart
//
import Cart          from '../components/Cart'
import ClearCart     from '../components/ClearCart'

// MUI
//
import Grid             from '@mui/material/Unstable_Grid2';
import DeleteIcon       from '@mui/icons-material/Delete';
import Button           from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

export default function CheckOrderPage() {
   const [h1FontSize, setH1FontSize] = useState(65);
   const [hasError,   setHasError  ] = useState('');
   const router                      = useRouter();

   const updateSize = () => {
      setH1FontSize(calcColumnsH1(window).thisH1FontSize);
   }

   useEffect(() => {
      setH1FontSize(calcColumnsH1(window).thisH1FontSize);
      window.onresize = updateSize;
   }, []);


   // Fetch CheckoutSession from static page via
   // https://nextjs.org/docs/basic-features/data-fetching#static-generation
   //
   const { data, error } = useSWR(
      router.query.session_id
         ? `/api/checkout_sessions/${router.query.session_id}`
         : null,
      fetchGetJSON
   );
   if (error) setHasError(error);

   // Redirect to /ordersummary when data is available.
   // To avoid flakyness if user returns to page (email is sent), refreshes or clicks back button etc.
   // Keep the order in Cookies for /ordersummary to read.
   //
   useEffect(() => {
      if (data?.line_items?.data) {
         // console.log("data.line_items.data updated, redirecting : ", data.line_items.data);
         clearOrders();
         data.line_items.data.forEach((item, index) => {
            addItemToOrders(item.description, item.price.unit_amount, data.payment_intent.id, item.quantity);
         });
         router.push('/ordersummary');
      }
      if (data?.statusCode && data.statusCode !== 200) {
         setHasError(data);
         console.log("data.statusCode !== 200 : ", data);
      }
   }, [data]);

   return (
      <>
      {/*<pre>{JSON.stringify(data, null, 3)}</pre>*/}
      <Layout  title={"Valerie Taylor | Art | Order Summary"}>
         <Header h1FontSize={h1FontSize} title={"Valerie Taylor | Art | Order Summary"} home={false} />
         {hasError && <ErrorComponent message={"Error 31890 : " + JSON.stringify(hasError)} />}
         {data?.line_items?.data && 
            <Cart>
               <CircularProgress color="secondary" sx={{ fontSize: "48" }} />
               <ClearCart />
            </Cart>
         }
         {!data?.line_items?.data && !hasError && <CircularProgress color="secondary" sx={{ fontSize: "48"}} />}
      </Layout>
      </>
   );
}
