import Link from 'next/link';

export default function Header({h1FontSize,title, home}) {
   return (
      <div style={{
         flexDirection  : 'row',
         display        : "flex",
         justifyContent : 'space-between',
         alignItems     : 'center'
         }}
      >
         <h1 style={{
            textAlign: 'left',
            fontSize : h1FontSize
            }}
         >
            {title}
         </h1>
         <Link style={{
               fontSize        : h1FontSize/2,
               textDecoration  : "underline",
               color           : 'unset'
            }}
            href={home ? "/about" : "/"}
            >
               {home ? "About" : "Home"}
         </Link>
      </div>

   );
}
