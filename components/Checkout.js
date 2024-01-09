// React.js
//
import { useState }  from 'react';
import { useEffect } from 'react';

// Next.js
//
import Link from 'next/link';

// MUI
//
import Grid             from '@mui/material/Unstable_Grid2';
import DeleteIcon       from '@mui/icons-material/Delete';
import Button           from '@mui/material/Button';
import Checkbox         from '@mui/material/Checkbox';
import FormGroup        from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Fab              from '@mui/material/Fab';
import AddIcon          from '@mui/icons-material/Add';
import CircularProgress from '@mui/material/CircularProgress';

// Local components.
//
import SelectQuantity    from '../components/SelectQuantity';
import ErrorComponent    from '../components/ErrorComponent';

// useShoppingCart.com
//
import { useShoppingCart } from 'use-shopping-cart'

// Helpers from https://github.com/vercel/next.js/tree/canary/examples/with-stripe-typescript
//
import { fetchPostJSON } from '../utils/api-helpers'

export default function Checkout() {
   const [loading, setLoading          ] = useState(false);
   const [cartEmpty, setCartEmpty      ] = useState(true);
   const [errorMessage, setErrorMessage] = useState('');
   const [tcChecked, setTcChecked      ] = useState(false);
   const [ppChecked, setPpChecked      ] = useState(false);
   const [bnAttempt, setBnAttempt      ] = useState(false);

   const {
      addItem,
      removeItem,
      incrementItem,
      decrementItem,
      formattedTotalPrice,
      cartCount,
      clearCart,
      cartDetails,
      redirectToCheckout,
      setItemQuantity,
   } = useShoppingCart();
   useEffect(() => setCartEmpty(!cartCount), [cartCount])

   function updateQuantity(id,quantity) {
      setItemQuantity(id, quantity);
   }
   function handleTcChecked (event) {
      setTcChecked(event.target.checked);
   }
   function handlePpChecked (event) {
      setPpChecked(event.target.checked);
   }

   async function handleCheckout(event) {
      event.preventDefault()
      setBnAttempt(true);
      // This seems to happen by default if the checkboxes are in the <form, but we can't rely on it.
      //
      if (!tcChecked || !ppChecked) return;
      setLoading(true)
      setErrorMessage('')

      const response = await fetchPostJSON(
         '/api/checkout_sessions/cart',
         cartDetails
      )
      if (response.statusCode > 399) {
         console.error(response.message);
         setErrorMessage("Error 34562 : " + response.message);
         setLoading(false);
         return;
      }
      redirectToCheckout(response.id);
   }
   // console.log ("cartDetails : ", cartDetails);

   return (
      <>
      {errorMessage && <ErrorComponent message={errorMessage} />}
      {!errorMessage &&
         <div style={{maxWidth : 1200}}>
            {Object.keys(cartDetails).length > 0 &&
            <>
            <Grid container spacing={1} style={{textAlign: 'left', alignItems : 'center'}}>
               <Grid style={{textAlign: 'left'}} xs={4} md={2}>
                  <span style={{fontSize : 16}}>Prices include VAT</span>
               </Grid>
               <Grid style={{textAlign: 'right'}} xs={4} md={8}>
                  <span style={{fontSize : 24}}>Total</span>
               </Grid>
               <Grid style={{textAlign: 'right'}} xs={4} md={2}>
                  <span style={{fontSize : 24}}>{formattedTotalPrice}</span>
               </Grid>
            </Grid>
            <form style={{marginBottom:25,textAlign:'right'}} onSubmit={handleCheckout} suppressHydrationWarning>
               <Button
                  variant="outlined"
                  type="submit"
                  disabled={cartEmpty || loading}
               >
                  {loading ? <CircularProgress color="primary"  sx={{ fontSize: "12" }}  /> : 'Buy now'}
               </Button>
            </form>
            <div style={{textAlign:'right'}} >
               <FormControlLabel
                  checked={tcChecked}
                  onChange={handleTcChecked}
                  control={<Checkbox />}
                  label={<p>I accept the <a href="/termsandconditions" target="_blank" >T&Cs</a></p>}
               />
               <FormControlLabel
                  checked={ppChecked}
                  onChange={handlePpChecked}
                  control={<Checkbox />}
                  label={<p>I accept the <a href="/privacypolicy" target="_blank" >Privacy Policy</a></p>}
               />
               {(!tcChecked || !ppChecked) && bnAttempt &&
                  <div style={{marginBottom:25,textAlign:'right', color:'red'}}>
                     Please accept the <a href="/termsandconditions" target="_blank">Terms and Conditions (T&Cs)</a> and the <a href="/privacypolicy" target="_blank">Privacy Policy</a> before purchase. Thank you!
                  </div>
               }
            </div>
            </>
            }
            {Object.keys(cartDetails).length < 1 &&
               <>
               <p>No items in your cart</p>
               <div style={{
                     flexDirection  : 'row',
                     display        : "flex",
                     justifyContent : 'space-around',
                     alignItems     : 'center'
                  }}
               >
                  <Link href="/">
                     <Button variant="outlined">Home</Button>
                  </Link>
               </div>
               </>
            }
            {Object.keys(cartDetails).map((id, index) => (
               <div key={index}
                  style={{
                     borderBottom : '1px solid lightgrey',
                     borderTop    : index === 0 ? '1px solid lightgrey' : 'unset',
                     paddingTop   : 15,
                     paddingBottom: 15,
               }}>
                  <Grid container spacing={1} style={{textAlign: 'left', alignItems : 'center'}}>
                     <Grid xs={12} md={1}>
                        <img
                           style={{
                              paddingTop    : 2,
                              paddingBottom : 2
                           }}
                           width={65}
                           src={`/img/small/${cartDetails[id].image.replace(/^.+\//, '')}`}
                        />
                     </Grid>
                     <Grid xs={12} md={1}>
                        <h3 key={index}>{cartDetails[id].name}</h3>
                     </Grid>
                     <Grid xs={12} md={2}>
                        <p key={index}>{cartDetails[id].description}</p>
                     </Grid>
                     <Grid xs={12} md={2}>
                        <SelectQuantity
                           initialQuantity={cartDetails[id].quantity}
                           id={id}
                           updateQuantity={updateQuantity}
                        />
                     </Grid>
                     <Grid xs={12} md={2}>
                        <p key={index}>{cartDetails[id].quantity} print{cartDetails[id].quantity == 1 ? '' : 's'}</p>
                     </Grid>
                     <Grid xs={12} md={2}>
                        <Fab size="small" color="primary" aria-label="add">
                            <DeleteIcon
                               onClick={() => removeItem(id)}
                            />
                        </Fab>
                     </Grid>
                     <Grid xs={12} md={2}>
                         <h3>{cartDetails[id].formattedValue}</h3>
                     </Grid>
                  </Grid>
               </div>
            ))}
         </div>
      }
      </>
   );
}
