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
      fontSize : 14,
      padding  : 10,
      margin   : 10,
   }

   return (
      <Layout title={"Valerie Taylor | Art | T&Cs"}>
         <div style={{flexDirection : 'row', display: "flex", justifyContent : 'space-between', alignItems : 'center'}}>
            <h1 style={{textAlign: 'left', fontSize : h1FontSize}}>Valerie Taylor | Art | T&Cs</h1>
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
                     srcSet={'/img/small/GeoFlowers.jpg 333w, /img/medium/GeoFlowers.jpg 666w, /img/main/GeoFlowers.jpg 1000w'}
                     alt={"Valerie Taylor Sample Image"}
                     loading="lazy"
                     style={{
                        width: "100%",
                     }}
                  />
               </div>
            </Grid>
            <Grid style={{textAlign : 'left'}} md={8}>
               <h5>Terms and Conditions</h5>
               <p style={pStyle}>
                  While every effort will be made, exact colour matching cannot be guaranteed. It all depends on
                  your device's screen resolution and age. 
               </p>
               <p style={pStyle}>
                  We will make every effort to ensure orders are completed within the stated service time
                  but cannot accept liability of consequential losses arising should these not be met.
               </p>
               <p style={pStyle}>
                  The placing of an order online constitutes acceptance of price shown and liability for the
                  full order value. The placing of an order also constitutes acceptance of
                  our excellent printer's terms of business : https://spectrumphoto.co.uk/terms-conditions/
               </p>
               <p style={pStyle}>
                  Any claims of return or damage to an order, where not damaged in transit, will need to be
                  reported within 24 hours of receiving the goods to Spectrum Photo, our excellent printers.

                  Please notify them on +44 (0) 1273 708222 to report any damage. If unable to get through
                  to a member of staff please email hello@spectrumphoto.co.uk.

                  Damaged prints or mounted work needs to be returned to Spectrum in their original state. It is
                  your responsibility to verify the product, but, rest assured,  all accepted claims will be
                  handled with the highest priority.
               </p>
               <h5>Copyright Notice</h5>
               <p style={pStyle}>
                  This website and its content is copyright of Valerie Taylor (all rights reserved).

                  Any distribution or reproduction of part or all of the contents in any form is prohibited.

                  You may not, except with our express written permission, distribute or commercially exploit
                  the content. Nor may you transmit it or store it in any other website or other form of
                  electronic retrieval system.

                  You may not make any copies whatsoever of any printed artworks you receive from us.
               </p>
            </Grid>
         </Grid>
         <Footer />
      </Layout>
   );
}
