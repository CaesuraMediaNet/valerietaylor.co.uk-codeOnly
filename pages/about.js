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
      <Layout title={"Valerie Taylor | Art | About"}>
         <div style={{flexDirection : 'row', display: "flex", justifyContent : 'space-between', alignItems : 'center'}}>
            <h1 style={{textAlign: 'left', fontSize : h1FontSize}}>Valerie Taylor | Art | About</h1>
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
            <Grid md={8}>
               <p style={pStyle}>
               Valerie Taylor is an artist.  Well, she is now.  Some time ago she wasn’t and had no intention of declaring herself to the world as An Artist. She has a Master's Degree in not-art and an all-consuming day job being important at one of Wales’s finest Universities. 
               </p>
               <p style={pStyle}>
               But she loves stationary shops, the smell of the pencils, the myriad pens, the feel and colours of the special papers and the sheer variety of paper-clips.
               </p>
               <p style={pStyle}>
                  And her favourite stationary shop also contains lots and lots of art materials. 
               </p>
               <p style={pStyle}>
                  Valerie loves the work of particular artists who do simple line drawings, patterns, and shapes.  Not your landscapes or pretty country cottages.
               </p>
               <p style={pStyle}>
               I can do that, she thinks.  Well, she can’t, but that’s ok -  I’ve bought these fabulous-looking pens, strange inks and a scrapbook - and I’m having a go.
               </p>
               <p style={pStyle}>
After important days at work, she relaxed with these lovely materials and gave it a go in earnest … And the homepage shows what she can do now. Yes, she is officially An Artist and has a lot of work to show, some of which is for sale on her main page as GICLÉE prints for you to enjoy on your walls.
               </p>
               <p style={pStyle}>
                  You may be wondering why this is written in the third person.  Let me introduce myself, I’m Andrew and I’m Valerie’s partner - I do websites, simple ones like this which showcase the art.  I’ve set it up so that you can be sent GICLÉE prints in the post. Here is some blurb about the prints you will receive: <i>“GICLÉE prints render deep, saturated colours and have an exceptional quality that retains minute detail, subtle tints and blends. The term GICLÉE applies only to archival digital prints made with fine art acid-free papers.”</i> Nice eh? (Note that the prints will be in the original sizes, so I’ve added the sizes with the pictures in millimetres .)
               </p>
               <p style={pStyle}>
               So have a look at the home page and see if you would like a print or two, click on the circles to select them, then click on the Checkout box top right.  You’ll get to have a striking picture or two on your wall and your friends will certainly admire your taste. Or just bookmark and see what Valerie has done next.
               </p>
               <p style={pStyle}>
                  Above all, enjoy looking at the delightful pictures!
               </p>
               <p style={pStyle}>
                  With love, Valerie and Andrew
               </p>
            </Grid>
         </Grid>
         <Footer />
      </Layout>
   );
}
