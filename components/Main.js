// React.js
//
import {
   useState,
   useEffect,
}             from 'react';

// Next.js
//
import Head   from 'next/head';
import Image  from 'next/image';
import Link   from 'next/link';
import styles from '../styles/valerietaylor.module.css';
import {
   useRouter
}             from 'next/router';

// Local functions.
//
import calcColumnsH1     from '../functions/calcColumnsH1';

// MUI
//
import Masonry                from '@mui/lab/Masonry';
import AddShoppingCartIcon    from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import Fab                    from '@mui/material/Fab';

// Local Components.
//
import Header       from '../components/Header';
import AkjImage     from '../components/AkjImage';
import Footer       from '../components/Footer';
import ShoppingCart from '../components/ShoppingCart';

// useShoppingCart.com
//
import { useShoppingCart } from 'use-shopping-cart';
import products            from '../data/products';

export default function Main() {
   const {
      addItem,
      removeItem,
      formattedTotalPrice,
      cartCount,
      clearCart,
      cartDetails,
      redirectToCheckout,
   } = useShoppingCart()

   const router                            = useRouter();

   const [numColumns, setNumColumns]       = useState(3);
   const [h1FontSize, setH1FontSize]       = useState(65);
   const [cartFontSize, setCartFontSize]   = useState(10);
   const [allowCart,  setAllowCart ]       = useState(true); // Test mode = false;
   const updateSize = () => {
      setNumColumns(calcColumnsH1(window).thisNumColumns);
      setH1FontSize(calcColumnsH1(window).thisH1FontSize);
   }
   useEffect(() => {
      setNumColumns(calcColumnsH1(window).thisNumColumns);
      setH1FontSize(calcColumnsH1(window).thisH1FontSize);
      window.onresize = updateSize;
   }, []);

   // https://www.valerietaylor.co.uk/?w1bb1e=w0bb1e to enable cart.
   // http://localhost:3000/?w1bb1e=w0bb1e
   //
   useEffect(() => {
      if(!router.isReady) return;
      if (router?.query?.w1bb1e && router.query.w1bb1e === "w0bb1e") {
         setAllowCart(true);
      }
   }, [router.isReady]);

   function updateCart(product) {
      if (cartDetails[product.id]) {
         removeItem(product.id);
      } else {
         addItem(product);
      }
   }
   /* Work out price dependant on area.
   products.map((product, pIndex) => {
      let h = product.size.replace(/mm/g, '').replace(/ x.*$/, '');
      let w = product.size.replace(/mm/g, '').replace(/^(.*)x.*$/, '$1');
      let a = h * w;
      let p = (25 + a/1250).toFixed(2);
      console.log ("product.name,a , p : ", product.name,a , p);
   });
   */

   return (
      <>
      {Object.keys(cartDetails).length > 0 && <ShoppingCart cart={cartDetails} />}
      <Header h1FontSize={h1FontSize} title={"Valerie Taylor | Art"} home={true} />
      <p style={{marginTop : -25, textAlign : 'left'}}>
         Valerie Taylor is a UK-based Artist who produces these astonishing artworks in her home studio.
         {allowCart && <span>&nbsp;
            Very high quality GICLÉE prints are available to order by clicking on the circles below each artwork.
         </span>
         }
      </p>
      <Masonry
         style={{marginLeft : 'auto', marginRight : 'auto'}}
         columns={numColumns}
         spacing={
            numColumns > 1 ? 5 : 2
         }
      >
         {products.map((product, pIndex) => (
            <div key={pIndex}
               style={{
                  borderRadius : '0.5rem',
                  overflow     : 'hidden',
                  border       : '1px solid rgba(190, 190, 190, 1.0)',
                  padding      : 0,
                  boxShadow    : '0px 0px 15px 5px #D2D6C5',
                  fontSize     : '1.3vh',
               }}
            >
               <div 
                  style={{
                     display        : 'flex',
                     alignItems     : 'center',
                     justifyContent : 'space-between',
                     marginLeft     : 10,
                     marginRight    : 10,
                  }}
               >
                  <h2>{product.name}</h2>
                  <h3>{product.size}</h3>
               </div>
               <AkjImage item={product.image} />
               {allowCart &&
                  <>
                  <Fab
                     size="small"
                     color="default"
                     aria-label="add"
                     onClick={(e) => updateCart(product)}
                     style={{
                        display      : 'flex',
                        float        : 'right',
                        cursor       : 'pointer',
                        alignItems   : 'center',
                        padding      : 10,
                        margin       : 10,
                        color        : cartDetails[product.id] ? '#1976d2' : '#9c27b0',
                     }}
                  >
                     {cartDetails[product.id] 
                     ? <RemoveShoppingCartIcon color="primary"   sx={{ fontSize: cartFontSize }} />
                     : <AddShoppingCartIcon    color="secondary" sx={{ fontSize: cartFontSize }} />
                     }
                     <span style={{fontSize : cartFontSize}}> &pound;{product.price/ 100}</span>
                  </Fab>
                  </>
               }
            </div>
         ))}
      </Masonry>
      <Footer />
      </>
   );
}
