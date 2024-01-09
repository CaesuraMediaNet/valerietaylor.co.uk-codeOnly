import Stripe    from 'stripe';
import sendMail  from '../../../functions/sendMail';
import emailHTML from '../../../functions/emailHTML';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
   // https://github.com/stripe/stripe-node#configuration
   apiVersion: '2022-11-15',
})

export default async function handler(req, res) {
   // console.log ("pages/api/checkout_sessions/[id].js called");
   const id = req.query.id;
   try {
      if (!id.startsWith('cs_')) {
         console.log ("pages/api/checkout_sessions/[id].js ERROR : Incorrect CheckoutSession ID.");
         throw Error('Incorrect CheckoutSession ID.')
      }
      const checkout_session = await stripe.checkout.sessions.retrieve(id, {
         expand: ['line_items','payment_intent'],
      })

      // Send to me as an order to fulfill.
      //
      let subject = ""
         + "Online Order from "
         + checkout_session.customer_details.email
         + " on "
         + new Date(checkout_session.created * 1000);

      // Test LIVE no printer.
      // const toEmail = "val@valerietaylor.co.uk, andyc@caesuramedia.com";
      // Go Live LIVE!
      const toEmail = "val@valerietaylor.co.uk, studio@spectrumphoto.co.uk";
      let   htmlMsg = emailHTML(checkout_session);
      console.log ("pages/api/checkout_sessions/[id].js : Emailing : ", toEmail);
      await sendMail(subject, toEmail, htmlMsg);

      // Send to customer as order confirmation.
      //
      subject             = "Order confirmation from Valerie Taylor Artworks.";
      const customerEmail = checkout_session.customer_details.email;
      htmlMsg             = emailHTML(checkout_session, true);
      console.log ("pages/api/checkout_sessions/[id].js : Emailing : ", customerEmail);
      await sendMail(subject, customerEmail, htmlMsg);

      return res.status(200).json(checkout_session)
   } catch (err) {
      console.log ("[id].js ERROR : ", err);
      const errorMessage = err instanceof Error ? err.message : 'Internal server error';
      return res.status(500).json({ statusCode: 500, message: errorMessage })
   }
}
