import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/valerietaylor.module.css';
import Link from 'next/link';
import Script from 'next/script';
// Palanquin
import { Palanquin } from 'next/font/google';
const myFont = Palanquin({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

import products            from '../data/products';
const listElement = {
   "@type": "ListItem",
   "position": "1",
   "item": {
       "@type": "Product",
       "url":"https://valerietaylor.co.uk",
       "name": "",
       "image": [
       ],
       "description": "",
       "brand": {
           "@type": "Thing",
           "name": "Valerie Taylor"
       },
       "offers": {
           "@type": "Offer",
           "url":"https://valerietaylor.co.uk",
           "priceCurrency": "GBP",
           "price": "",
           "priceValidUntil": "2025-01-01",
           "itemCondition": "https://schema.org/NewCondition",
           "availability": "https://schema.org/InStock",
           "seller": {
               "@type": "Organization",
               "name": "Valerie Taylor"
           }
       }
   }
};

function createStructuredData() {
   let returnjsonLD = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": [],
   }
   let postition = 1;
   for (const product of products) {
      let thisElement               = JSON.parse(JSON.stringify(listElement));
      thisElement.position          = postition;
      thisElement.item.name         = product.name;
      thisElement.item.description  = product.name;
      thisElement.item.offers.price = product.price / 100;
      thisElement.item.image.push (product.image);
      thisElement.item.image.push (product.image.replace(/img.main/, 'img\/medium'));
      thisElement.item.image.push (product.image.replace(/img.main/, 'img\/small'));
      postition++;
      returnjsonLD.itemListElement.push(thisElement);
   }
   return {__html: JSON.stringify(returnjsonLD)};
}

// G-2L0C4DGTLQ

export default function Layout({ children, title }) {
  return (
    <div className={[styles.container, myFont.className].join (' ')}>
      <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="format-detection"      content="telephone=yes" />
      <meta name="format-detection"      content="date=yes" />
      <meta name="format-detection"      content="address=yes" />
      <meta name="format-detection"      content="email=no" />
      <meta name="theme-color"           content="#f1fdf4" />
      <meta name="description"           content="Valerie Taylor is a talented UK artist creating intricate designs that shimmer with creativity." />
      <meta name="keywords"              content="Valerie Taylor Art" />
      <meta name="author"                content="Caesura Media Limited" />
      <meta name="viewport"              content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta httpEquiv="X-UA-Compatible"  content="IE=edge,chrome=1" />

      <meta name="twitter:card"          content="summary" />
      <meta name="twitter:site"          content="@andykjcragg" />
      <meta name="twitter:creator"       content="@andykjcragg" />
      <meta name="twitter:title"         content="Valerie Taylor Art" />
      <meta name="twitter:description"   content="Valerie Taylor Art" />
      <meta name="twitter:image"         content="https://valerietaylor.co.uk/img/valerietaylor-logo.png" />

      <meta property="og:url"              content="https://valerietaylor.co.uk" />
      <meta property="og:title"            content="Valerie Taylor Art" />
      <meta property="og:description"      content="Valerie Taylor Art" />
      <meta property="og:type"             content="website" />
      <meta property="og:image"            content="https://valerietaylor.co.uk/img/valerietaylor-logo.png" />
      <meta property="og:image:secure_url" content="https://valerietaylor.co.uk/img/valerietaylor-logo.png" />
      <meta property="og:image:type"       content="image/png" />
      <meta property="og:image:width"      content="50" />
      <meta property="og:image:height"     content="50" />

      <link rel="apple-touch-icon"       href="/img/valerietaylor-logo.png" sizes="180x180" />
      <link rel="icon"                   href="/img/valerietaylor-logo.png" sizes="32x32" type="image/png" />
      <link rel="icon"                   href="/img/valerietaylor-logo.png" sizes="16x16" type="image/png" />
      <link rel="mask-icon"              href="/img/valerietaylor-logo.png" color="#563d7c" />
      <link rel="icon"                   href="/img/valerietaylor-logo.png" />

      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={createStructuredData()}
          key="product-jsonld"
      />
      </Head>
      <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-2L0C4DGTLQ"></Script>
      <Script strategy="afterInteractive" id="google-analytics">
        {`
           window.dataLayer = window.dataLayer || [];
           function gtag(){dataLayer.push(arguments)}
           gtag('js', new Date());
           gtag('config', 'G-2L0C4DGTLQ');
        `}
      </Script>
      <header className={styles.header}>
      </header>
      <main>{children}</main>
    </div>
  );
}
