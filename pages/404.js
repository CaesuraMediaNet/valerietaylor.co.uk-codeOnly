import Layout, { siteTitle }  from '../components/layout';
import Link                   from 'next/link';
import Image                  from 'next/image';
import Footer                 from '../components/Footer';
import calcColumnsH1          from '../functions/calcColumnsH1';
import Grid                   from '@mui/material/Unstable_Grid2';
import { useState }           from 'react';
import { useEffect }          from 'react';
import { useRef }             from 'react';

export default function About () {
   const [h1FontSize, setH1FontSize]        = useState(65);
   const updateSize = () => {
      setH1FontSize(calcColumnsH1(window).thisH1FontSize);
   }
   useEffect(() => {
      setH1FontSize(calcColumnsH1(window).thisH1FontSize);
      window.onresize = updateSize;
   }, []);

   const pStyle = {
      fontSize : 24,
      padding  : 10,
      margin   : 10,
   }

   return (
      <Layout title={"Valerie Taylor | Art | 404"}>
         <div style={{flexDirection : 'row', display: "flex", justifyContent : 'space-between', alignItems : 'center'}}>
            <h1 style={{textAlign: 'left', fontSize : h1FontSize}}>Valerie Taylor | Art | 404</h1>
            <Link style={{fontSize : h1FontSize/2, textDecoration: "underline", color : 'unset'}} href="/">Home</Link>
         </div>
         <Grid container spacing={2}>
            <Grid style={{marginLeft   : 'auto',marginRight  : 'auto',}} md={4}>
               <div
                  style={{
                     marginLeft   : 'auto',
                     marginRight  : 'auto',
                     width        : "90%",
                     borderRadius : '0.2rem',
                     overflow     : 'hidden',
                     border       : '1px solid rgba(0, 0, 0, 1.0)',
                     padding      : 10,
                     boxShadow    : '0px 0px 15px 5px #D2D6C5',
                  }}
               >
                  <img
                     src={'/img/main/One.jpg?w=162&auto=format'}
                     srcSet={'/img/small/One.jpg 333w, /img/medium/One.jpg 666w, /img/main/One.jpg 1000w'}
                     alt={"Valerie Taylor Sample Image"}
                     loading="lazy"
                     style={{
                        width: "100%",
                     }}
                  />
               </div>
            </Grid>
            <Grid md={8}>
               <h1 style={pStyle}>
                  Oops! That page is not found! Please click the Home link above.
               </h1>
               <p>
                  If you have just ordered prints, and are here then please contact us at
                  andyc [at] caesuramedia [dot] com 
                  to let us know and we will process your order or offer a refund.
               </p>
            </Grid>
         </Grid>
         <Footer />
      </Layout>
   );
}
