import Layout, { siteTitle }  from '../components/layout';
import Link                   from 'next/link';
import Footer                 from '../components/Footer';
import calcColumnsH1          from '../functions/calcColumnsH1';
import { useState }           from 'react';
import { useEffect }          from 'react';
import { useRef }             from 'react';


export default function PrivacyPolicy () {
   const [h1FontSize, setH1FontSize]        = useState(65);
   const updateSize = () => {
      setH1FontSize(calcColumnsH1(window).thisH1FontSize);
   }
   useEffect(() => {
      setH1FontSize(calcColumnsH1(window).thisH1FontSize);
      window.onresize = updateSize;
   }, []);

   return (
      <Layout title={"Valerie Taylor | Art | Privacy Policy"}>
         <div style={{flexDirection : 'row', display: "flex", justifyContent : 'space-between', alignItems : 'center'}}>
            <h1 style={{textAlign: 'left', fontSize : h1FontSize}}>Valerie Taylor | Art | Privacy Policy</h1>
            <Link style={{fontSize : h1FontSize/2, textDecoration: "underline", color : 'unset'}} href="/">Home</Link>
         </div>
         <iframe
            style={{border : 0}}
            src="/PrivacyPolicyHTML.html"
            width="100%"
            height="10000"
            loading="lazy"
            scrolling="yes"
         >
         </iframe>
         <Footer />
      </Layout>
   );
}
