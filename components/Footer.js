import Link                      from 'next/link';
import styles                    from '../styles/valerietaylor.module.css';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import Grid                      from '@mui/material/Unstable_Grid2';

const iconWidth = 25;
const aStyles = {
   color          : 'unset',
   textDecoration : 'underline',
};

export default function Footer () {
   return (
       <footer style={{borderTop:"1px solid black", marginTop : 25}}>
         <p>
            Copyright &copy; Valerie Taylor {new Date().getFullYear()}. All Rights Reserved.
         </p>
         <p>
            <span style={{marginRight : 10}}>
               <Link style={{textDecoration: "underline", color : 'unset'}} href="/privacypolicy">Privacy Policy</Link>
            </span>
            <span style={{marginLeft : 10}}>
               <Link style={{textDecoration: "underline", color : 'unset'}} href="/termsandconditions">T&Cs</Link>
            </span>
         </p>
         <div
            onClick={() => window.scrollTo({top:0, behavior : 'smooth'})}
            style={{position : 'fixed', bottom : 5, right : 0}}>
            <KeyboardDoubleArrowUpIcon  sx={{ fontSize: 45, color : 'black' }} />
         </div>
      </footer>
   );
}
