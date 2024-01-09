// React.js
//
import { useState }  from 'react';
import { useEffect } from 'react';
import { useRef }    from 'react';
import { useMemo }   from 'react';

// Next.js
//
import Link          from 'next/link';

// Local components.
//
import Layout        from '../components/layout';
import Header        from '../components/Header';
import Footer        from '../components/Footer';

// use-shopping-cart
//
import Cart          from '../components/Cart'
import Checkout      from '../components/Checkout'

// Local functions.
//
import calcColumnsH1 from '../functions/calcColumnsH1';

export default function CheckoutPage() {
   const [h1FontSize, setH1FontSize] = useState(65);
   const updateSize = () => {
      setH1FontSize(calcColumnsH1(window).thisH1FontSize);
   }
   useEffect(() => {
      setH1FontSize(calcColumnsH1(window).thisH1FontSize);
      window.onresize = updateSize;
   }, []);

   return (
      <Layout title={"Valerie Taylor | Art | Checkout"}>
         <Header h1FontSize={h1FontSize} title={"Valerie Taylor | Art | Checkout"} home={false} />
         <Cart>
            <Checkout />
         </Cart>
         <Footer />
      </Layout>
   );
}
