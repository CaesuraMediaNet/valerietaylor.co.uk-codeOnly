import Link from 'next/link';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

export default function ShoppingCart({cart}) {
   return (
      <Link href="/checkout" >
         <div
            style={{
               margin     : 5,
               position   : 'fixed',
               top        : 0,
               right      : 0,
               zIndex     : 9999,
            }}>
            <div style={{
               backgroundColor : 'lightgrey',
               padding         : 4,
               borderRadius    : 5,
               display         : 'flex',
               alignItems      : 'center'
            }}>
               <ShoppingCartCheckoutIcon color="secondary" sx={{ fontSize: 21 }} />
               <span>{Object.keys(cart).length} artwork{Object.keys(cart).length !== 1 ? "s" : ""}</span>
            </div>
         </div>
      </Link>
   );
}
