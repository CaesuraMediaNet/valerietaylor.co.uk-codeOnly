export default function ErrorComponent({message}) {
   return (
      <>
         <h3>Oops, something has gone wrong.</h3>
         <p>
            It is fustrating, I know, but if you email us at
         </p>
         <p>
            <a target="_blank" href="mailto:andyc@caesuramedia.com">andyc@caesuramedia.com</a>
         </p>
         <p>
            then we will see what went wrong and fix it for you.  We will let you know if you have been charged and 
            process your order or offer a refund.
         </p>
         {message && <p>Here are some details to help us : {message}</p>}
      </>
   );
}
