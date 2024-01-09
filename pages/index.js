// Local components.
//
import Layout            from '../components/layout';
import Main              from '../components/Main';
import Cart              from '../components/Cart';

// www.valerietaylor.co.uk plus Shopping Cart.
//
export default function ValerieTaylor () {
   return (
      <Cart>
         <Layout title={"Valerie Taylor | Art"}>
            <Main />
         </Layout>
      </Cart>
   );
}

